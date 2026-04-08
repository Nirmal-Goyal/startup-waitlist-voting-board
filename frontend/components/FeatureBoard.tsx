"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useFeatureStore } from "@/store/featureStore";

export default function FeatureBoard() {
  const { features, isLoading, votingId, fetchFeatures, upvoteFeature } = useFeatureStore();

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  const handleUpvote = async (id: number) => {
    const { success, message } = await upvoteFeature(id);
    if (success) {
      toast.success(`Upvoted "${message}"!`);
    } else {
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  if (features.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 p-12 text-zinc-400 bg-zinc-900/30">
        <p>No features have been proposed yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <ul className="flex flex-col gap-3">
          {features.map((feature) => (
            <motion.li
              key={String(feature.id)}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-start justify-between gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-5 shadow-lg hover:border-blue-500/50 hover:bg-zinc-900 transition-all"
            >
              <div className="flex flex-col gap-1.5 flex-1 mt-1">
                <span className="text-lg font-semibold tracking-tight text-zinc-50">
                  {feature.name}
                </span>
                {feature.description && (
                  <p className="text-sm text-zinc-400 leading-relaxed pr-4">
                    {feature.description}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => handleUpvote(feature.id)}
                disabled={votingId === feature.id}
                className="group flex flex-col items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/30 px-5 py-3 hover:bg-blue-500 hover:border-blue-500 text-blue-400 hover:text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all disabled:opacity-50 shrink-0"
                aria-label={`Upvote ${feature.name}`}
              >
                {votingId === feature.id ? (
                  <Loader2 className="h-6 w-6 animate-spin mb-1" />
                ) : (
                  <ChevronUp className="h-6 w-6 mb-1 group-hover:-translate-y-1 group-active:translate-y-0 transition-transform stroke-[3]" />
                )}
                <span className="text-base font-bold tabular-nums">
                  {feature.votes}
                </span>
              </button>
            </motion.li>
          ))}
      </ul>
    </div>
  );
}
