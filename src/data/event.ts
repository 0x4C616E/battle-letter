/**
 * ============================================================
 *  EDIT EVERYTHING HERE. Nothing else needs touching.
 *  Lines marked  // TODO  are placeholders — swap before shipping.
 * ============================================================
 */

export const event = {
  // ---- the headline stuff -----------------------------------
  challenger: 'DTRA',
  challengerLong: 'Defense Threat Reduction Agency',
  defender: 'USCG RED TEAM',
  defenderLong: 'U.S. Coast Guard Red Team',

  // ---- when -------------------------------------------------
  // THE ONLY PLACE THE DATE/TIME IS WRITTEN. Local wall-clock time,
  // format YYYY-MM-DDTHH:MM. The weekday, "JULY 29", "1100", "11:00 AM",
  // the marquee, and the calendar files are all derived from these.
  start: '2026-07-29T11:00',
  end: '2026-07-29T13:00',
  timeZone: 'America/New_York', // TODO confirm — drives the calendar files

  shootaround: 'Doors + shootaround at 1030', // TODO confirm

  // ---- where ------------------------------------------------
  venue: 'THE GYM', // TODO
  venueLine2: 'Main court, far end', // TODO
  venueAddress: 'Address TBD — ask your captain', // TODO

  format: 'Runs to 21, win by 2. Best of 3.',
  bring: ['Light jersey AND dark', 'Actual basketball shoes', 'Water — the fountain is a myth', 'Zero excuses'],

  // ---- what lands in people's calendars ----------------------
  calTitle: '🏀 USCG Red Team vs DTRA',
  calDetails:
    "DTRA threw down. We accepted. Bring a light jersey AND a dark one, actual basketball shoes, and water.\n\nRuns to 21, win by 2. Best of 3.",

  // ---- meta -------------------------------------------------
  siteTitle: 'HOOPERS ASSEMBLE — USCG Red Team vs DTRA',
  siteDesc:
    'DTRA threw down. The Coast Guard Red Team does not decline. Full details, roster, and rules of engagement for the game.',
} as const;

/** Roster. Names are jokes — swap for real callsigns whenever you want. */
export const roster = [
  {
    num: '00',
    name: 'BUFFER OVERFLOW',
    pos: 'POINT OF ENTRY',
    posShort: 'PG',
    line: 'Runs the offense until it runs off the end of the array.',
    stats: [
      ['APG', '9.1'],
      ['TURNOVERS', 'yes'],
      ['SEGFAULTS', '3'],
    ],
  },
  {
    num: '03',
    name: 'AIR GAP',
    pos: 'SHELL POPPER',
    posShort: 'SG',
    line: 'Unreachable from the perimeter. Also from the rim.',
    stats: [
      ['3PT %', '41'],
      ['AIRBALLS', '41'],
      ['RANGE', 'reckless'],
    ],
  },
  {
    num: '07',
    name: 'LATERAL MOVEMENT',
    pos: 'WING',
    posShort: 'SF',
    line: 'Gets everywhere he is not supposed to be. Legally, on defense.',
    stats: [
      ['STEALS', '4.2'],
      ['SLIDES', '∞'],
      ['DETECTED', 'never'],
    ],
  },
  {
    num: '11',
    name: 'BRUTE FORCE',
    pos: 'POWER FORWARD',
    posShort: 'PF',
    line: 'No finesse. No strategy. Tries every angle until one goes in.',
    stats: [
      ['REB', '14'],
      ['FOULS', '5'],
      ['ATTEMPTS', 'all of them'],
    ],
  },
  {
    num: '22',
    name: 'MAN IN THE MIDDLE',
    pos: 'CENTER',
    posShort: 'C',
    line: 'Every pass goes through him. Nobody agreed to this.',
    stats: [
      ['BLOCKS', '6'],
      ['SCREENS', 'illegal'],
      ['WINGSPAN', 'rude'],
    ],
  },
  {
    num: '31',
    name: 'PERSISTENCE',
    pos: 'SIXTH MAN',
    posShort: '6TH',
    line: 'You benched him in 2019. He is still on the roster.',
    stats: [
      ['MINUTES', 'all'],
      ['CARDIO', 'unwell'],
      ['REBOOTS', 'survives'],
    ],
  },
  {
    num: '45',
    name: 'ZERO DAY',
    pos: 'X-FACTOR',
    posShort: 'X',
    line: 'Nobody has scouted him. Nobody has a patch. Nobody is ready.',
    stats: [
      ['PPG', '???'],
      ['SCOUTED', 'no'],
      ['PATCHED', 'no'],
    ],
  },
  {
    num: '99',
    name: 'RUBBER DUCKY',
    pos: 'TEAM MANAGER',
    posShort: 'MGR',
    line: 'Does not play. Sits courtside. You explain the play to him and suddenly it makes sense.',
    stats: [
      ['PPG', '0.0'],
      ['VIBES', '10.0'],
      ['CLARITY', 'provides'],
    ],
  },
] as const;

/** Tale of the tape — [label, DTRA, USCG] */
export const tape = [
  ['MOTTO', 'Reduce the threat', 'Become the threat'],
  ['VERTICAL', 'Classified', 'Also classified'],
  ['CARDIO', 'Treadmill desk', 'Stairwell, 3am'],
  ['PREGAME MEAL', 'Meal prep, macros counted', 'Gas station taquito'],
  ['BENCH DEPTH', 'A whole agency', 'Six guys and a group chat'],
  ['CONFIDENCE', 'Measured', 'Undeserved'],
] as const;

export const rules = [
  {
    n: '01',
    t: 'NO SCOPE CREEP',
    d: 'The court is the scope. Anything out of bounds is out of scope. This is the one rule we are actually good at.',
  },
  {
    n: '02',
    t: 'CALL YOUR OWN FOULS',
    d: 'Honor system. Same as patching. We are all adults, and we all know how that usually goes.',
  },
  {
    n: '03',
    t: 'NO ZERO-DAYS',
    d: 'If you show up with a move nobody has seen before, that is fine. If you show up with a knee brace nobody has seen before, we have questions.',
  },
  {
    n: '04',
    t: 'LOSER WRITES THE AFTER-ACTION',
    d: 'Full report. Findings, severity ratings, remediation timeline. Distributed to both teams. Non-negotiable.',
  },
] as const;

export const mailto = `mailto:${event.rsvpEmail}?subject=${encodeURIComponent(
  event.rsvpSubject
)}&body=${encodeURIComponent(event.rsvpBody)}`;
