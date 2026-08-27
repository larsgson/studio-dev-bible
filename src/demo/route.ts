// Routing for the generated-demo URL shape: studio.dev.bible/demo/<id>.
// (studio.dev.bible is the starting home for this app, not necessarily
// permanent — DEMO_ORIGIN below is the one place that would need to change
// if it moves.)
//
// Today the id is opaque and carries no data (see encoding.ts) — the /demo/:id
// route just renders a "coming soon" placeholder. The planned next step is to
// make <id> an encoded payload of the interview answers (see encoding.ts),
// so a /demo/<id> link is fully shareable with no backend/storage involved.
// Keeping routing, the id, and the payload as separate concerns now means
// swapping in real encoding later only touches encoding.ts + DemoPage.tsx.

const DEMO_ORIGIN = 'https://studio.dev.bible'

export type DemoRoute = { demoId: string } | null

export function parseDemoRoute(pathname: string): DemoRoute {
  const match = pathname.match(/^\/demo\/([^/]+)\/?$/)
  if (!match) return null
  return { demoId: decodeURIComponent(match[1]) }
}

export function buildDemoPath(demoId: string): string {
  return `/demo/${encodeURIComponent(demoId)}`
}

export function buildDemoUrl(demoId: string): string {
  return `${DEMO_ORIGIN}${buildDemoPath(demoId)}`
}
