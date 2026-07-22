/**
 * Everything time-related is derived from `event.start` / `event.end`.
 * Nothing here needs editing — change the date in src/data/event.ts.
 */
import { event } from '../data/event';

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];
const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

interface Wall {
  y: number;
  mo: number;
  d: number;
  h: number;
  mi: number;
}

/** Parse a floating "YYYY-MM-DDTHH:MM" — no timezone maths, no Date parsing quirks. */
function parseWall(s: string, field: string): Wall {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(s);
  if (!m) {
    throw new Error(
      `event.${field} is "${s}" but must look like "2026-07-29T11:00" (YYYY-MM-DDTHH:MM).`
    );
  }
  const w = { y: +m[1]!, mo: +m[2]!, d: +m[3]!, h: +m[4]!, mi: +m[5]! };
  if (w.mo < 1 || w.mo > 12 || w.d < 1 || w.d > 31 || w.h > 23 || w.mi > 59) {
    throw new Error(`event.${field} is "${s}" — that is not a real date/time.`);
  }
  return w;
}

const pad = (n: number) => String(n).padStart(2, '0');

function to12(h: number, mi: number) {
  const suffix = h < 12 ? 'AM' : 'PM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${pad(mi)} ${suffix}`;
}

/**
 * Turn a wall-clock time in `tz` into a real UTC instant.
 * Formats a guess in the target zone, measures how far off it landed, corrects.
 * Handles DST without hardcoding any offset.
 */
function toUtc(w: Wall, tz: string): Date {
  const guess = Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi);
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const p: Record<string, number> = {};
  for (const part of dtf.formatToParts(new Date(guess))) {
    if (part.type !== 'literal') p[part.type] = Number(part.value);
  }
  const landed = Date.UTC(p.year!, p.month! - 1, p.day!, p.hour! % 24, p.minute!, p.second!);
  return new Date(guess - (landed - guess));
}

const s = parseWall(event.start, 'start');
const e = parseWall(event.end, 'end');

const startUtc = toUtc(s, event.timeZone);
const endUtc = toUtc(e, event.timeZone);

if (endUtc <= startUtc) {
  throw new Error(`event.end (${event.end}) must be after event.start (${event.start}).`);
}

/** Display strings used across the page. */
export const when = {
  dayOfWeek: DAYS[new Date(Date.UTC(s.y, s.mo - 1, s.d)).getUTCDay()]!,
  date: `${MONTHS[s.mo - 1]} ${s.d}`,
  year: String(s.y),
  /** 24h, no colon — keeps the military flavour: "1100" */
  tipoff: `${pad(s.h)}${pad(s.mi)}`,
  tipoffPlain: to12(s.h, s.mi),
  endPlain: to12(e.h, e.mi),
};

/** 20260729T150000Z */
const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const calLocation = [event.venue, event.venueLine2, event.venueAddress].filter(Boolean).join(', ');
const calDetails = `${event.calDetails}\n\n${event.shootaround}.`;

/** "Add to Google Calendar" link. Opens a prefilled event the user still has to save. */
export const googleCalUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&' +
  new URLSearchParams({
    text: event.calTitle,
    dates: `${stamp(startUtc)}/${stamp(endUtc)}`,
    details: calDetails,
    location: calLocation,
  }).toString();

/** RFC 5545 text escaping. */
const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/[;,]/g, (c) => '\\' + c).replace(/\r?\n/g, '\\n');

/**
 * Fold to <=75 *octets* per line; continuation lines start with a space.
 * Walks by code point so a fold never splits a multi-byte character
 * (emoji in the title would otherwise come out as a broken surrogate).
 */
function fold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;

  const out: string[] = [];
  let cur = '';
  let bytes = 0;
  for (const ch of line) {
    const size = enc.encode(ch).length;
    if (bytes + size > 75) {
      out.push(cur);
      cur = ' ';
      bytes = 1;
    }
    cur += ch;
    bytes += size;
  }
  if (cur !== ' ') out.push(cur);
  return out.join('\r\n');
}

/** .ics file body. Times are emitted as UTC so no VTIMEZONE block is needed. */
export const icsBody = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//battle-letter//Hoopers Assemble//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  `UID:hoopers-assemble-${stamp(startUtc)}@battle-letter`,
  // deterministic, so rebuilds don't churn the file
  `DTSTAMP:${stamp(startUtc)}`,
  `DTSTART:${stamp(startUtc)}`,
  `DTEND:${stamp(endUtc)}`,
  `SUMMARY:${esc(event.calTitle)}`,
  `DESCRIPTION:${esc(calDetails)}`,
  `LOCATION:${esc(calLocation)}`,
  'STATUS:CONFIRMED',
  'BEGIN:VALARM',
  'TRIGGER:-PT1H',
  'ACTION:DISPLAY',
  'DESCRIPTION:Hoopers assemble in 1 hour',
  'END:VALARM',
  'END:VEVENT',
  'END:VCALENDAR',
]
  .map(fold)
  .join('\r\n');
