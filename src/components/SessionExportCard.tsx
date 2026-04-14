import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import type {
  ActionPlan,
  AuthenticityScore,
  EthicsFramework,
  PersonaProfile,
  PromptEntry,
  SavedLibraryItem,
  SessionType,
  VoiceProfile,
  WorkflowMap,
} from '@/types/toolkit';
import { buildSessionBundle, downloadTextFile } from '@/lib/export';

interface SessionExportCardProps {
  session: SessionType;
  prompt?: PromptEntry | null;
  voice?: VoiceProfile | null;
  authenticity?: AuthenticityScore | null;
  ethics?: EthicsFramework | null;
  persona?: PersonaProfile | null;
  workflow?: WorkflowMap | null;
  actionPlan?: ActionPlan | null;
  library?: SavedLibraryItem[];
}

export default function SessionExportCard(props: SessionExportCardProps) {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const exportText = buildSessionBundle(props);
  const hasUsefulContent = exportText.split('\n').length > 4;

  const copy = async () => {
    await navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const filename = `ai-dude-toolkit-${props.session}.txt`;
    downloadTextFile(filename, exportText);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  if (!hasUsefulContent) return null;

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="label-caps mb-2">Take your work with you</p>
      <h2 className="font-heading text-lg font-bold text-foreground mb-2">Export your session toolkit</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Copy or download everything you&apos;ve built in this session so you can use it after the workshop.
      </p>
      <div className="rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground mb-4">
        <span className="font-semibold text-foreground">Best use:</span> paste the exported bundle into your notes, project doc, or team planning workflow so the work from this session turns into something actionable.
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied session export' : 'Copy full session export'}
        </button>
        <button
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
        >
          {downloaded ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
          {downloaded ? 'Downloaded' : 'Download .txt'}
        </button>
      </div>
    </section>
  );
}
