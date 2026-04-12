import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType, WorkflowMap } from '@/types/toolkit';

const EMPTY: WorkflowMap = {
  id: '', workflowName: '', currentSteps: '', bottlenecks: '',
  repetitiveTasks: '', promptingHelps: '', humanOwnership: '',
  timeSaved: '', firstTestCase: '',
};

const FIELDS = [
  { key: 'workflowName', label: 'Current workflow name', placeholder: 'e.g. Monthly donor thank-you process' },
  { key: 'currentSteps', label: 'Current steps', placeholder: 'e.g. 1. Pull donor list 2. Draft template 3. Personalize each 4. Review 5. Send' },
  { key: 'bottlenecks', label: 'Bottlenecks', placeholder: 'e.g. Personalizing 200+ emails takes 3 days of staff time' },
  { key: 'repetitiveTasks', label: 'Repetitive tasks', placeholder: 'e.g. Writing similar opening paragraphs, formatting donor names and gift amounts' },
  { key: 'promptingHelps', label: 'Where structured prompting helps', placeholder: 'e.g. Draft first versions of personalized paragraphs using gift history' },
  { key: 'humanOwnership', label: 'Where human ownership must stay', placeholder: 'e.g. Final review, story selection, donor-specific notes, emotional tone check' },
  { key: 'timeSaved', label: 'Potential time saved', placeholder: 'e.g. Could reduce from 3 days to 1 day with AI-assisted drafting' },
  { key: 'firstTestCase', label: 'First test use case', placeholder: 'e.g. Use AI to draft thank-you emails for next month\'s cohort of 50 donors' },
] as const;

export default function WorkflowMapper({ session }: { session: SessionType }) {
  const [workflow, setWorkflow] = useLocalStorage<WorkflowMap>(`toolkit-workflow-${session}`, EMPTY);
  const [copied, setCopied] = useState(false);

  const update = (key: string, value: string) => setWorkflow(prev => ({ ...prev, [key]: value }));

  const exportText = FIELDS.map(f => `${f.label}: ${(workflow as any)[f.key] || '(not set)'}`).join('\n\n');

  const copy = () => { navigator.clipboard.writeText(`WORKFLOW MAP\n\n${exportText}`); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Map where AI-supported workflows fit in your fundraising work. Identify what to automate and what to keep human.
      </p>

      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
          <textarea value={(workflow as any)[f.key]} onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[70px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
        </div>
      ))}

      <button onClick={copy}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy workflow map'}
      </button>
    </div>
  );
}
