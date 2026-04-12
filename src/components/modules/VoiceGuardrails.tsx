import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType, VoiceProfile } from '@/types/toolkit';

const EMPTY: VoiceProfile = {
  id: '', toneWords: ['', '', ''], sinceritySounds: '', roboticSounds: '',
  phrasesToAvoid: '', phrasesWeUse: '', donorTrustCues: '', brandRedFlags: '', editingReminders: '',
};

export default function VoiceGuardrails({ session }: { session: SessionType }) {
  const [profile, setProfile] = useLocalStorage<VoiceProfile>(`toolkit-voice-${session}`, EMPTY);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof VoiceProfile, value: any) => setProfile(prev => ({ ...prev, [key]: value }));
  const updateToneWord = (i: number, val: string) => {
    const words = [...profile.toneWords];
    words[i] = val;
    update('toneWords', words);
  };

  const exportText = `VOICE GUIDELINES\n\nTone: ${profile.toneWords.filter(Boolean).join(', ')}\nSincerity sounds like: ${profile.sinceritySounds}\nRobotic sounds like: ${profile.roboticSounds}\nPhrases to avoid: ${profile.phrasesToAvoid}\nPhrases we use: ${profile.phrasesWeUse}\nDonor trust cues: ${profile.donorTrustCues}\nBrand red flags: ${profile.brandRedFlags}\nEditing reminders: ${profile.editingReminders}`;

  const copy = () => { navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const fields = [
    { key: 'sinceritySounds' as const, label: 'What sincerity sounds like', placeholder: 'e.g. Using specific names, acknowledging challenges honestly...' },
    { key: 'roboticSounds' as const, label: 'What "robotic" sounds like', placeholder: 'e.g. Generic greetings, buzzwords, overly polished language...' },
    { key: 'phrasesToAvoid' as const, label: 'Phrases to avoid', placeholder: 'e.g. "Make a difference", "Every penny counts", "In these uncertain times"...' },
    { key: 'phrasesWeUse' as const, label: 'Phrases we use intentionally', placeholder: 'e.g. "You made this possible", "Here\'s what happened because of you"...' },
    { key: 'donorTrustCues' as const, label: 'Donor trust cues', placeholder: 'e.g. Transparency about costs, specific outcomes, real stories...' },
    { key: 'brandRedFlags' as const, label: 'Brand red flags', placeholder: 'e.g. Guilt-based asks, poverty porn, exaggerated statistics...' },
    { key: 'editingReminders' as const, label: 'Editing reminders', placeholder: 'e.g. Always read aloud before sending, check for jargon...' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-muted-foreground">
        Define what makes your communications sound human and on-brand. This becomes a reusable voice guide.
      </p>

      <div>
        <label className="block text-sm font-semibold font-heading mb-2">Three words that describe our tone</label>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map(i => (
            <input key={i} value={profile.toneWords[i]} onChange={e => updateToneWord(i, e.target.value)}
              placeholder={['Warm', 'Genuine', 'Confident'][i]}
              className="rounded-lg border border-input bg-card p-2.5 text-sm text-center focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
          ))}
        </div>
      </div>

      {fields.map(f => (
        <div key={f.key}>
          <label className="block text-sm font-semibold font-heading mb-1">{f.label}</label>
          <textarea value={profile[f.key] as string} onChange={e => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            className="w-full rounded-lg border border-input bg-card p-3 text-sm resize-none min-h-[70px] focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition" />
        </div>
      ))}

      <button onClick={copy}
        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition font-medium">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy voice guide'}
      </button>
    </div>
  );
}
