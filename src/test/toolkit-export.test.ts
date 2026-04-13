import { describe, expect, it } from 'vitest';
import { buildSessionBundle } from '@/lib/export';

describe('buildSessionBundle', () => {
  it('includes the major filled sections in a readable export', () => {
    const output = buildSessionBundle({
      session: 'talk-like-a-human',
      prompt: {
        id: '1',
        role: 'Fundraising copywriter',
        audience: 'Lapsed donors',
        goal: 'Draft a re-engagement email',
        context: 'Food bank annual appeal',
        tone: 'Warm and direct',
        constraints: 'Keep it under 200 words',
        outputFormat: 'Email',
        successCriteria: 'Feels personal',
        createdAt: '',
        tags: [],
        category: '',
        isFavorite: false,
      },
      actionPlan: {
        id: '2',
        firstPrompt: 'Build one donor thank-you prompt',
        firstPersona: 'Stewardship assistant',
        firstUseCase: 'Thank-you email',
        firstChannel: 'Email',
        ethicalSafeguard: 'Human review required',
        stakeholder: 'Comms director',
        workflowToImprove: 'Thank-you process',
        nextAction: 'Test with one donor segment',
      },
      library: [
        {
          id: '3',
          type: 'prompt',
          title: 'Welcome donor note',
          content: 'Prompt content here',
          tags: [],
          category: 'stewardship',
          isFavorite: false,
          createdAt: '',
        },
      ],
    });

    expect(output).toContain('# The AI Dude Toolkit Export');
    expect(output).toContain('## Prompt Builder');
    expect(output).toContain('## 7-Day Action Plan');
    expect(output).toContain('## Saved Library Items');
    expect(output).toContain('Session: Talk Like a Human');
  });
});
