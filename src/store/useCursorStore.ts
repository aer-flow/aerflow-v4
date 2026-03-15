import { create } from 'zustand';

export type CursorVariant = 'default' | 'project' | 'video' | 'menu' | 'hidden';

export interface CursorState {
  variant: CursorVariant;
  text: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  variant: 'default',
  text: '',
  setCursorVariant: (variant, text = '') => set({ variant, text }),
}));
