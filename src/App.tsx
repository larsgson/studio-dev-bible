import { useMemo, useState } from 'react'
import { WelcomeScreen } from './components/WelcomeScreen'
import { Shell } from './components/Shell'
import { OptionCard } from './components/OptionCard'
import { OPTION_LABELS, QUESTION_PROMPTS } from './data/labels'
import { parseDemoRoute, buildDemoUrl } from './demo/route'
import { DemoPage } from './demo/DemoPage'
import { QrCode } from './components/QrCode'

import audienceData from '../config/quickstart/audience-groups.json'
import faithData from '../config/quickstart/faith-levels.json'
import languageData from '../config/quickstart/languages.json'
import moduleData from '../config/quickstart/modules.json'
import questionData from '../config/quickstart/module-questions.json'
import resourceData from '../config/quickstart/resource-library.sample.json'

type Phase =
  | 'welcome'
  | 'audience'
  | 'faith'
  | 'language'
  | 'cart'
  | 'interview'
  | 'resources'
  | 'name'
  | 'building'
  | 'deployed'

export type Answers = {
  audience_group?: string
  faith_level?: string
  language?: string
  cart: string[]
  [questionId: string]: any
}

const PHASE_ORDER: Phase[] = [
  'audience',
  'faith',
  'language',
  'cart',
  'interview',
  'resources',
  'name',
  'building',
  'deployed',
]

const BUILD_STEPS_BASE = ['Understanding your need']
const BUILD_STEPS_END = ['Deploying your Bible app']

export default function App() {
  const [demoId] = useState(() => parseDemoRoute(window.location.pathname)?.demoId ?? null)
  const [phase, setPhase] = useState<Phase>('welcome')
  const [answers, setAnswers] = useState<Answers>({ cart: [] })
  const [qIndex, setQIndex] = useState(0)
  const [toolName, setToolName] = useState('')
  const [toolUrl, setToolUrl] = useState('')

  const audienceGroups = audienceData.groups.filter((g) => g.active)

  const faithLevels = useMemo(() => {
    const list = faithData.levels.filter((l) => l.active)
    if (answers.audience_group === 'kids' || answers.audience_group === 'teens') {
      return list.filter((l) => l.id !== 'scholars')
    }
    if (answers.audience_group === 'pastors') {
      return list.filter((l) => l.id !== 'seekers')
    }
    return list
  }, [answers.audience_group])

  const languages = languageData.liveOptions.filter((l) => l.active)

  const availableModules = useMemo(() => {
    return moduleData.modules.filter((m) => {
      if (!m.active) return false
      if (m.id === 'messaging') {
        if (answers.audience_group === 'kids') return false
        if (answers.faith_level === 'seekers') return false
      }
      return true
    })
  }, [answers.audience_group, answers.faith_level])

  const applicableQuestions = useMemo(
    () => questionData.questions.filter((q) => q.appliesTo.some((m) => answers.cart.includes(m))),
    [answers.cart],
  )

  const currentQuestion = applicableQuestions[qIndex]

  const matchedResources = useMemo(() => {
    return resourceData.resources.filter((r) => {
      if (r.languageId !== answers.language) return false
      if ('relevantModules' in r && r.relevantModules && !r.relevantModules.some((m) => answers.cart.includes(m))) {
        return false
      }
      if ('targetGroupIds' in r && r.targetGroupIds && !r.targetGroupIds.includes(answers.audience_group ?? '')) {
        return false
      }
      return true
    })
  }, [answers.language, answers.cart, answers.audience_group])

  const selectedResourceIds = answers.resourceIds ?? matchedResources.map((r) => r.id)

  const stepIndex = PHASE_ORDER.indexOf(phase)

  function goNext(next: Phase) {
    setPhase(next)
  }

  function selectSingle(key: keyof Answers, id: string, next: Phase) {
    setAnswers((a) => ({ ...a, [key]: id }))
    setTimeout(() => goNext(next), 180)
  }

  function toggleMulti(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
  }

  function nameSuggestion() {
    const cart = answers.cart
    if (cart.length === 1) {
      const single: Record<string, string> = {
        messaging: 'Scripture Messenger',
        devotional: 'Daily Word',
        lesson_plan: 'Our Bible Study',
        bible_reader: 'Read the Word',
        reading_plan: 'Read Together',
      }
      return single[cart[0]] ?? 'Scripture Companion'
    }
    if (cart.length > 1) return 'Our Ministry Toolkit'
    return 'Scripture Companion'
  }

  function startBuilding() {
    setPhase('building')
    setTimeout(() => {
      const id = crypto.randomUUID().slice(0, 8)
      setToolUrl(buildDemoUrl(id))
      setPhase('deployed')
    }, 2600)
  }

  const buildSteps = [
    ...BUILD_STEPS_BASE,
    ...(selectedResourceIds.length > 0
      ? [`Loading ${selectedResourceIds.length} selected resource${selectedResourceIds.length === 1 ? '' : 's'} from the library`]
      : []),
    ...(answers.cart.includes('messaging') || answers.cart.includes('devotional')
      ? ['Connecting the verse-matching service (demo)']
      : []),
    ...(answers.cart.includes('messaging') ? ['Preparing message templates for your audience'] : []),
    ...(answers.cart.includes('lesson_plan') ? ['Loading your lesson plan from the library'] : []),
    ...(answers.cart.includes('reading_plan') ? ['Laying out your reading plan day by day'] : []),
    ...BUILD_STEPS_END,
  ]

  if (demoId) {
    return <DemoPage demoId={demoId} />
  }

  if (phase === 'welcome') {
    return <WelcomeScreen onStart={() => setPhase('audience')} />
  }

  if (phase === 'audience') {
    return (
      <Shell step={1} totalSteps={7} eyebrow="Step 1 of 7">
        <Question
          prompt="Who will be using the Bible app you're creating?"
          rationale="This will help us offer the best matching modules you can select for your Bible app."
        />
        <div className="mt-6 grid gap-3">
          {audienceGroups.map((g) => (
            <OptionCard
              key={g.id}
              title={g.label}
              selected={answers.audience_group === g.id}
              onClick={() => selectSingle('audience_group', g.id, 'faith')}
            />
          ))}
        </div>
      </Shell>
    )
  }

  if (phase === 'faith') {
    return (
      <Shell step={2} totalSteps={7} eyebrow="Step 2 of 7">
        <Question
          prompt="Where is this group on their journey of faith?"
          rationale="Both audience and faith level help us determine the right modules you can choose from."
        />
        <div className="mt-6 grid gap-3">
          {faithLevels.map((l) => (
            <OptionCard
              key={l.id}
              title={l.label}
              sub={l.sub}
              selected={answers.faith_level === l.id}
              onClick={() => selectSingle('faith_level', l.id, 'language')}
            />
          ))}
        </div>
        <BackLink onClick={() => setPhase('audience')} />
      </Shell>
    )
  }

  if (phase === 'language') {
    return (
      <Shell step={3} totalSteps={7} eyebrow="Step 3 of 7">
        <Question
          prompt="What language will your Bible app be in?"
          rationale="The language you choose will define the interface language of your app and the canonical Scripture translation."
        />
        <div className="mt-6 grid gap-3">
          {languages.map((l) => (
            <OptionCard
              key={l.id}
              title={l.label}
              sub={l.canonicalTranslation}
              selected={answers.language === l.id}
              onClick={() => selectSingle('language', l.id, 'cart')}
            />
          ))}
        </div>
        <p className="mt-4 text-xs italic text-parchment/40">More languages coming soon.</p>
        <BackLink onClick={() => setPhase('faith')} />
      </Shell>
    )
  }

  if (phase === 'cart') {
    return (
      <Shell step={4} totalSteps={7} eyebrow="Step 4 of 7">
        <Question prompt="Here's what you can build." rationale="Pick one or several of the below modules. Everything you choose lives together under one Bible app link." />
        <div className="mt-6 grid gap-3">
          {availableModules.map((m) => (
            <OptionCard
              key={m.id}
              title={m.label}
              sub={m.sub}
              selected={answers.cart.includes(m.id)}
              onClick={() => setAnswers((a) => ({ ...a, cart: toggleMulti(a.cart, m.id) }))}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <BackLink onClick={() => setPhase('language')} />
          <button
            type="button"
            disabled={answers.cart.length === 0}
            onClick={() => {
              setQIndex(0)
              setPhase(applicableQuestions.length ? 'interview' : 'resources')
            }}
            className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {answers.cart.length === 0 ? 'Pick at least one' : `Continue with ${answers.cart.length}`}
          </button>
        </div>
      </Shell>
    )
  }

  if (phase === 'interview' && currentQuestion) {
    const q = currentQuestion
    const meta = QUESTION_PROMPTS[q.id]
    const isMulti = q.kind === 'multi'
    const value = answers[q.id]

    function advance() {
      if (qIndex + 1 < applicableQuestions.length) {
        setQIndex(qIndex + 1)
      } else {
        setPhase('resources')
      }
    }

    return (
      <Shell step={5} totalSteps={7} eyebrow={`Step ${qIndex + 1} of ${applicableQuestions.length}`}>
        <Question prompt={meta?.prompt ?? q.label} rationale={meta?.rationale} />
        <div className="mt-6 grid gap-3">
          {q.options.map((optId: string) => {
            const label = OPTION_LABELS[optId] ?? { title: optId }
            const selected = isMulti ? (value ?? []).includes(optId) : value === optId
            return (
              <OptionCard
                key={optId}
                title={label.title}
                sub={label.sub}
                selected={selected}
                onClick={() => {
                  if (isMulti) {
                    setAnswers((a) => ({ ...a, [q.id]: toggleMulti(a[q.id] ?? [], optId) }))
                  } else {
                    setAnswers((a) => ({ ...a, [q.id]: optId }))
                    setTimeout(advance, 180)
                  }
                }}
              />
            )
          })}
        </div>
        {isMulti && (
          <div className="mt-8 flex items-center justify-between">
            <BackLink
              onClick={() => (qIndex === 0 ? setPhase('cart') : setQIndex(qIndex - 1))}
            />
            <button
              type="button"
              disabled={!value || value.length === 0}
              onClick={advance}
              className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}
        {!isMulti && (
          <BackLink onClick={() => (qIndex === 0 ? setPhase('cart') : setQIndex(qIndex - 1))} />
        )}
      </Shell>
    )
  }

  if (phase === 'resources') {
    return (
      <Shell step={6} totalSteps={7} eyebrow="Step 6 of 7">
        <Question
          prompt="Here's what's available for your Bible app"
          rationale="Matched from the resource library by language, audience, and the modules you picked. Everything is pre-selected — deselect anything you don't want included."
        />
        <div className="mt-6 grid gap-3">
          {matchedResources.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-parchment/50">
              No matching resources yet for this combination — that's fine, the app will still build with
              its base Scripture text.
            </p>
          )}
          {matchedResources.map((r) => {
            const groundedNote =
              'groundedIn' in r && r.groundedIn
                ? `Grounded via Bible Tool Navigator: ${r.groundedIn.name ?? r.groundedIn.navigatorId}`
                : null
            return (
              <OptionCard
                key={r.id}
                title={r.title}
                sub={r.note}
                selected={selectedResourceIds.includes(r.id)}
                onClick={() =>
                  setAnswers((a) => ({
                    ...a,
                    resourceIds: toggleMulti(a.resourceIds ?? matchedResources.map((mr) => mr.id), r.id),
                  }))
                }
                badge={
                  <span
                    className={[
                      'inline-block rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide',
                      groundedNote ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-parchment/40',
                    ].join(' ')}
                  >
                    {groundedNote ?? 'Placeholder — not yet sourced'}
                  </span>
                }
              />
            )
          })}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <BackLink onClick={() => (applicableQuestions.length ? setPhase('interview') : setPhase('cart'))} />
          <button
            type="button"
            onClick={() => {
              setToolName(nameSuggestion())
              setPhase('name')
            }}
            className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink"
          >
            Continue
          </button>
        </div>
      </Shell>
    )
  }

  if (phase === 'name') {
    return (
      <Shell step={7} totalSteps={7} eyebrow="Last step">
        <h1 className="font-display text-3xl font-medium">Name your Bible app</h1>
        <p className="mt-2 text-parchment/50">Your team sees this name. Edit the suggestion below, then build.</p>
        <input
          autoFocus
          maxLength={60}
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-6 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-lg text-parchment outline-none focus:border-amber-400/60"
        />
        <div className="mt-8 flex items-center justify-between">
          <BackLink onClick={() => setPhase('resources')} />
          <button
            type="button"
            disabled={toolName.trim().length === 0}
            onClick={startBuilding}
            className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Build my Bible app
          </button>
        </div>
      </Shell>
    )
  }

  if (phase === 'building') {
    return (
      <Shell eyebrow="Building">
        <h1 className="font-display text-3xl font-medium">Building &ldquo;{toolName}&rdquo;</h1>
        <div className="mt-8 grid gap-3">
          {buildSteps.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 animate-fade-up"
              style={{ animationDelay: `${i * 260}ms` }}
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm text-parchment/80">{s}</span>
            </div>
          ))}
        </div>
      </Shell>
    )
  }

  if (phase === 'deployed') {
    return (
      <Shell eyebrow="Live">
        <div className="text-center">
          <div className="text-4xl">🎉</div>
          <h1 className="mt-4 font-display text-3xl font-medium">Your Bible app is live</h1>
          <p className="mt-2 text-parchment/50">Anyone with the link can use it — no sign-in needed.</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-parchment/30">
            Demo only — the QR/link are real and scannable, but the app behind it isn't generated yet
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <QrCode value={toolUrl} size={160} />
            </div>
            <div className="font-medium">{toolName}</div>
            <div className="mt-1 text-sm text-parchment/50">Scan or tap to open</div>
            <div className="mt-3 truncate rounded-lg bg-black/30 px-3 py-2 text-xs text-parchment/60">
              {toolUrl}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(toolUrl)}
              className="rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-2.5 text-sm font-semibold text-ink"
            >
              Copy link
            </button>
            <button
              type="button"
              onClick={() => {
                setAnswers({ cart: [] })
                setToolName('')
                setToolUrl('')
                setQIndex(0)
                setPhase('welcome')
              }}
              className="text-sm text-parchment/50 underline underline-offset-4 hover:text-parchment"
            >
              Build another app
            </button>
          </div>
        </div>
      </Shell>
    )
  }

  return null
}

function Question({ prompt, rationale }: { prompt: string; rationale?: string }) {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium leading-snug">{prompt}</h1>
      {rationale && <p className="mt-2 text-parchment/50">{rationale}</p>}
    </div>
  )
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 text-sm text-parchment/40 hover:text-parchment/70"
    >
      ← Back
    </button>
  )
}
