import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Megaphone, Shield, Users, Rocket, ArrowLeft, ChevronRight } from 'lucide-react';
import type {
  ActionPlan,
  AuthenticityScore,
  EthicsFramework,
  ModuleId,
  ModuleZone,
  PersonaProfile,
  PromptEntry,
  SavedLibraryItem,
  SessionType,
  VoiceProfile,
  WorkflowMap,
} from '@/types/toolkit';
import { ZONES, MODULE_INFO, SESSION_MODULE_ORDER } from '@/types/toolkit';
import PromptBuilder from '@/components/modules/PromptBuilder';
import PromptTeardown from '@/components/modules/PromptTeardown';
import ScenarioGenerator from '@/components/modules/ScenarioGenerator';
import ChannelStudio from '@/components/modules/ChannelStudio';
import VoiceGuardrails from '@/components/modules/VoiceGuardrails';
import AuthenticityRubric from '@/components/modules/AuthenticityRubric';
import EthicalGuardrails from '@/components/modules/EthicalGuardrails';
import PersonaBuilder from '@/components/modules/PersonaBuilder';
import PromptLibrary from '@/components/modules/PromptLibrary';
import WorkflowMapper from '@/components/modules/WorkflowMapper';
import ActionPlanModule from '@/components/modules/ActionPlanModule';
import SessionExportCard from '@/components/SessionExportCard';

const ZONE_ICONS: Record<ModuleZone, React.ElementType> = {
  'prompt-lab': BookOpen,
  'channel-studio': Megaphone,
  'voice-trust': Shield,
  'persona-lab': Users,
  'action-kit': Rocket,
};

const MODULE_COMPONENTS: Record<ModuleId, React.ComponentType<{ session: SessionType }>> = {
  'prompt-builder': PromptBuilder,
  'prompt-teardown': PromptTeardown,
  'scenario-generator': ScenarioGenerator,
  'channel-studio': ChannelStudio,
  'voice-guardrails': VoiceGuardrails,
  'authenticity-rubric': AuthenticityRubric,
  'ethical-guardrails': EthicalGuardrails,
  'persona-builder': PersonaBuilder,
  'prompt-library': PromptLibrary,
  'workflow-mapper': WorkflowMapper,
  'action-plan': ActionPlanModule,
};

const SESSION_TITLES: Record<SessionType, string> = {
  'talk-like-a-human': 'Talk Like a Human',
  'humanity-at-scale': 'Humanity at Scale',
};

const SESSION_DESCRIPTIONS: Record<SessionType, string> = {
  'talk-like-a-human': 'Prompting fundamentals, channel adaptation, and voice protection for fundraising communications.',
  'humanity-at-scale': 'Authentic donor communications with personas, guardrails, and ethical AI practices.',
};

function readStored<T>(key: string): T | null {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch {
    return null;
  }
}

export default function Session() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const session = (sessionId as SessionType) || 'talk-like-a-human';

  const [activeZone, setActiveZone] = useState<ModuleZone>(SESSION_MODULE_ORDER[session][0]);
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);

  const orderedZones = useMemo(() => {
    const order = SESSION_MODULE_ORDER[session];
    return order.map(zId => ZONES.find(z => z.id === zId)!);
  }, [session]);

  const exportData = useMemo(() => ({
    prompt: readStored<PromptEntry>('toolkit-prompt-current'),
    voice: readStored<VoiceProfile>(`toolkit-voice-${session}`),
    authenticity: readStored<AuthenticityScore>(`toolkit-rubric-${session}`),
    ethics: readStored<EthicsFramework>(`toolkit-ethics-${session}`),
    persona: readStored<PersonaProfile>(`toolkit-persona-${session}`),
    workflow: readStored<WorkflowMap>(`toolkit-workflow-${session}`),
    actionPlan: readStored<ActionPlan>(`toolkit-action-${session}`),
    library: readStored<SavedLibraryItem[]>('toolkit-library') ?? [],
  }), [session]);

  const ActiveComponent = activeModule ? MODULE_COMPONENTS[activeModule] : null;

  if (activeModule && ActiveComponent) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
          <div className="container max-w-3xl mx-auto flex items-center gap-3">
            <button onClick={() => setActiveModule(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-xs text-muted-foreground">{SESSION_TITLES[session]}</p>
              <h1 className="font-heading font-bold text-sm">{MODULE_INFO[activeModule].title}</h1>
            </div>
          </div>
        </header>
        <main className="px-4 py-6">
          <div className="container max-w-3xl mx-auto">
            <ActiveComponent session={session} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 pt-6 pb-6">
        <div className="container max-w-3xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <p className="label-caps mb-1">{session === 'talk-like-a-human' ? 'Session 1' : 'Session 2'}</p>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{SESSION_TITLES[session]}</h1>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-lg">
            {SESSION_DESCRIPTIONS[session]}
          </p>
        </div>
      </header>

      {/* Zone tabs */}
      <nav className="sticky top-0 z-20 bg-card border-b border-border">
        <div className="container max-w-3xl mx-auto flex overflow-x-auto scrollbar-none">
          {orderedZones.map(z => {
            const Icon = ZONE_ICONS[z.id];
            const isActive = activeZone === z.id;
            return (
              <button key={z.id} onClick={() => setActiveZone(z.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
                  isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}>
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{z.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Module list */}
      <main className="px-4 py-6">
        <div className="container max-w-3xl mx-auto space-y-6">
          <section className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="label-caps mb-2">Use this after the session too</p>
            <h2 className="font-heading text-lg font-bold text-foreground mb-2">Turn workshop exercises into real work</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Build one usable prompt, persona, or guardrail before you leave.</li>
              <li>Save your best outputs to the library so you can reuse them at work.</li>
              <li>Export your session bundle at the end and share it with yourself or your team.</li>
            </ul>
          </section>

          <div className="space-y-2">
            {ZONES.find(z => z.id === activeZone)!.modules.map(mId => {
              const info = MODULE_INFO[mId];
              return (
                <button key={mId} onClick={() => setActiveModule(mId)}
                  className="w-full text-left flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors group">
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {info.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{info.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              );
            })}
          </div>

          <SessionExportCard
            session={session}
            prompt={exportData.prompt}
            voice={exportData.voice}
            authenticity={exportData.authenticity}
            ethics={exportData.ethics}
            persona={exportData.persona}
            workflow={exportData.workflow}
            actionPlan={exportData.actionPlan}
            library={exportData.library}
          />
        </div>
      </main>
    </div>
  );
}
