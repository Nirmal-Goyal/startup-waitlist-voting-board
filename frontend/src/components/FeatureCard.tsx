"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import type { Feature } from "./FeatureBoard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const featureIcons: Record<number, string> = {
  1: "🌙",
  2: "⚡",
  3: "📱",
  4: "📊",
};

interface FeatureCardProps {
  feature: Feature;
  rank: number;
  onVote: (id: number, add: boolean) => void;
}

export default function FeatureCard({ feature, rank, onVote }: FeatureCardProps) {
  const [loading, setLoading] = useState(false);
  const [bumping, setBumping] = useState(false);
  const { showToast } = useToast();
  const isTop = rank === 1;

  async function handleUpvote() {
    if (loading) return;
    setLoading(true);
    onVote(feature.id, true); // optimistic

    try {
      // ---- MOCK: remove this block when backend is ready ----
      await new Promise((r) => setTimeout(r, 500));
      setBumping(true);
      setTimeout(() => setBumping(false), 400);
      // ---- END MOCK ----

      // ---- REAL: uncomment this block when backend is ready ----
      // const res = await fetch(`${API_URL}/features/${feature.id}/upvote`, {
      //   method: "POST",
      // });
      // const data = await res.json();
      // if (!res.ok) {
      //   onVote(feature.id, false); // revert optimistic update
      //   showToast(data.message || "Could not upvote.", "error");
      // } else {
      //   setBumping(true);
      //   setTimeout(() => setBumping(false), 400);
      // }
      // ---- END REAL ----
    } catch {
      onVote(feature.id, false);
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  const icon = featureIcons[feature.id] ?? "✨";

  return (
    <li className={`glass-card feature-card${isTop ? " top-card" : ""}`}>
      <span
        className={`feature-rank${isTop ? " top" : ""}`}
        aria-label={`Rank ${rank}`}
      >
        {isTop ? "🏆" : `#${rank}`}
      </span>

      <div className="feature-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="feature-info">
        <div className="feature-name">{feature.name}</div>
        <div className="feature-desc">Vote to prioritize this feature</div>
      </div>

      <div className="feature-votes">
        <span
          className={`vote-count${bumping ? " bump" : ""}`}
          aria-live="polite"
          aria-label={`${feature.votes} votes`}
        >
          {feature.votes}
        </span>
        <button
          className="upvote-btn"
          onClick={handleUpvote}
          disabled={loading}
          aria-label={`Upvote ${feature.name}`}
          aria-busy={loading}
        >
          {loading ? (
            <span className="spinner spinner-dark" aria-hidden="true" />
          ) : (
            <>
              <span className="arrow" aria-hidden="true">▲</span>
              <span style={{ fontSize: "11px", letterSpacing: "0.5px" }}>VOTE</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
}
