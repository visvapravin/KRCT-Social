import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Hashtag {
  tag: string;
  count: number;
  isRising: boolean;
}

interface HashtagStore {
  trendingHashtags: Hashtag[];
  customHashtags: string[];
  addCustomHashtag: (tag: string) => void;
  updateTrendingHashtags: (hashtags: Hashtag[]) => void;
  incrementHashtagCount: (tag: string) => void;
}

export const useHashtagStore = create<HashtagStore>()(
  persist(
    (set, get) => ({
      trendingHashtags: [
        { tag: '#KRCT', count: 245, isRising: true },
        { tag: '#CampusLife', count: 189, isRising: true },
        { tag: '#TechFest2024', count: 167, isRising: true },
        { tag: '#StudyGroup', count: 156, isRising: false },
        { tag: '#PlacementSeason', count: 134, isRising: true },
        { tag: '#CulturalDay', count: 122, isRising: true },
        { tag: '#KRCTSports', count: 98, isRising: false },
        { tag: '#Alumni2024', count: 87, isRising: true }
      ],
      customHashtags: [],
      addCustomHashtag: (tag: string) => {
        set((state) => ({
          customHashtags: [...new Set([...state.customHashtags, tag])]
        }));
      },
      updateTrendingHashtags: (hashtags: Hashtag[]) => {
        set({ trendingHashtags: hashtags });
      },
      incrementHashtagCount: (tag: string) => {
        set((state) => ({
          trendingHashtags: state.trendingHashtags.map((hashtag) =>
            hashtag.tag === tag
              ? { ...hashtag, count: hashtag.count + 1, isRising: true }
              : hashtag
          )
        }));
      }
    }),
    {
      name: 'hashtag-storage'
    }
  )
);