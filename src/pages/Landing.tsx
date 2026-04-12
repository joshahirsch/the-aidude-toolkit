import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Megaphone, Shield, Users, Rocket, ArrowRight, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const sessions = [
  {
    id: 'talk-like-a-human',
    title: 'Talk Like a Human',
    subtitle: 'Session 1',
    description: 'Master prompt engineering for fundraising. Build structured prompts, adapt across channels, and protect your authentic voice.',
    tags: ['Prompt Building', 'Channel Adaptation', 'Voice Protection'],
    gradient: 'from-primary to-accent',
  },
  {
    id: 'humanity-at-scale',
    title: 'Humanity at Scale',
    subtitle: 'Session 2',
    description: 'Create authentic donor communications at scale. Build AI personas, set ethical guardrails, and design personalized experiences.',
    tags: ['Donor Authenticity', 'Persona Design', 'Ethical AI'],
    gradient: 'from-secondary to-primary',
  },
];

const modules = [
  { icon: Lightbulb, label: 'Prompt Lab', desc: 'Build, compare, and refine prompts' },
  { icon: Megaphone, label: 'Channel Studio', desc: 'Adapt messages across formats' },
  { icon: Shield, label: 'Voice + Trust', desc: 'Define guardrails and authenticity' },
  { icon: Users, label: 'Persona Lab', desc: 'Create fundraising AI personas' },
  { icon: Rocket, label: 'Action Kit', desc: 'Save work and plan next steps' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-hero text-secondary-foreground px-4 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="container max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground/90 mb-6">
              <Sparkles className="w-4 h-4" />
              Festival del Fundraising 2026
            </div>
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground mb-4">
            The AI Dude
            <span className="block text-primary-foreground/70 text-2xl md:text-3xl font-medium mt-2">
              Interactive Toolkit
            </span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Your companion for two live sessions on AI-powered fundraising.
            Complete exercises, build reusable assets, and leave with a real toolkit.
          </motion.p>
        </div>
      </section>

      {/* Session Cards */}
      <section className="px-4 -mt-8 mb-12">
        <div className="container max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
          {sessions.map((s, i) => (
            <motion.button key={s.id} initial="hidden" animate="visible" custom={i + 3} variants={fadeUp}
              onClick={() => navigate(`/session/${s.id}`)}
              className="group text-left rounded-xl bg-card shadow-elevated p-6 hover:shadow-lg transition-all border border-border hover:border-primary/30">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.subtitle}</span>
              <h2 className="font-heading text-xl font-bold mt-1 mb-2 text-card-foreground group-hover:text-primary transition-colors">
                {s.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {s.tags.map(t => (
                  <span key={t} className="text-xs bg-muted rounded-full px-3 py-1 text-muted-foreground">{t}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                Enter session <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* What You'll Build */}
      <section className="px-4 mb-16">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-center mb-2">What you'll build</h2>
          <p className="text-center text-muted-foreground mb-8">Five modules of structured exercises and reusable templates</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <motion.div key={m.label} initial="hidden" animate="visible" custom={i + 5} variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-lg bg-card shadow-card border border-border">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-card-foreground">{m.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use it live */}
      <section className="px-4 mb-16">
        <div className="container max-w-3xl mx-auto text-center bg-muted rounded-xl p-8">
          <h3 className="font-heading font-bold text-lg mb-2">Use this during the session</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Complete exercises on your phone. Everything saves locally — revisit your work anytime, no login needed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 pb-8">
        <div className="container max-w-3xl mx-auto text-center text-xs text-muted-foreground">
          <p>The AI Dude × Festival del Fundraising</p>
        </div>
      </footer>
    </div>
  );
}
