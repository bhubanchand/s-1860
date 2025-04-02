import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const API_URL = "https://script.google.com/macros/s/AKfycbzs97wtjvWKT8odbHgsBWT4g8RH_H0Mag-hXTSgDtcwbBXH8hoKoqZJXVWnFHRn2Ora/exec";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
  readTime: string;
  time: string;
  featured: boolean;
  featuredSize?: "large" | "medium" | "small";
};

type BlogStore = {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  startAutoFetch: () => () => void;
};

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogPosts: [],
      loading: true,
      error: null,

      fetchPosts: async () => {
        try {
          const response = await axios.get(API_URL);
          const newPosts: BlogPost[] = response.data;

          // Ensure a re-render by forcing a new array reference
          set({ blogPosts: [...newPosts], loading: false, error: null });
        } catch (err) {
          set({ error: "Failed to fetch blog posts", loading: false });
        }
      },

      startAutoFetch: () => {
        const interval = setInterval(async () => {
          await get().fetchPosts(); // Fetch new data every 10s
        }, 10000);
        return () => clearInterval(interval);
      },
    }),
    {
      name: "blog-storage", // Persist blog data in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);


