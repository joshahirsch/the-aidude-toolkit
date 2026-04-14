import type {
  ActionPlan,
  EthicsFramework,
  PersonaProfile,
  PromptEntry,
  SavedLibraryItem,
  SessionType,
  WorkflowMap,
} from '@/types/toolkit';

interface SessionSummaryCardProps {
  session: SessionType;
  prompt?: PromptEntry | null;
  ethics?: EthicsFramework | null;
  persona?: PersonaProfile | null;
  workflow?: WorkflowMap | null;
  actionPlan?: ActionPlan | null;
  library?: SavedLibraryItem[];
}

const SESSION_LABELS: Record<SessionType, string> = {
  'talk-like-a-human': 'Talk Like a Human',
  'humanity-at-scale': 'Humanity at Scale',
};

function hasText(value?: string | null) {
  return Boolean(value && value.trim());
}

export default function SessionSummaryCard({
  session,
  prompt,
  ethics,
  persona,
  workflow,
  actionPlan,
  library = [],
}: SessionSummaryCardProps) {
  const builtCount = [prompt, ethics, persona, workflow, actionPlan].filter(Boolean).length + (library.length ? 1 : 0);

  const highlights: string[] = [];

  if (hasText(prompt?.goal)) highlights.push(`You built a working prompt focused on ${prompt?.goal?.toLowerCase()}.`);
  if (hasText(persona?.name)) highlights.push(`You created the persona \"${persona?.name}\" to guide future AI work.`);
  if (hasText(workflow?.workflowName)) highlights.push(`You identified \"${workflow?.workflowName}\" as a workflow worth improving with AI support.`);
  if (hasText(ethics?.humanReviewRequired)) highlights.push(`You documented where human review must stay in the loop.`);
  if (library.length) highlights.push(`You saved ${library.length} reusable item${library.length === 1 ? '' : 's'} to your library.`);

  const nextMoves = [
    actionPlan?.nextAction,
    workflow?.firstTestCase,
    prompt?.goal ? `Test your prompt on one real ${prompt.goal.toLowerCase()} draft this week.` : '',
    persona?.approvedTasks ? `Use your persona on one approved task: ${persona.approvedTasks.toLowerCase()}.` : '',
  ].filter(hasText).slice(0, 3) as string[];

  if (!builtCount) return null;

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-card">
      <p className="label-caps mb-2">Session summary</p>
      <h2 className="font-heading text-lg font-bold text-foreground mb-2">What you have so far</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {SESSION_LABELS[session]} is becoming a real working toolkit, not just a set of exercises.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Built so far</p>
          <ul className="space-y-2 text-sm text-foreground">
            {highlights.length ? highlights.map((item) => <li key={item}>• {item}</li>) : <li>• Start filling in modules to generate a useful summary.</li>}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Best next moves</p>
          <ul className="space-y-2 text-sm text-foreground">
            {nextMoves.length ? nextMoves.map((item) => <li key={item}>• {item}</li>) : <li>• Complete one module, save the output, and export the session bundle.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}
