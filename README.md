# The AI Dude Toolkit

Interactive workshop toolkit for fundraising teams who want practical, reusable ways to learn and apply AI.

## What it is

This app supports two live workshop tracks:

- **Talk Like a Human**
- **Humanity at Scale**

Participants work through guided exercises that help them:

- build stronger prompts
- adapt one message across channels
- define voice and trust guardrails
- create fundraising-specific personas
- map AI-supported workflows
- leave with a practical 7-day action plan

The app is designed to be lightweight, mobile-friendly, and useful during a live session and after it.

## Core product principles

- **Practical over performative**: every module should lead to something usable
- **Fundraising-specific**: examples and language should map to real nonprofit work
- **No login friction**: work is saved locally in the browser
- **Portable outputs**: users should be able to copy or export their work easily

## Current stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Radix/shadcn-style UI primitives
- Vitest

## Local development

```bash
npm install
npm run dev
```

## Build and test

```bash
npm run build
npm test
```

## Deployment workflow

Current working workflow:

1. Update code directly in GitHub-backed repo
2. Push to the tracked branch
3. Sync/update in Lovable
4. Lovable reflects the new repo state in the hosted app

This means routine product work can happen directly in Git without spending Lovable credits on every change.

## Phase roadmap

### Phase 1
- improve portability and export usefulness
- remove obvious placeholder/dead-weight issues
- tighten workshop-to-real-work guidance
- improve repo documentation

### Phase 2
- stronger end-of-session summaries
- better post-workshop handoff assets
- more obvious reuse paths for saved outputs

### Phase 3
- deepen fundraising specificity
- add sharper examples and scenarios for real workflows

### Phase 4
- strengthen tests
- improve resilience and UX polish

## Notes

- Data is currently stored in browser localStorage
- Cross-device persistence is not currently the goal
- Lovable is primarily being used as a hosting/sync surface, not the main implementation environment
