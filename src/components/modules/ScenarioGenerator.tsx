import { useState } from 'react';
import { Shuffle, ArrowRight } from 'lucide-react';
import type { SessionType } from '@/types/toolkit';

interface Scenario {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  context: string;
  recommendedUse: string;
}

const SCENARIOS: Record<SessionType, Scenario[]> = {
  'talk-like-a-human': [
    { title: 'Appeal Email', description: 'Write a year-end appeal to lapsed donors', difficulty: 'Beginner', context: 'Your food bank needs to re-engage donors who gave last year but haven\'t donated this year.', recommendedUse: 'Best for annual appeals or donor reactivation campaigns.' },
    { title: 'Thank-You Email', description: 'Craft a genuine thank-you for first-time donors', difficulty: 'Beginner', context: 'A donor just gave $50 to your education nonprofit for the first time.', recommendedUse: 'Best for stewardship teams improving first-donor retention.' },
    { title: 'Campaign Update', description: 'Share mid-campaign progress with existing supporters', difficulty: 'Intermediate', context: 'You\'re 60% to your goal with 2 weeks left in your annual campaign.', recommendedUse: 'Best for campaign momentum emails, landing pages, or donor updates.' },
    { title: 'Board Summary', description: 'Summarize fundraising results for board members', difficulty: 'Intermediate', context: 'Q3 results: 15% increase in online giving, 8% decrease in major gifts.', recommendedUse: 'Best for internal reporting, board prep, and leadership communication.' },
    { title: 'Event Remarks', description: 'Write brief gala speaking notes for your ED', difficulty: 'Advanced', context: 'Your ED needs 3-minute remarks thanking sponsors and sharing impact at your annual gala.', recommendedUse: 'Best for event leadership prep and donor-facing live remarks.' },
    { title: 'Social Post', description: 'Create a compelling social media post about impact', difficulty: 'Beginner', context: 'Share a story about a family served by your homeless shelter this winter.', recommendedUse: 'Best for campaign adaptation across lighter-weight public channels.' },
    { title: 'Lapsed Donor Re-engagement', description: 'Win back a donor who hasn\'t given in 2 years', difficulty: 'Advanced', context: 'A former $500/year donor stopped giving with no explanation.', recommendedUse: 'Best for retention strategy and donor reactivation testing.' },
    { title: 'Event Invitation', description: 'Invite supporters to a cultivation event', difficulty: 'Intermediate', context: 'You\'re hosting an intimate dinner for 20 potential major donors.', recommendedUse: 'Best for major gifts cultivation and invite sequencing.' },
  ],
  'humanity-at-scale': [
    { title: 'Personalized Stewardship', description: 'Write donor-specific impact updates at scale', difficulty: 'Advanced', context: 'You need to send personalized updates to 500 mid-level donors with different giving histories.', recommendedUse: 'Best for stewardship teams balancing scale with authenticity.' },
    { title: 'Segment-Based Appeal', description: 'Adapt one message for three donor segments', difficulty: 'Intermediate', context: 'Same campaign, but monthly donors, one-time donors, and event attendees need different approaches.', recommendedUse: 'Best for segmentation strategy across existing campaigns.' },
    { title: 'Welcome Series', description: 'Create a 3-email welcome sequence for new donors', difficulty: 'Intermediate', context: 'Design emails for Day 1 (thank), Day 7 (impact), Day 14 (community).', recommendedUse: 'Best for onboarding and new donor retention workflows.' },
    { title: 'Major Donor Note', description: 'Draft a deeply personal note for a major donor', difficulty: 'Advanced', context: 'A $25K donor just renewed. Write something that feels genuinely personal, not templated.', recommendedUse: 'Best for major gifts stewardship and relationship deepening.' },
    { title: 'Re-engagement by Segment', description: 'Design different re-engagement approaches by donor type', difficulty: 'Advanced', context: 'Lapsed monthly donors vs. lapsed one-time donors need different messages.', recommendedUse: 'Best for testing differentiated recovery strategies.' },
    { title: 'Stewardship Note', description: 'Write a mid-year stewardship note that builds relationship', difficulty: 'Beginner', context: 'No ask — just a genuine update showing their gift at work.', recommendedUse: 'Best for donor care and between-campaign relationship building.' },
  ],
};

export default function ScenarioGenerator({ session }: { session: SessionType }) {
  const scenarios = SCENARIOS[session];
  const [activeIdx, setActiveIdx] = useState(0);

  const shuffle = () => {
    let next = Math.floor(Math.random() * scenarios.length);
    while (next === activeIdx && scenarios.length > 1) next = Math.floor(Math.random() * scenarios.length);
    setActiveIdx(next);
  };

  const s = scenarios[activeIdx];
  const diffColor = s.difficulty === 'Beginner' ? 'bg-success/10 text-success' : s.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary';

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Pick a fundraising scenario to practice with, or shuffle for a random challenge.
      </p>

      <button onClick={shuffle}
        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        <Shuffle className="w-4 h-4" /> Random scenario
      </button>

      <div className="rounded-xl bg-card border border-border p-5 shadow-card">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-bold text-lg">{s.title}</h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diffColor}`}>{s.difficulty}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
        <div className="bg-muted rounded-lg p-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Scenario Context</p>
            <p className="text-sm">{s.context}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Recommended Use</p>
            <p className="text-sm">{s.recommendedUse}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
          <ArrowRight className="w-3 h-3" /> Use this scenario in the Prompt Builder, then save the result to your library if it feels reusable.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((sc, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              i === activeIdx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}>
            {sc.title}
          </button>
        ))}
      </div>
    </div>
  );
}
