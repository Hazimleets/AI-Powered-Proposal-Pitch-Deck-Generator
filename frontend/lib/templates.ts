// frontend/lib/templates.ts
export interface Template {
  id: string;
  name: string;
}

export interface Templates {
  [key: string]: Template[]; // Allow dynamic indexing
  proposal: Template[];
  pitchdeck: Template[];
}

export const templates: Templates = {
  proposal: [
    { id: 'classic', name: 'Classic Proposal' },
    { id: 'modern', name: 'Modern Proposal' },
  ],
  pitchdeck: [
    { id: 'classic', name: 'Classic Pitch Deck' },
    { id: 'modern', name: 'Modern Pitch Deck' },
  ],
};