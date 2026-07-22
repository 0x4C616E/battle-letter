import type { APIRoute } from 'astro';
import { icsBody } from '../lib/when';

/** Built to a static /event.ics at build time. */
export const GET: APIRoute = () =>
  new Response(icsBody, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="hoopers-assemble.ics"',
    },
  });
