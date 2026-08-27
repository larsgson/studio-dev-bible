// Renders /demo/:id. Static placeholder for now — once encoding.ts's
// decodeSpec() is implemented, this becomes: try to decode demoId, and
// render the real generated demo when it succeeds, falling back to an
// "invalid/expired link" state (not this "coming soon" state) when it fails.

export function DemoPage({ demoId }: { demoId: string }) {
  return (
    <div className="min-h-screen bg-ink text-parchment flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="text-4xl">🚧</div>
        <h1 className="mt-4 font-display text-3xl font-medium">Demo apps are coming soon</h1>
        <p className="mt-3 text-parchment/60">
          Generated demo apps at <code className="text-parchment/80">studio.dev.bible/demo/&lt;id&gt;</code> are
          a planned feature and aren't live yet. This link is a placeholder.
        </p>

        <div className="mx-auto mt-6 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs text-parchment/40">
          id: {demoId}
        </div>

        <a
          href="/"
          className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink"
        >
          Build an app
        </a>
      </div>
    </div>
  )
}
