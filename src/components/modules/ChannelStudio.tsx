import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType } from '@/types/toolkit';

const SESSION_HINTS: Record<SessionType, string> = {
  'talk-like-a-human': 'Start with one real donor message you already need to write this week, then adapt it across two channels.',
  'humanity-at-scale': 'Pick one campaign message and pressure-test how it changes by audience, channel, and editing needs.',
};

const CHANNELS = [
  { id: 'email', label: 'Donor Email', length: '200-400 words', tone: 'Warm, personal', cta: 'Clear button or link', pacing: 'Story → impact → ask', consistency: 'Core message, mission language', humanEditing: 'Subject line, opening line, stories' },
  { id: 'landing', label: 'Landing Page', length: '300-600 words', tone: 'Compelling, urgent', cta: 'Prominent donate button', pacing: 'Hook → evidence → CTA → social proof', consistency: 'Campaign name, key stats', humanEditing: 'Hero copy, testimonials, imagery' },
  { id: 'social', label: 'Social Post', length: '50-150 words', tone: 'Conversational, authentic', cta: 'Link + emoji CTA', pacing: 'Hook in first line', consistency: 'Core message, hashtags', humanEditing: 'Voice, timing, hashtags' },
  { id: 'text', label: 'Text Message', length: '30-80 words', tone: 'Direct, friendly', cta: 'Short link', pacing: 'Immediate and clear', consistency: 'Core ask amount', humanEditing: 'Personalization, timing' },
  { id: 'remarks', label: 'Event Remarks', length: '2-5 minutes', tone: 'Inspiring, grateful', cta: 'Verbal ask or pledge moment', pacing: 'Story → gratitude → vision → ask', consistency: 'Impact data, mission', humanEditing: 'Delivery, ad-libs, crowd reading' },
  { id: 'mail', label: 'Direct Mail', length: '1-2 pages', tone: 'Formal but warm', cta: 'Reply device / envelope', pacing: 'Personal open → case → ask → P.S.', consistency: 'Ask amounts, campaign theme', humanEditing: 'Signature, P.S., story selection' },
];

export default function ChannelStudio({ session }: { session: SessionType }) {
  const [brief, setBrief] = useLocalStorage('toolkit-channel-brief', '');
  const [selected, setSelected] = useState<string[]>(['email', 'social']);
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const copyChannel = (ch: typeof CHANNELS[0]) => {
    const text = `Channel: ${ch.label}\nLength: ${ch.length}\nTone: ${ch.tone}\nCTA Style: ${ch.cta}\nPacing: ${ch.pacing}\nKeep Consistent: ${ch.consistency}\nHuman Editing: ${ch.humanEditing}`;
    navigator.clipboard.writeText(text);
    setCopied(ch.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const activeChannels = CHANNELS.filter(c => selected.includes(c.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Start with your core message, then see how to adapt it across different channels.
        </p>
        <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Use this at work:</span> {SESSION_HINTS[session]}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold font-heading mb-1">Core Communication Brief</label>
        <textarea value={brief} onChange={e => setBrief(e.target.value)}
          placeholder="What's the core message you need to communicate? e.g. Year-end appeal for our clean water initiative..."
          className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[80px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
      </div>

      <div>
        <label className="block text-sm font-semibold font-heading mb-2">Select Channels</label>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map(c => (
            <button key={c.id} onClick={() => toggle(c.id)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                selected.includes(c.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
              }`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Simple way to use this output</p>
        <p>Copy one channel guide, pair it with your saved prompt, and use that combination as your starting draft instructions in ChatGPT, Claude, or another writing tool.</p>
      </div>

      <div className="space-y-3">
        {activeChannels.map(ch => (
          <div key={ch.id} className="rounded-xl bg-card border border-border p-4 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-sm">{ch.label}</h3>
              <button onClick={() => copyChannel(ch)} className="text-muted-foreground hover:text-primary transition-colors">
                {copied === ch.id ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                ['Length', ch.length], ['Tone', ch.tone], ['CTA Style', ch.cta],
                ['Pacing', ch.pacing], ['Keep Consistent', ch.consistency], ['Human Editing', ch.humanEditing],
              ].map(([label, val]) => (
                <div key={label} className="bg-muted rounded-lg p-2">
                  <span className="font-semibold text-muted-foreground block">{label}</span>
                  <span className="text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
