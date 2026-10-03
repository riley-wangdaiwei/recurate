/**
 * Bridge point. External services plug in under src/app/api/:
 * Stripe webhooks, email, artist tools, etc. each get their own
 * route.ts here. Nothing else in the codebase needs to change.
 */
export async function GET() {
  return Response.json({ ok: true, service: "recurate" });
}
