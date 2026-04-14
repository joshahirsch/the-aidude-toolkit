import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { buildEthicsText } from '@/lib/export';
import type { SessionType, EthicsFramework } from '@/types/toolkit';

const EMPTY: EthicsFramework = {
  id: '', neverDo: '', humanReviewRequired: '', privacyBoundaries: '',
  discomfortRisks: '', overPersonalization: '', accuracyChecks: '',
  approvalOwner: '', policyNotes: '',
};

const FIELDS = [
  { key: 'neverDo', label: 'What AI should never do', placeholder: 'e.g. Never fabricate donor stories, never use guilt-based language, never impersonate a real person...' },
  { key: 'humanReviewRequired', label: 'Where human review is required', placeholder: 'e.g. All major donor communications, anything mentioning specific gifts, board-facing content...' },
  { key: 'privacyBoundaries', label: 'Privacy and data boundaries', placeholder: 'e.g. Never use real donor names in prompts, no financial data in AI tools, anonymize all examples...' },
  { key: 'discomfortRisks', label: 'Donor discomfort risks', placeholder: 'e.g. Overly familiar tone with new donors, assumptions about giving capacity, unsolicited advice...' },
  { key: 'overPersonalization', label: 'Over-personalization red flags', placeholder: 'e.g. Referencing personal details not shared with us, assuming family situations, predictive assumptions...' },
  { key: 'accuracyChecks', label: 'Accuracy checks', placeholder: 'e.g. Verify all statistics, confirm story details with program team, check gift amounts against records...' },
  { key: 'approvalOwner', label: 'Approval owner', placeholder: 'e.g. Communications Director for external content, Major Gifts Officer for donor-specific messages...' },
  { key: 'policyNotes', label: 'Internal policy notes', placeholder: 'e.g. AI use policy last updated March 2026, board approved AI communications guidelines...' },
] as const;

type OutputView = 'summary' | 'team' | 'leadership';

export default function EthicalGuardrails({ session }: { session: SessionType }) {
  const [framework, setFramework] = useLocalStorage<EthicsFramework>(`toolkit-ethics-${session}`, EMPTY);
  const [outputView, setOutputView] = useState<OutputView>('summary');
  const [copied, setCopied] = useState(false);

  const update = (key: string, value: string) => setFramework(prev => ({ ...prev, [key]: value }));

  const getText = (view: OutputView) => {
    const base = buildEthicsText(framework);
    if (view === 'summary') return `ETHICAL GUARDRAILS — Summary\n\n${base}`;
    if (view === 'team') return `ETHICAL GUARDRAILS — Team Discussion Guide\n\n${base}\n\nDiscussion Questions:\n1. Are there gaps in our current safeguards?\n2. Who needs to be involved in review processes?\n3. What training do we need?`;
    return `ETHICAL GUARDRAILS — Leadership Brief\n\nKey Points:\n- AI Never Does: ${framework.neverDo || '(not set)'}\n- Human Review Required: ${framework.humanReviewRequired || '(not set)'}\n- Privacy Boundaries: ${framework.privacyBoundaries || '(not set)'}\n- Approval Owner: ${framework.approvalOwner || '(not set)'}`;
  };

  const copy = () => { navigator.clipboard.writeText(getText(outputView)); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Define your organization's responsible AI communication practices. Build a framework your team can reference.
        </p>
        <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Use this at work:</span> this module becomes more valuable when it reflects your real approval path, privacy boundaries, and donor communication risk tolerance, not idealized policy language.
        </div>
      </div>

      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
          <textarea value={(framework as any)[f.key]} onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[70px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
        </div>
      ))}

      <div>
        <label className="block text-sm font-semibold font-heading mb-2">Export format</label>
        <div className="flex gap-2">
          {(['summary', 'team', 'leadership'] as const).map(v => (
            <button key={v} onClick={() => setOutputView(v)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${
                outputView === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}>
              {v === 'team' ? 'Team discussion' : v === 'leadership' ? 'Leadership brief' : 'Full summary'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Best next move</p>
        <p>Share the team discussion or leadership brief version with the actual reviewer, manager, or comms lead who would need to approve AI-assisted donor communications.</p>
      </div>

      <button onClick={copy}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy guardrails'}
      </button>
    </div>
  );
}
