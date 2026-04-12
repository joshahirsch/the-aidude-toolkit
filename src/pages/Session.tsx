import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lightbulb, Megaphone, Shield, Users, Rocket, ArrowLeft, ChevronRight } from 'lucide-react';
import type { SessionType, ModuleZone, ModuleId } from '@/types/toolkit';
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

const ZONE_ICONS: Record<ModuleZone, React.ElementType> = {
  'prompt-lab': Lightbulb,
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

  const ActiveComponent = activeModule ? MODULE_COMPONENTS[activeModule] : null;

  if (activeModule && ActiveComponent) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b border-border px-4 py-3">
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
      <header className="bg-hero text-primary-foreground px-4 pt-6 pb-8">
        <div className="container max-w-3xl mx-auto">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground/90 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-heading text-2xl md:text-3xl font-bold">{SESSION_TITLES[session]}</h1>
          <p className="text-sm text-primary-foreground/60 mt-1">
            {session === 'talk-like-a-human'
              ? 'Master prompting fundamentals, adapt across channels, and protect your voice.'
              : 'Build authentic donor communications with personas, guardrails, and ethical AI practices.'}
          </p>
        </div>
      </header>

      {/* Bottom nav */}
      <nav className="sticky top-0 z-20 bg-card/95 backdrop-blur border-b border-border">
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
        <div className="container max-w-3xl mx-auto space-y-3">
          {ZONES.find(z => z.id === activeZone)!.modules.map(mId => {
            const info = MODULE_INFO[mId];
            return (
              <button key={mId} onClick={() => setActiveModule(mId)}
                className="w-full text-left flex items-center gap-4 p-4 rounded-xl bg-card shadow-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all group">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{info.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
