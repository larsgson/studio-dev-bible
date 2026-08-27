// Placeholder for the future "option B" design: encode the completed
// interview answers directly into the /demo/<id> URL (e.g. a compressed,
// base64url-encoded payload) so any device can open the link and
// reconstruct the same generated demo with no backend or localStorage.
//
// Not wired up yet. When this is built:
//  - encodeSpec(answers) produces the id used by buildDemoPath()/buildDemoUrl()
//    in route.ts, in place of today's random id.
//  - decodeSpec(demoId) is called from DemoPage.tsx to reconstruct the
//    answers for rendering, in place of today's static "coming soon" copy.
// Everything that currently only needs a `demoId` string (routing, the
// deployed-screen link/QR, DemoPage) should keep working unchanged once
// these are implemented — only DemoPage's placeholder body needs to be
// swapped for the real rendering described in the interview-to-demo plan.

import type { Answers } from '../App'

export function encodeSpec(_answers: Answers): string {
  throw new Error('encodeSpec is not implemented yet — see src/demo/encoding.ts')
}

export function decodeSpec(_demoId: string): Answers | null {
  throw new Error('decodeSpec is not implemented yet — see src/demo/encoding.ts')
}
