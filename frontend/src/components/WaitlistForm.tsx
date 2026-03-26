"use client";

import { useState, useRef, type FormEvent } from "react";
import { useToast } from "./Toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function validateEmail(val: string): string {
  if (!val) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
    return "Please enter a valid email address.";
  return "";
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      inputRef.current?.focus();
      return;
    }
    setEmailError("");
    setLoading(true);

    try {
      // ---- MOCK: remove this block when backend is ready ----
      await new Promise((r) => setTimeout(r, 800));
      const mockSuccess = true; // flip to false to test error toast
      if (!mockSuccess) {
        showToast("Email already registered.", "error");
      } else {
        showToast("🎉 You're on the list! We'll be in touch.", "success");
        setEmail("");
      }
      // ---- END MOCK ----

      // ---- REAL: uncomment this block when backend is ready ----
      // const res = await fetch(`${API_URL}/waitlist`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // const data = await res.json();
      // if (!res.ok) {
      //   showToast(data.message || "Something went wrong.", "error");
      // } else {
      //   showToast("🎉 You're on the list! We'll be in touch.", "success");
      //   setEmail("");
      // }
      // ---- END REAL ----
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="hero">
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="hero-blob hero-blob-3" aria-hidden="true" />

      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Now accepting early access signups
      </div>

      <h1 className="hero-title">
        Build the product
        <br />
        <span className="gradient-text">people actually want</span>
      </h1>

      <p className="hero-subtitle">
        Join our waitlist to get early access. Then vote on the features that
        matter most to you — we ship what the community wants first.
      </p>

      <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
        <div className="waitlist-input-wrap">
          <input
            ref={inputRef}
            id="waitlist-email"
            type="email"
            className={`waitlist-input${emailError ? " error" : ""}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(validateEmail(e.target.value));
            }}
            aria-label="Email address"
            aria-describedby={emailError ? "email-error" : undefined}
            disabled={loading}
          />
          {emailError && (
            <span id="email-error" className="input-error-msg" role="alert">
              {emailError}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="waitlist-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Joining…
            </>
          ) : (
            "Join Waitlist →"
          )}
        </button>
      </form>

      <div className="hero-stats" aria-label="Statistics">
        <div className="hero-stat">
          <div className="hero-stat-num">2,400+</div>
          <div className="hero-stat-label">Waitlist signups</div>
        </div>
        <div
          className="hero-stat"
          style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "32px" }}
        >
          <div className="hero-stat-num">4</div>
          <div className="hero-stat-label">Features to vote on</div>
        </div>
        <div
          className="hero-stat"
          style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "32px" }}
        >
          <div className="hero-stat-num">Q3 &apos;25</div>
          <div className="hero-stat-label">Target launch</div>
        </div>
      </div>
    </section>
  );
}
