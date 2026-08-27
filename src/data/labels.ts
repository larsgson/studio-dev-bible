// Human-friendly labels for option ids that the quickstart catalog files
// (config/quickstart/*.json) store as bare strings. Kept separate from the
// catalogs so the JSON stays the deterministic source of truth and this file
// is purely presentational.
export const OPTION_LABELS: Record<string, { title: string; sub?: string }> = {
  // themes
  follow_up: { title: 'Follow up', sub: 'After an outreach conversation' },
  encouragement: { title: 'Encouragement', sub: 'Comfort in a hard season' },
  invitation: { title: 'Invitation', sub: 'To a service, group, or event' },
  prayer: { title: 'Prayer', sub: '"I prayed for you today"' },
  celebration: { title: 'Celebration', sub: 'Bless a milestone or good news' },
  // format
  text: { title: 'Text only' },
  audio: { title: 'Audio only' },
  both: { title: 'Both' },
  // reflection_question
  yes: { title: 'Yes, add a reflection question' },
  no: { title: 'No, just the Bible verse' },
  // channels
  whatsapp: { title: 'WhatsApp' },
  telegram: { title: 'Telegram' },
  // focus
  discipleship: { title: 'Discipleship', sub: 'Growing as a follower of Jesus' },
  trauma_healing: { title: 'Trauma healing', sub: 'Finding hope after pain' },
  bible_study: { title: 'Bible study', sub: 'Understanding the word of God' },
  devotional: { title: 'Devotional', sub: 'Short daily encouragement' },
  // length
  short: { title: 'Short', sub: '5 lessons or less' },
  full: { title: 'Medium', sub: '5-10 lessons' },
  season: { title: 'Long', sub: '10 lessons or more' },
  open: { title: 'Not a constraint' },
  // resources
  video: { title: 'Short video teaching', sub: 'Where available' },
  reading: { title: 'Reading text', sub: 'Scripture + a short guide' },
  printable: { title: 'Printable handout', sub: 'For those without a phone' },
}

export const QUESTION_PROMPTS: Record<string, { prompt: string; rationale?: string }> = {
  themes: {
    prompt: 'Which kinds of messages should your team be able to send?',
    rationale: 'Each theme has its own tone and verse selection, from reviewed ministry templates.',
  },
  format: {
    prompt: 'Should the daily Bible verse include audio, text, or both?',
    rationale: 'Verse audio is drawn from a sample narrated-Scripture library (demo data).',
  },
  reflection_question: {
    prompt: 'Should the daily Bible verse include a reflection question?',
    rationale: 'Reflection questions are not AI generated.',
  },
  channels: {
    prompt: 'Which platforms do you want to use for sharing the messages?',
    rationale: 'We currently support WhatsApp and Telegram.',
  },
  focus: {
    prompt: 'Choose the core themes you want to offer to your audience.',
    rationale: "I'll match plans built around these themes.",
  },
  length: {
    prompt: 'How long should the plan be?',
    rationale: 'This defines the number of sessions.',
  },
  resources: {
    prompt: 'Choose the teaching elements for your lesson plan.',
    rationale: "I'll only build with what you can actually deliver.",
  },
}
