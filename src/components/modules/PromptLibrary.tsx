import { useState } from 'react';
import { Copy, Check, Trash2, Star, StarOff } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { SessionType, SavedLibraryItem } from '@/types/toolkit';

const CATEGORIES = ['all', 'appeals', 'stewardship', 'updates', 'events', 'social', 'internal briefs', 'persona-based prompts'];

export default function PromptLibrary({ session }: { session: SessionType }) {
  const [library, setLibrary] = useLocalStorage<SavedLibraryItem[]>('toolkit-library', []);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = activeCategory === 'all' ? library : library.filter(item => item.category === activeCategory);

  const copy = (item: SavedLibraryItem) => {
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFav = (id: string) => {
    setLibrary(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  const remove = (id: string) => {
    setLibrary(prev => prev.filter(item => item.id !== id));
  };

  const updateCategory = (id: string, category: string) => {
    setLibrary(prev => prev.map(item => item.id === id ? { ...item, category } : item));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Your saved prompts, personas, and templates from this session. Items are saved locally on your device.
        </p>
        <div className="rounded-lg border border-border bg-card p-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Use this at work:</span> Save the pieces you would actually reuse, then export the session bundle or copy a single item into your real workflow.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium capitalize transition-colors ${
              activeCategory === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-sm">No saved items yet</p>
          <p className="text-xs mt-1">Items you save from other modules will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="rounded-xl bg-card border border-border p-4 shadow-card">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-medium capitalize">{item.type}</span>
                  <h3 className="font-heading font-semibold text-sm mt-1">{item.title}</h3>
                </div>
                <button onClick={() => toggleFav(item.id)} className="text-muted-foreground hover:text-accent transition-colors">
                  {item.isFavorite ? <Star className="w-4 h-4 fill-accent text-accent" /> : <StarOff className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-2 whitespace-pre-wrap">{item.content}</p>
              <p className="text-[11px] text-muted-foreground mb-3">Best next step: paste this into the tool or workflow where you would actually use it, then refine it with a real audience, campaign, or donor segment.</p>
              <div className="flex items-center gap-2">
                <select value={item.category} onChange={e => updateCategory(item.id, e.target.value)}
                  className="text-xs rounded-lg border border-input bg-card px-2 py-1 outline-none">
                  {CATEGORIES.filter(c => c !== 'all').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex-1" />
                <button onClick={() => copy(item)} className="text-muted-foreground hover:text-primary transition-colors">
                  {copiedId === item.id ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
