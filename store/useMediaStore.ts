import { create } from 'zustand';

export interface MediaItem {
  id: string;
  name: string;
  uri: string;
  type: 'video' | 'audio';
  duration?: number;
  size?: number;
}

interface MediaState {
  downloads: MediaItem[];
  conversions: MediaItem[];
  edits: MediaItem[];
  saveLocation: string | null;
  saveLocationName: string;
  addDownload: (item: MediaItem) => void;
  addConversion: (item: MediaItem) => void;
  addEdit: (item: MediaItem) => void;
  setSaveLocation: (location: string | null, name: string) => void;
}

export const useMediaStore = create<MediaState>((set) => ({
  downloads: [],
  conversions: [],
  edits: [],
  saveLocation: null,
  saveLocationName: 'Device Gallery',
  addDownload: (item) =>
    set((state) => ({ downloads: [...state.downloads, item] })),
  addConversion: (item) =>
    set((state) => ({ conversions: [...state.conversions, item] })),
  addEdit: (item) => set((state) => ({ edits: [...state.edits, item] })),
  setSaveLocation: (saveLocation, saveLocationName) => set({ saveLocation, saveLocationName }),
}));
