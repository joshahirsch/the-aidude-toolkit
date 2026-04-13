import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { buildActionPlanText } from '@/lib/export';
import type { SessionType, ActionPlan } from '@/types/toolkit';

const EMPTY: ActionPlan = {
  id: '', firstPrompt: '', firstPersona: '', firstUseCase: '',
  firstChannel: '', ethicalSafeguard: '', stakeholder: '',
  workflowToImprove: '', nextAction: '',
};

const FIELDS = [
  { key: 'firstPrompt', label: '✍️ First prompt I will build', placeholder: 'e.g. A structured thank-you email prompt for monthly donors' },
  { key: 'firstPersona', label: '👤 First persona I will build', placeholder: 'e.g. Stewardship assistant for mid-level donors' },
  { key: 'firstUseCase', label: '📧 First communication use case I will test', placeholder: 'e.g. Lapsed donor re-engagement email series' },
  { key: 'firstChannel', label: '📱 First channel I will test', placeholder: 'e.g. Email — our highest-volume channel' },
  { key: 'ethicalSafeguard', label: '🛡️ One ethical safeguard I need', placeholder: 'e.g. Human review requirement for all external donor communications' },
  { key: 'stakeholder', label: '🤝 One stakeholder I need to involve', placeholder: 'e.g. Communications Director — needs to approve AI use policy' },
  { key: 'workflowToImprove', label: '⚡ One workflow I can improve this month', placeholder: 'e.g. Monthly donor thank-you process — currently takes 3 days' },
  { key: 'nextAction', label: '🎯 Next action within 7 days', placeholder: 'e.g. Build one complete prompt using the Prompt Builder and test with a real email' },
] as const;

export default function ActionPlanModule({ session }: { session: SessionType }) {
  const [plan, setPlan] = useLocalStorage<ActionPlan>(`toolkit-action-${session}`, EMPTY);
  const [copied, setCopied] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const update = (key: string, value: string) => setPlan(prev => ({ ...prev, [key]: value }));

  const exportText = `MY 7-DAY ACTION PLAN\n\n${buildActionPlanText(session, plan)}`;

  const copy = () => { navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const emailBody = encodeURIComponent(exportText);
  const emailSubject = encodeURIComponent(`My 7-Day Action Plan — The AI Dude Toolkit`);

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Turn your session insights into practical next steps. What will you do in the next 7 days?
      </p>

      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
          <textarea value={(plan as any)[f.key]} onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[60px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
        </div>
      ))}

      {/* Action Plan Preview */}
      {Object.values(plan).some(v => v && typeof v === 'string' && v.trim()) && (
        <div className="rounded-xl bg-card border border-border p-4 shadow-card">
          <h3 className="font-heading font-bold text-sm mb-3">📋 Your 7-Day Action Plan</h3>
          <div className="space-y-2 text-sm">
            {FIELDS.map(f => {
              const val = (plan as any)[f.key];
              if (!val) return null;
              return (
                <div key={f.key} className="bg-muted rounded-lg p-2.5">
                  <span className="text-xs font-semibold text-muted-foreground block">{f.label.replace(/^.{2} /, '')}</span>
                  <span className="text-foreground">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button onClick={copy}
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy plan'}
        </button>
        <a href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition font-medium">
          <Mail className="w-4 h-4" /> Email to self
        </a>
      </div>
    </div>
  );
}
