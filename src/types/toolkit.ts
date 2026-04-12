export type SessionType = 'talk-like-a-human' | 'humanity-at-scale';

export type ModuleId = 
  | 'prompt-builder' | 'prompt-teardown' | 'scenario-generator'
  | 'channel-studio' | 'voice-guardrails' | 'authenticity-rubric'
  | 'ethical-guardrails' | 'persona-builder' | 'prompt-library'
  | 'workflow-mapper' | 'action-plan';

export type ModuleZone = 'prompt-lab' | 'channel-studio' | 'voice-trust' | 'persona-lab' | 'action-kit';

export interface PromptEntry {
  id: string;
  role: string;
  audience: string;
  goal: string;
  context: string;
  tone: string;
  constraints: string;
  outputFormat: string;
  successCriteria: string;
  createdAt: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
}

export interface ChannelPlan {
  id: string;
  coreBrief: string;
  channels: ChannelEntry[];
}

export interface ChannelEntry {
  channel: string;
  length: string;
  tone: string;
  ctaStyle: string;
  pacing: string;
  consistency: string;
  humanEditing: string;
  promptFramework: string;
}

export interface VoiceProfile {
  id: string;
  toneWords: string[];
  sinceritySounds: string;
  roboticSounds: string;
  phrasesToAvoid: string;
  phrasesWeUse: string;
  donorTrustCues: string;
  brandRedFlags: string;
  editingReminders: string;
}

export interface AuthenticityScore {
  id: string;
  specificity: number;
  relevance: number;
  empathy: number;
  donorCenteredness: number;
  missionAlignment: number;
  credibility: number;
  trustworthiness: number;
  overPolishRisk: number;
  notes: string;
}

export interface EthicsFramework {
  id: string;
  neverDo: string;
  humanReviewRequired: string;
  privacyBoundaries: string;
  discomfortRisks: string;
  overPersonalization: string;
  accuracyChecks: string;
  approvalOwner: string;
  policyNotes: string;
}

export interface PersonaProfile {
  id: string;
  name: string;
  role: string;
  audienceSegment: string;
  missionAlignment: string;
  toneGuidance: string;
  constraints: string;
  approvedTasks: string;
  outputs: string;
  reviewRequirements: string;
  successCriteria: string;
  template?: string;
}

export interface WorkflowMap {
  id: string;
  workflowName: string;
  currentSteps: string;
  bottlenecks: string;
  repetitiveTasks: string;
  promptingHelps: string;
  humanOwnership: string;
  timeSaved: string;
  firstTestCase: string;
}

export interface ActionPlan {
  id: string;
  firstPrompt: string;
  firstPersona: string;
  firstUseCase: string;
  firstChannel: string;
  ethicalSafeguard: string;
  stakeholder: string;
  workflowToImprove: string;
  nextAction: string;
}

export interface SavedLibraryItem {
  id: string;
  type: 'prompt' | 'persona' | 'voice' | 'ethics' | 'workflow' | 'action-plan' | 'channel';
  title: string;
  content: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: string;
}

export const ZONES: { id: ModuleZone; label: string; icon: string; modules: ModuleId[] }[] = [
  { id: 'prompt-lab', label: 'Prompt Lab', icon: 'Lightbulb', modules: ['prompt-builder', 'prompt-teardown', 'scenario-generator'] },
  { id: 'channel-studio', label: 'Channel Studio', icon: 'Megaphone', modules: ['channel-studio'] },
  { id: 'voice-trust', label: 'Voice + Trust', icon: 'Shield', modules: ['voice-guardrails', 'authenticity-rubric', 'ethical-guardrails'] },
  { id: 'persona-lab', label: 'Persona Lab', icon: 'Users', modules: ['persona-builder'] },
  { id: 'action-kit', label: 'Action Kit', icon: 'Rocket', modules: ['prompt-library', 'workflow-mapper', 'action-plan'] },
];

export const MODULE_INFO: Record<ModuleId, { title: string; description: string; zone: ModuleZone }> = {
  'prompt-builder': { title: 'Prompt Builder', description: 'Build structured fundraising prompts step by step', zone: 'prompt-lab' },
  'prompt-teardown': { title: 'Weak vs Strong', description: 'Compare and learn from prompt examples', zone: 'prompt-lab' },
  'scenario-generator': { title: 'Scenarios', description: 'Practice with real fundraising scenarios', zone: 'prompt-lab' },
  'channel-studio': { title: 'Channel Studio', description: 'Adapt messages across communication channels', zone: 'channel-studio' },
  'voice-guardrails': { title: 'Voice Guardrails', description: 'Define your brand voice and trust signals', zone: 'voice-trust' },
  'authenticity-rubric': { title: 'Human Test', description: 'Score your communications for authenticity', zone: 'voice-trust' },
  'ethical-guardrails': { title: 'Ethics Builder', description: 'Set responsible AI communication practices', zone: 'voice-trust' },
  'persona-builder': { title: 'Persona Builder', description: 'Create fundraising-specific AI personas', zone: 'persona-lab' },
  'prompt-library': { title: 'Prompt Library', description: 'Save and organize your best prompts', zone: 'action-kit' },
  'workflow-mapper': { title: 'Workflow Mapper', description: 'Map where AI fits in your workflows', zone: 'action-kit' },
  'action-plan': { title: '7-Day Plan', description: 'Turn insights into practical next steps', zone: 'action-kit' },
};

export const SESSION_MODULE_ORDER: Record<SessionType, ModuleZone[]> = {
  'talk-like-a-human': ['prompt-lab', 'channel-studio', 'voice-trust', 'action-kit', 'persona-lab'],
  'humanity-at-scale': ['voice-trust', 'persona-lab', 'prompt-lab', 'channel-studio', 'action-kit'],
};
