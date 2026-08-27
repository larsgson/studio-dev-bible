import type { ReactNode } from 'react'

export function OptionCard({
  title,
  sub,
  selected,
  onClick,
  recommended,
  badge,
}: {
  title: string
  sub?: string
  selected: boolean
  onClick: () => void
  recommended?: boolean
  badge?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left rounded-2xl border px-5 py-4 transition-all duration-150',
        'flex items-start justify-between gap-4',
        selected
          ? 'border-amber-400/80 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.4)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
      ].join(' ')}
    >
      <span>
        <span className="block font-medium text-parchment">
          {title}
          {recommended && (
            <span className="ml-2 rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-300 align-middle">
              Recommended
            </span>
          )}
        </span>
        {sub && <span className="mt-0.5 block text-sm text-parchment/50">{sub}</span>}
        {badge && <span className="mt-2 block">{badge}</span>}
      </span>
      <span
        className={[
          'mt-0.5 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center text-[11px]',
          selected ? 'border-amber-400 bg-amber-400 text-ink' : 'border-white/25 text-transparent',
        ].join(' ')}
      >
        ✓
      </span>
    </button>
  )
}
