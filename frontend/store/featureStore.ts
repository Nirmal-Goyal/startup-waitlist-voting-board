import { create } from 'zustand';

export type Feature = {
  id: number;
  name: string;
  votes: number;
  description?: string;
};

interface FeatureState {
  features: Feature[];
  isLoading: boolean;
  votingId: number | null;
  fetchFeatures: () => Promise<void>;
  userEmail: string | null;
  setUserEmail: (email: string) => void;
  upvoteFeature: (id: number) => Promise<{ success: boolean; message?: string }>;
}

export const useFeatureStore = create<FeatureState>((set, get) => ({
  features: [],
  isLoading: true,
  votingId: null,
  userEmail: null,

  setUserEmail: (email: string) => set({ userEmail: email }),

  fetchFeatures: async () => {
    set({ isLoading: true });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/features`);
      if (res.ok) {
        const data = await res.json();
        set({ features: data });
      }
    } catch (error) {
      console.error("Failed to fetch features", error);
    } finally {
      set({ isLoading: false });
    }
  },

  upvoteFeature: async (id: number) => {
    const { userEmail, features } = get();
    
    if (!userEmail) {
      return { success: false, message: "Please join the waitlist with an email to unlock voting!" };
    }

    set({ votingId: id });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/features/${id}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();

      if (res.ok) {
        // Optimistically update and resort locally
        const updated = features.map((f) => 
          f.id === id ? { ...f, votes: data.votes } : f
        ).sort((a, b) => b.votes - a.votes);
        
        set({ features: updated });
        return { success: true, message: data.name };
      } else {
        return { success: false, message: data.message || "Failed to upvote." };
      }
    } catch (error) {
      console.error("Upvote error", error);
      return { success: false, message: "Could not process your vote." };
    } finally {
      set({ votingId: null });
    }
  }
}));
