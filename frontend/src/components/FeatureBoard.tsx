"use client";

import { useState, useCallback } from "react";
import FeatureCard from "./FeatureCard";

export interface Feature {
  id: number;
  name: string;
  votes: number;
}

interface FeatureBoardProps {
  initialFeatures: Feature[];
}

function sortByVotes(features: Feature[]): Feature[] {
  return [...features].sort((a, b) => b.votes - a.votes);
}

export default function FeatureBoard({ initialFeatures }: FeatureBoardProps) {
  const [features, setFeatures] = useState<Feature[]>(sortByVotes(initialFeatures));

  const handleVote = useCallback((id: number, add: boolean) => {
    setFeatures((prev) => {
      const updated = prev.map((f) =>
        f.id === id ? { ...f, votes: f.votes + (add ? 1 : -1) } : f
      );
      return sortByVotes(updated);
    });
  }, []);

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <span className="section-label">Feature Voting</span>
        <h2 className="section-title">
          Shape our <span className="gradient-text">roadmap</span>
        </h2>
        <p className="section-desc">
          Upvote the features you want most. We build what you ask for.
        </p>
      </div>

      <ol className="feature-list" aria-label="Feature voting board">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            rank={index + 1}
            onVote={handleVote}
          />
        ))}
      </ol>
    </section>
  );
}
