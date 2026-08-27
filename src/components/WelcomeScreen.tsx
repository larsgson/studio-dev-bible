const CARDS = [
  {
    icon: '👥',
    title: "Tell us who it's for",
    sub: 'The audience and where they are on their journey of faith.',
  },
  {
    icon: '🧩',
    title: 'Pick what you need',
    sub: 'Scripture-based messaging, a daily Bible verse and devotion, a guided Bible lesson plan, a Bible reading app. Choose one or many.',
  },
  {
    icon: '🔗',
    title: 'Share it instantly',
    sub: 'We build an app link and QR code you can use and share right away.',
  },
]

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-ink text-parchment relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-widest text-parchment/60">
          <span className="text-base leading-none">📖</span>
          Dev Bible Studio
        </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.08] text-parchment animate-fade-up">
          How the Studio works
        </h1>
        <p
          className="mt-5 max-w-xl text-lg text-parchment/60 animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          A short interview turns your answers into a deployed, Scripture-anchored app for your
          team — no code, no prompts.
        </p>

        <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              className="animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-sm"
              style={{ animationDelay: `${140 + i * 90}ms` }}
            >
              <div className="mb-3 text-2xl">{c.icon}</div>
              <div className="font-medium text-parchment">{c.title}</div>
              <div className="mt-1 text-sm text-parchment/50">{c.sub}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-12 animate-fade-up rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-8 py-3.5 text-base font-semibold text-ink shadow-lg shadow-amber-400/20 transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          style={{ animationDelay: '420ms' }}
        >
          Build an App
        </button>

        <p
          className="mt-5 animate-fade-up text-xs text-parchment/40"
          style={{ animationDelay: '480ms' }}
        >
          Demo only — no account needed, nothing is actually deployed.
        </p>
      </div>
    </div>
  )
}
