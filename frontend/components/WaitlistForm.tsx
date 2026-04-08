"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import { useFeatureStore } from "@/store/featureStore";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserEmail } = useFeatureStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "You're on the list!");
        setUserEmail(email);
        setEmail("");
      } else if (response.status === 400 && data.message === "email already exists") {
        toast.success("Welcome back! You can now resume voting.");
        setUserEmail(email);
        setEmail("");
      } else {
        toast.error(data.message || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      console.error("Waitlist error:", error);
      toast.error("Network error. Could not connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row shadow-2xl shadow-blue-500/20 p-2 rounded-2xl bg-zinc-900 border border-zinc-800">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        disabled={isLoading}
        className="flex-1 bg-transparent px-4 py-3 outline-none disabled:opacity-50 placeholder:text-zinc-400 transition-colors"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-500/90 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-70 transition-all active:scale-95 whitespace-nowrap shrink-0"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Join Waitlist <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
