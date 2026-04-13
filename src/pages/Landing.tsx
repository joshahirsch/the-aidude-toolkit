import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Megaphone, Shield, Users, Rocket } from 'lucide-react';
import { APP_VERSION } from '@/lib/version';

const sessions = [
  {
    id: 'talk-like-a-human',
    label: 'Session 1',
    title: 'Talk Like a Human',
    description: 'Build structured prompts, adapt messages across channels, and protect your authentic voice in every fundraising communication.',
    tags: ['Prompt Structure', 'Channel Adaptation', 'Voice Protection'],
  },
  {
    id: 'humanity-at-scale',
    label: 'Session 2',
    title: 'Humanity at Scale',
    description: 'Create fundraising personas, define ethical guardrails, and design donor communications that stay human at every touchpoint.',
    tags: ['Persona Design', 'Ethical Guardrails', 'Donor Authenticity'],
  },
];

const zones = [
  { icon: BookOpen, label: 'Prompt Lab', desc: 'Build, compare, and refine structured prompts' },
  { icon: Megaphone, label: 'Channel Studio', desc: 'Adapt one message across communication formats' },
  { icon: Shield, label: 'Voice + Trust', desc: 'Define guardrails, score authenticity, set ethics' },
  { icon: Users, label: 'Persona Lab', desc: 'Create fundraising-specific AI personas' },
  { icon: Rocket, label: 'Action Kit', desc: 'Save your work, map workflows, plan next steps' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="border-b border-border bg-card px-4 py-4">
        <div className="container max-w-3xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/ai-dude-wordmark.svg" alt="The AI Dude" className="h-12 w-auto" />
            <div>
              <p className="text-xs text-muted-foreground">Interactive workshop toolkit</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2">
            <img src="/festival-logo.svg" alt="Festival del Fundraising" className="h-10 w-auto" />
            <div>
              <p className="text-xs font-semibold text-foreground">Festival del Fundraising 2026</p>
              <p className="text-[11px] text-muted-foreground">Presented for conference workshop use</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-12 pb-10 md:pt-16 md:pb-14">
        <div className="container max-w-3xl mx-auto">
          <p className="label-caps mb-4">Interactive Workshop Toolkit</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4">
            Practical AI exercises<br className="hidden md:block" /> for fundraising teams
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
            A structured companion for two live sessions. Complete guided exercises, build reusable assets, and leave with a toolkit you can actually use back at work.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-card px-3 py-1.5 border border-border">No login required</span>
            <span className="rounded-full bg-card px-3 py-1.5 border border-border">Saves locally on your device</span>
            <span className="rounded-full bg-card px-3 py-1.5 border border-border">Copy or export your work</span>
          </div>
        </div>
      </section>

      {/* Session Cards */}
      <section className="px-4 pb-14">
        <div className="container max-w-3xl mx-auto space-y-3">
          {sessions.map((s) => (
            <button key={s.id}
              onClick={() => navigate(`/session/${s.id}`)}
              className="group w-full text-left rounded-lg bg-card border border-border p-5 md:p-6 hover:border-primary/40 transition-colors">
              <span className="label-caps">{s.label}</span>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mt-1 mb-2">
                {s.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.tags.map(t => (
                  <span key={t} className="text-xs bg-muted rounded px-2.5 py-1 text-muted-foreground">{t}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                Open session <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Zones overview */}
      <section className="px-4 pb-14">
        <div className="container max-w-3xl mx-auto">
          <p className="label-caps mb-2">What you'll work on</p>
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6">
            Five zones of structured exercises
          </h2>
          <div className="space-y-2">
            {zones.map((z) => (
              <div key={z.label}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center">
                  <z.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-foreground">{z.label}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{z.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 pb-14">
        <div className="container max-w-3xl mx-auto bg-card border border-border rounded-lg p-6 md:p-8">
          <p className="label-caps mb-2">How it works</p>
          <h3 className="font-heading font-bold text-lg text-foreground mb-3">Use this during the session and after</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">1.</span>
              <span>Open the session that matches the workshop you're in.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">2.</span>
              <span>Work through the exercises on your phone and save the pieces you want to reuse.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">3.</span>
              <span>Copy or export your session bundle so you can bring prompts, guardrails, and plans back to work.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-10">
        <div className="container max-w-3xl mx-auto border-t border-border pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src="/ai-dude-wordmark.svg" alt="The AI Dude" className="h-8 w-auto" />
            <div>
              <p className="text-xs text-muted-foreground">the AI dude × Festival del Fundraising</p>
              <p className="text-[11px] text-muted-foreground">Release {APP_VERSION}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img src="/festival-logo.svg" alt="Festival del Fundraising" className="h-8 w-auto" />
            <p className="text-[11px] text-muted-foreground">Each pushed release gets a visible version update.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
