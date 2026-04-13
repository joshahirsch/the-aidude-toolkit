import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { buildPersonaText } from '@/lib/export';
import type { SessionType, PersonaProfile, SavedLibraryItem } from '@/types/toolkit';

const EMPTY: PersonaProfile = {
  id: '', name: '', role: '', audienceSegment: '', missionAlignment: '',
  toneGuidance: '', constraints: '', approvedTasks: '', outputs: '',
  reviewRequirements: '', successCriteria: '',
};

const TEMPLATES: { label: string; data: Partial<PersonaProfile> }[] = [
  { label: 'Stewardship Assistant', data: { name: 'Stewardship Assistant', role: 'Loyal donor stewardship support', audienceSegment: 'Active donors with 2+ year history', toneGuidance: 'Warm, grateful, specific about impact', approvedTasks: 'Draft thank-you notes, impact updates, milestone acknowledgments', constraints: 'Never make asks, always include specific impact data, requires human review' } },
  { label: 'Welcome Writer', data: { name: 'Welcome Writer', role: 'First-time donor welcome communications', audienceSegment: 'New donors within first 30 days', toneGuidance: 'Enthusiastic but not overwhelming, genuine, welcoming', approvedTasks: 'Welcome emails, community introductions, first impact updates', constraints: 'No asks in first 14 days, keep messages short, celebrate their decision' } },
  { label: 'Re-engagement Strategist', data: { name: 'Re-engagement Strategist', role: 'Lapsed donor win-back planning', audienceSegment: 'Donors with no gift in 12-36 months', toneGuidance: 'Respectful, curious, not guilt-based', approvedTasks: 'Re-engagement email drafts, survey questions, impact catch-up summaries', constraints: 'Never guilt-trip, acknowledge the gap honestly, offer low-barrier re-entry' } },
  { label: 'Campaign Adapter', data: { name: 'Campaign Message Adapter', role: 'Adapt campaign messages across channels', audienceSegment: 'All donor segments', toneGuidance: 'Consistent with campaign voice, adaptable to channel', approvedTasks: 'Channel-specific message drafts, social copy, email variations', constraints: 'Must maintain campaign core message, human review for all external content' } },
];

const FIELDS = [
  { key: 'name', label: 'Persona Name', placeholder: 'e.g. Stewardship Assistant' },
  { key: 'role', label: 'Persona Role', placeholder: 'e.g. Helps draft donor stewardship communications' },
  { key: 'audienceSegment', label: 'Audience Segment', placeholder: 'e.g. Active monthly donors, mid-level givers' },
  { key: 'missionAlignment', label: 'Mission / Values Alignment', placeholder: 'e.g. Centers donor dignity, never exploits beneficiary stories' },
  { key: 'toneGuidance', label: 'Tone and Voice Guidance', placeholder: 'e.g. Warm, specific, grateful, conversational' },
  { key: 'constraints', label: 'Constraints and Boundaries', placeholder: 'e.g. Never fabricates stories, always requires human review for external comms' },
  { key: 'approvedTasks', label: 'Approved Tasks', placeholder: 'e.g. Thank-you emails, impact updates, milestone notes' },
  { key: 'outputs', label: 'Outputs This Persona Supports', placeholder: 'e.g. Email drafts, talking points, social copy' },
  { key: 'reviewRequirements', label: 'Review Requirements', placeholder: 'e.g. All external content reviewed by Comms Director' },
  { key: 'successCriteria', label: 'What Success Looks Like', placeholder: 'e.g. Donors respond positively, messages feel personal, saves 2 hours/week' },
] as const;

export default function PersonaBuilder({ session }: { session: SessionType }) {
  const [persona, setPersona] = useLocalStorage<PersonaProfile>(`toolkit-persona-${session}`, EMPTY);
  const [library, setLibrary] = useLocalStorage<SavedLibraryItem[]>('toolkit-library', []);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key: string, value: string) => setPersona(prev => ({ ...prev, [key]: value }));
  const loadTemplate = (t: typeof TEMPLATES[0]) => setPersona(prev => ({ ...prev, ...t.data }));
  const reset = () => setPersona({ ...EMPTY });

  const exportText = buildPersonaText(persona);

  const copy = () => { navigator.clipboard.writeText(`PERSONA PROFILE\n\n${exportText}`); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const save = () => {
    const item: SavedLibraryItem = {
      id: Date.now().toString(), type: 'persona',
      title: persona.name || 'Untitled persona',
      content: exportText, tags: [], category: 'persona-based prompts',
      isFavorite: false, createdAt: new Date().toISOString(),
    };
    setLibrary(prev => [item, ...prev]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Build a fundraising-specific AI persona — a structured profile that guides how AI should work for a specific purpose.
      </p>

      <div>
        <label className="block text-sm font-semibold font-heading mb-2">Start from a template</label>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map(t => (
            <button key={t.label} onClick={() => loadTemplate(t)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
              {t.label}
            </button>
          ))}
          <button onClick={reset}
            className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors font-medium">
            <RotateCcw className="w-3 h-3 inline mr-1" />Reset
          </button>
        </div>
      </div>

      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
          <textarea value={(persona as any)[f.key]} onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[60px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
        </div>
      ))}

      <div className="flex gap-2">
        <button onClick={copy}
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy persona'}
        </button>
        <button onClick={save}
          className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition font-medium">
          {saved ? <Check className="w-4 h-4" /> : '💾'}
          {saved ? 'Saved!' : 'Save to library'}
        </button>
      </div>
    </div>
  );
}
