import { useState } from 'react';
import { Copy, Check, RotateCcw, BookmarkPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType, PromptEntry, SavedLibraryItem } from '@/types/toolkit';

const FIELDS = [
  { key: 'role', label: 'Role', placeholder: 'e.g. You are an experienced fundraising copywriter...', help: 'What role should the AI take on?' },
  { key: 'audience', label: 'Audience', placeholder: 'e.g. Lapsed donors who gave 2+ years ago...', help: 'Who is the target audience?' },
  { key: 'goal', label: 'Goal', placeholder: 'e.g. Write a re-engagement email that...', help: 'What do you want to achieve?' },
  { key: 'context', label: 'Context', placeholder: 'e.g. Our org focuses on clean water access in East Africa...', help: 'What background is needed?' },
  { key: 'tone', label: 'Tone & Voice', placeholder: 'e.g. Warm, genuine, conversational but professional...', help: 'How should it sound?' },
  { key: 'constraints', label: 'Constraints', placeholder: 'e.g. Max 200 words, no jargon, include a specific story...', help: 'What limits or rules apply?' },
  { key: 'outputFormat', label: 'Output Format', placeholder: 'e.g. Email with subject line, preview text, body, and P.S.', help: 'What format should the output take?' },
  { key: 'successCriteria', label: 'Success Criteria', placeholder: 'e.g. Feels personal, includes a clear CTA, avoids guilt...', help: 'How will you judge quality?' },
] as const;

const EMPTY: PromptEntry = {
  id: '', role: '', audience: '', goal: '', context: '', tone: '',
  constraints: '', outputFormat: '', successCriteria: '',
  createdAt: '', tags: [], category: '', isFavorite: false,
};

const EXAMPLES: Record<SessionType, Partial<PromptEntry>> = {
  'talk-like-a-human': {
    role: 'You are a fundraising communications specialist with 10 years of experience in nonprofit email marketing.',
    audience: 'Monthly donors who have been giving for 6+ months but haven\'t increased their gift.',
    goal: 'Write an upgrade appeal email that celebrates their impact and invites them to increase their monthly gift by $10.',
    context: 'We\'re a food bank that served 50,000 families last year. Our monthly giving program is called "Nourish Circle."',
    tone: 'Warm, grateful, conversational. Like a letter from a trusted friend who works at the organization.',
    constraints: 'Under 250 words. No guilt. No statistics overload. Include one specific family story (anonymized).',
    outputFormat: 'Email with: subject line, preview text, greeting, 3-paragraph body, CTA button text, P.S. line.',
    successCriteria: 'Feels personal, celebrates the donor, makes the ask feel natural, avoids sounding mass-produced.',
  },
  'humanity-at-scale': {
    role: 'You are a donor stewardship coordinator who deeply understands relationship-based fundraising.',
    audience: 'First-time donors who gave during a year-end campaign but haven\'t been thanked beyond the automated receipt.',
    goal: 'Write a personal thank-you message that makes this donor feel seen and valued, and sets the foundation for a long-term relationship.',
    context: 'We\'re an education nonprofit. The donor gave $75 during our "Bright Futures" campaign.',
    tone: 'Sincere, specific, human. Avoid corporate language. Sound like a real person who genuinely cares.',
    constraints: 'Under 150 words. Reference their specific gift. No ask for another donation.',
    outputFormat: 'Short email or handwritten note style message.',
    successCriteria: 'A donor reading this should think: "They actually noticed me." Not: "This is a form letter."',
  },
};

export default function PromptBuilder({ session }: { session: SessionType }) {
  const [entry, setEntry] = useState<PromptEntry>({ ...EMPTY });
  const [stepMode, setStepMode] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [library, setLibrary] = useLocalStorage<SavedLibraryItem[]>('toolkit-library', []);

  const update = (key: string, value: string) => setEntry(prev => ({ ...prev, [key]: value }));

  const assembledPrompt = FIELDS
    .filter(f => entry[f.key as keyof PromptEntry])
    .map(f => `**${f.label}:** ${entry[f.key as keyof PromptEntry]}`)
    .join('\n\n');

  const copyPrompt = () => {
    navigator.clipboard.writeText(assembledPrompt.replace(/\*\*/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToLibrary = () => {
    const item: SavedLibraryItem = {
      id: Date.now().toString(),
      type: 'prompt',
      title: entry.goal.slice(0, 60) || 'Untitled prompt',
      content: assembledPrompt.replace(/\*\*/g, ''),
      tags: [], category: 'appeals', isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setLibrary(prev => [item, ...prev]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const loadExample = () => {
    const ex = EXAMPLES[session];
    setEntry(prev => ({ ...prev, ...ex }));
  };

  const reset = () => { setEntry({ ...EMPTY }); setCurrentStep(0); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Build a structured fundraising prompt step by step. Fill in each field to create a clear, effective prompt.
        </p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setStepMode(!stepMode)}
            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
            {stepMode ? 'Show all fields' : 'Step-by-step mode'}
          </button>
          <button onClick={loadExample}
            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
            Load example
          </button>
          <button onClick={reset}
            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors font-medium">
            <RotateCcw className="w-3 h-3 inline mr-1" />Reset
          </button>
        </div>
      </div>

      {/* Fields */}
      {stepMode ? (
        <div className="space-y-4">
          {FIELDS.map((f, i) => (
            <div key={f.key} className={i === currentStep ? '' : 'hidden'}>
              <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
              <p className="text-xs text-muted-foreground mb-2">{f.help}</p>
              <textarea
                value={(entry as any)[f.key]}
                onChange={e => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[100px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition"
              />
              <div className="flex justify-between mt-3">
                <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={i === 0}
                  className="text-sm px-4 py-2 rounded-lg bg-muted text-muted-foreground disabled:opacity-40 hover:bg-muted/80 transition">
                  Back
                </button>
                <span className="text-xs text-muted-foreground self-center">{i + 1} / {FIELDS.length}</span>
                <button onClick={() => setCurrentStep(Math.min(FIELDS.length - 1, currentStep + 1))} disabled={i === FIELDS.length - 1}
                  className="text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition font-medium">
                  Next
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {FIELDS.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
              <textarea
                value={(entry as any)[f.key]}
                onChange={e => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[80px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition"
              />
            </div>
          ))}
        </div>
      )}

      {/* Preview */}
      {assembledPrompt && (
        <div className="rounded-xl bg-card border border-border p-4 shadow-card">
          <h3 className="font-heading font-semibold text-sm mb-3">Your Assembled Prompt</h3>
          <div className="text-sm text-card-foreground whitespace-pre-wrap bg-muted rounded-lg p-4 font-mono text-xs leading-relaxed">
            {assembledPrompt.replace(/\*\*/g, '')}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={copyPrompt}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={saveToLibrary}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition font-medium">
              {saved ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              {saved ? 'Saved!' : 'Save to library'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
