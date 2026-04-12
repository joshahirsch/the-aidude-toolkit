import { useState } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import type { SessionType } from '@/types/toolkit';

interface Example {
  title: string;
  weak: string;
  strong: string;
  annotations: string[];
}

const EXAMPLES: Record<SessionType, Example[]> = {
  'talk-like-a-human': [
    {
      title: 'Appeal Email',
      weak: 'Write a fundraising email for our charity.',
      strong: 'You are a fundraising copywriter for a food bank. Write a 200-word appeal email to lapsed donors (no gift in 12+ months). Use a warm, personal tone. Include one anonymized family story. End with a clear CTA to give $25. Avoid guilt-based language.',
      annotations: ['Added role', 'Specified audience segment', 'Set word limit', 'Defined tone', 'Required story element', 'Clear CTA', 'Ethical constraint'],
    },
    {
      title: 'Thank-You Note',
      weak: 'Write a thank you letter.',
      strong: 'You are a donor relations coordinator at a wildlife conservation nonprofit. Write a 150-word thank-you note to a first-time donor who gave $50 during our spring campaign. Make it feel handwritten and personal. Reference their specific gift and its impact (one rescued animal). No future ask.',
      annotations: ['Specific role', 'Concrete details', 'Word limit', 'Tone guidance', 'Impact reference', 'Clear boundary'],
    },
  ],
  'humanity-at-scale': [
    {
      title: 'Stewardship Message',
      weak: 'Write something to thank our major donors.',
      strong: 'You are a major gifts officer at a university. Write a personalized stewardship update for a donor who funded a scholarship. Include: student progress update (anonymized), emotional connection to the donor\'s values, and a specific moment that shows impact. 200 words max. Warm, dignified tone. No ask.',
      annotations: ['Role clarity', 'Personalization cues', 'Specific content requirements', 'Emotional guidance', 'Boundaries set'],
    },
    {
      title: 'Segment-Based Email',
      weak: 'Write an email for our donors.',
      strong: 'You are a communications specialist for an arts nonprofit. Write three variations of a campaign update email for: (1) monthly donors, (2) one-time donors from last year, (3) event attendees who haven\'t donated. Each version: 150 words, same core message, different angle and CTA. Tone: enthusiastic but not pushy.',
      annotations: ['Multi-segment approach', 'Specific audience groups', 'Consistent core with variations', 'Word limits per version', 'Tone calibration'],
    },
  ],
};

export default function PromptTeardown({ session }: { session: SessionType }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const examples = EXAMPLES[session];
  const ex = examples[activeIdx];

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        See the difference between a vague prompt and a structured one. Tap to reveal what makes the stronger version work.
      </p>

      <div className="flex gap-2">
        {examples.map((e, i) => (
          <button key={i} onClick={() => { setActiveIdx(i); setShowAnnotations(false); }}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              i === activeIdx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}>
            {e.title}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive uppercase tracking-wide">Weak Prompt</span>
          </div>
          <p className="text-sm italic text-card-foreground">{ex.weak}</p>
        </div>
        <div className="rounded-xl border border-success/30 bg-success/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-xs font-semibold text-success uppercase tracking-wide">Strong Prompt</span>
          </div>
          <p className="text-sm text-card-foreground">{ex.strong}</p>
        </div>
      </div>

      <button onClick={() => setShowAnnotations(!showAnnotations)}
        className="w-full text-left flex items-center gap-2 p-4 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all">
        <ArrowRight className={`w-4 h-4 text-primary transition-transform ${showAnnotations ? 'rotate-90' : ''}`} />
        <span className="text-sm font-semibold font-heading">What changed?</span>
      </button>

      {showAnnotations && (
        <div className="flex flex-wrap gap-2 animate-fade-in">
          {ex.annotations.map((a, i) => (
            <span key={i} className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1.5 font-medium">
              ✓ {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
