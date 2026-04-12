import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType, AuthenticityScore } from '@/types/toolkit';

const CATEGORIES = [
  { key: 'specificity', label: 'Specificity', desc: 'Does it include concrete details?' },
  { key: 'relevance', label: 'Relevance', desc: 'Is it tailored to this donor/audience?' },
  { key: 'empathy', label: 'Empathy', desc: 'Does it show genuine understanding?' },
  { key: 'donorCenteredness', label: 'Donor-Centeredness', desc: 'Is the donor the hero, not the org?' },
  { key: 'missionAlignment', label: 'Mission Alignment', desc: 'Does it reflect your mission authentically?' },
  { key: 'credibility', label: 'Credibility', desc: 'Would a donor trust this message?' },
  { key: 'trustworthiness', label: 'Trustworthiness', desc: 'Is it transparent and honest?' },
  { key: 'overPolishRisk', label: 'Over-Polish Risk', desc: 'Does it sound too perfect to be real? (Lower = better)' },
] as const;

const EMPTY: AuthenticityScore = {
  id: '', specificity: 5, relevance: 5, empathy: 5, donorCenteredness: 5,
  missionAlignment: 5, credibility: 5, trustworthiness: 5, overPolishRisk: 5, notes: '',
};

export default function AuthenticityRubric({ session }: { session: SessionType }) {
  const [score, setScore] = useLocalStorage<AuthenticityScore>(`toolkit-rubric-${session}`, EMPTY);
  const [copied, setCopied] = useState(false);

  const update = (key: string, value: number) => setScore(prev => ({ ...prev, [key]: value }));

  const total = CATEGORIES.reduce((sum, c) => {
    const val = score[c.key as keyof AuthenticityScore] as number;
    return sum + (c.key === 'overPolishRisk' ? (10 - val) : val);
  }, 0);
  const maxScore = CATEGORIES.length * 10;
  const pct = Math.round((total / maxScore) * 100);

  const getLabel = (pct: number) => pct >= 80 ? 'Strong' : pct >= 60 ? 'Good' : pct >= 40 ? 'Needs work' : 'Weak';
  const getColor = (pct: number) => pct >= 80 ? 'text-success' : pct >= 60 ? 'text-info' : pct >= 40 ? 'text-warning' : 'text-destructive';

  const exportText = `AUTHENTICITY SCORE: ${total}/${maxScore} (${pct}%) — ${getLabel(pct)}\n\n${CATEGORIES.map(c => `${c.label}: ${score[c.key as keyof AuthenticityScore]}/10`).join('\n')}\n\nNotes: ${score.notes}`;

  const copy = () => { navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Score a communication piece for authenticity and donor-centeredness. Use this to evaluate AI-generated or human-written content.
      </p>

      <div className="rounded-xl bg-card border border-border p-4 shadow-card text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Authenticity Score</p>
        <p className={`font-heading text-4xl font-bold mt-1 ${getColor(pct)}`}>{pct}%</p>
        <p className={`text-sm font-medium ${getColor(pct)}`}>{getLabel(pct)}</p>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map(c => {
          const val = score[c.key as keyof AuthenticityScore] as number;
          return (
            <div key={c.key} className="rounded-lg bg-card border border-border p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold font-heading">{c.label}</span>
                <span className="text-sm font-bold text-primary">{val}/10</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{c.desc}</p>
              <input type="range" min={1} max={10} value={val}
                onChange={e => update(c.key, parseInt(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted accent-primary cursor-pointer" />
            </div>
          );
        })}
      </div>

      <div>
        <label className="block text-sm font-semibold font-heading mb-1">Notes</label>
        <textarea value={score.notes} onChange={e => setScore(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="What stands out? What needs improvement?"
          className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[70px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
      </div>

      <button onClick={copy}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy score report'}
      </button>
    </div>
  );
}
