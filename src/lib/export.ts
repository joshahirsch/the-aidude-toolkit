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

const SESSION_LABELS: Record<SessionType, string> = {
  'talk-like-a-human': 'Talk Like a Human',
  'humanity-at-scale': 'Humanity at Scale',
};

function section(title: string, body: string) {
  return `## ${title}\n\n${body.trim() || '(not set)'}`;
}

function value(input: string | string[] | undefined | null) {
  if (Array.isArray(input)) return input.filter(Boolean).join(', ');
  return input?.trim() || '(not set)';
}

export function buildPromptText(prompt: PromptEntry) {
  return [
    `Role: ${value(prompt.role)}`,
    `Audience: ${value(prompt.audience)}`,
    `Goal: ${value(prompt.goal)}`,
    `Context: ${value(prompt.context)}`,
    `Tone & Voice: ${value(prompt.tone)}`,
    `Constraints: ${value(prompt.constraints)}`,
    `Output Format: ${value(prompt.outputFormat)}`,
    `Success Criteria: ${value(prompt.successCriteria)}`,
  ].join('\n\n');
}

export function buildPersonaText(persona: PersonaProfile) {
  return [
    `Persona Name: ${value(persona.name)}`,
    `Persona Role: ${value(persona.role)}`,
    `Audience Segment: ${value(persona.audienceSegment)}`,
    `Mission / Values Alignment: ${value(persona.missionAlignment)}`,
    `Tone and Voice Guidance: ${value(persona.toneGuidance)}`,
    `Constraints and Boundaries: ${value(persona.constraints)}`,
    `Approved Tasks: ${value(persona.approvedTasks)}`,
    `Outputs This Persona Supports: ${value(persona.outputs)}`,
    `Review Requirements: ${value(persona.reviewRequirements)}`,
    `What Success Looks Like: ${value(persona.successCriteria)}`,
  ].join('\n');
}

export function buildVoiceGuideText(profile: VoiceProfile) {
  return [
    `Tone: ${value(profile.toneWords)}`,
    `What sincerity sounds like: ${value(profile.sinceritySounds)}`,
    `What robotic sounds like: ${value(profile.roboticSounds)}`,
    `Phrases to avoid: ${value(profile.phrasesToAvoid)}`,
    `Phrases we use intentionally: ${value(profile.phrasesWeUse)}`,
    `Donor trust cues: ${value(profile.donorTrustCues)}`,
    `Brand red flags: ${value(profile.brandRedFlags)}`,
    `Editing reminders: ${value(profile.editingReminders)}`,
  ].join('\n');
}

export function buildEthicsText(framework: EthicsFramework) {
  return [
    `What AI should never do: ${value(framework.neverDo)}`,
    `Where human review is required: ${value(framework.humanReviewRequired)}`,
    `Privacy and data boundaries: ${value(framework.privacyBoundaries)}`,
    `Donor discomfort risks: ${value(framework.discomfortRisks)}`,
    `Over-personalization red flags: ${value(framework.overPersonalization)}`,
    `Accuracy checks: ${value(framework.accuracyChecks)}`,
    `Approval owner: ${value(framework.approvalOwner)}`,
    `Internal policy notes: ${value(framework.policyNotes)}`,
  ].join('\n\n');
}

export function buildWorkflowText(workflow: WorkflowMap) {
  return [
    `Current workflow name: ${value(workflow.workflowName)}`,
    `Current steps: ${value(workflow.currentSteps)}`,
    `Bottlenecks: ${value(workflow.bottlenecks)}`,
    `Repetitive tasks: ${value(workflow.repetitiveTasks)}`,
    `Where structured prompting helps: ${value(workflow.promptingHelps)}`,
    `Where human ownership must stay: ${value(workflow.humanOwnership)}`,
    `Potential time saved: ${value(workflow.timeSaved)}`,
    `First test use case: ${value(workflow.firstTestCase)}`,
  ].join('\n\n');
}

export function buildActionPlanText(session: SessionType, plan: ActionPlan) {
  return [
    `Session: ${SESSION_LABELS[session]}`,
    `First prompt I will build: ${value(plan.firstPrompt)}`,
    `First persona I will build: ${value(plan.firstPersona)}`,
    `First communication use case I will test: ${value(plan.firstUseCase)}`,
    `First channel I will test: ${value(plan.firstChannel)}`,
    `One ethical safeguard I need: ${value(plan.ethicalSafeguard)}`,
    `One stakeholder I need to involve: ${value(plan.stakeholder)}`,
    `One workflow I can improve this month: ${value(plan.workflowToImprove)}`,
    `Next action within 7 days: ${value(plan.nextAction)}`,
  ].join('\n\n');
}

export function buildAuthenticityText(score: AuthenticityScore) {
  const categories: Array<[string, number]> = [
    ['Specificity', score.specificity],
    ['Relevance', score.relevance],
    ['Empathy', score.empathy],
    ['Donor-Centeredness', score.donorCenteredness],
    ['Mission Alignment', score.missionAlignment],
    ['Credibility', score.credibility],
    ['Trustworthiness', score.trustworthiness],
    ['Over-Polish Risk', score.overPolishRisk],
  ];

  const adjusted = categories.reduce((sum, [label, rating]) => sum + (label === 'Over-Polish Risk' ? 10 - rating : rating), 0);
  const maxScore = categories.length * 10;
  const pct = Math.round((adjusted / maxScore) * 100);
  const label = pct >= 80 ? 'Strong' : pct >= 60 ? 'Good' : pct >= 40 ? 'Needs work' : 'Weak';

  return [
    `Authenticity Score: ${adjusted}/${maxScore} (${pct}%) - ${label}`,
    ...categories.map(([title, rating]) => `${title}: ${rating}/10`),
    `Notes: ${value(score.notes)}`,
  ].join('\n');
}

export function buildSessionBundle(params: {
  session: SessionType;
  prompt?: PromptEntry | null;
  voice?: VoiceProfile | null;
  authenticity?: AuthenticityScore | null;
  ethics?: EthicsFramework | null;
  persona?: PersonaProfile | null;
  workflow?: WorkflowMap | null;
  actionPlan?: ActionPlan | null;
  library?: SavedLibraryItem[];
}) {
  const { session, prompt, voice, authenticity, ethics, persona, workflow, actionPlan, library = [] } = params;

  const sections = [
    `# The AI Dude Toolkit Export\n\nSession: ${SESSION_LABELS[session]}`,
  ];

  if (prompt && Object.values(prompt).some((item) => typeof item === 'string' && item.trim())) {
    sections.push(section('Prompt Builder', buildPromptText(prompt)));
  }

  if (voice && (voice.toneWords.some(Boolean) || Object.values(voice).some((item) => typeof item === 'string' && item.trim()))) {
    sections.push(section('Voice Guide', buildVoiceGuideText(voice)));
  }

  if (authenticity && Object.values(authenticity).some((item) => typeof item === 'number' || (typeof item === 'string' && item.trim()))) {
    sections.push(section('Authenticity Rubric', buildAuthenticityText(authenticity)));
  }

  if (ethics && Object.values(ethics).some((item) => typeof item === 'string' && item.trim())) {
    sections.push(section('Ethical Guardrails', buildEthicsText(ethics)));
  }

  if (persona && Object.values(persona).some((item) => typeof item === 'string' && item.trim())) {
    sections.push(section('Persona Profile', buildPersonaText(persona)));
  }

  if (workflow && Object.values(workflow).some((item) => typeof item === 'string' && item.trim())) {
    sections.push(section('Workflow Map', buildWorkflowText(workflow)));
  }

  if (actionPlan && Object.values(actionPlan).some((item) => typeof item === 'string' && item.trim())) {
    sections.push(section('7-Day Action Plan', buildActionPlanText(session, actionPlan)));
  }

  if (library.length) {
    sections.push(section(
      'Saved Library Items',
      library
        .map((item, index) => `### ${index + 1}. ${item.title || 'Untitled item'}\nType: ${item.type}\nCategory: ${item.category || '(not set)'}\n\n${value(item.content)}`)
        .join('\n\n'),
    ));
  }

  return sections.join('\n\n');
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
