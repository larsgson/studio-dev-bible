import type { ReactNode } from 'react'

export function Shell({
  children,
  step,
  totalSteps,
  eyebrow,
}: {
  children: ReactNode
  step?: number
  totalSteps?: number
  eyebrow?: string
}) {
  const pct = step && totalSteps ? Math.round((step / totalSteps) * 100) : undefined
  return (
    <div className="min-h-screen bg-ink text-parchment flex flex-col">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium tracking-wide text-parchment/70">
            <span className="text-lg">📖</span>
            <span>Dev Bible Studio</span>
          </div>
          {eyebrow && <span className="text-xs uppercase tracking-widest text-parchment/40">{eyebrow}</span>}
        </div>
        {pct !== undefined && (
          <div className="h-1 w-full bg-white/5">
            <div
              className="h-1 bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </header>
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl animate-fade-up">{children}</div>
      </main>
    </div>
  )
}
