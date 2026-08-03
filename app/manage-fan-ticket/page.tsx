"use client";

import { useState } from "react";
import Link from "next/link";

export default function ManageFanTicketPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function sendTicketLinks() {
    const cleanedEmail = email.trim().toLowerCase();

    setMessage("");
    setErrorMessage("");

    if (!cleanedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!cleanedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/recover-fan-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanedEmail,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send your Fan Ticket links."
        );
      }

      setMessage(
        "Your Fan Ticket links have been sent. Please check your email."
      );
    } catch (error) {
      console.error("Fan Ticket recovery error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your Fan Ticket links."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto max-w-[520px]">
        <Link
          href="/"
          className="mb-6 inline-block text-[16px] text-[#C5A96A] underline underline-offset-4"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-black tracking-[-0.04em]">
          Manage My Fan Ticket
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Enter the email address you used when publishing your Fan
          Ticket. We’ll send you secure links to view and edit it.
        </p>

        <div className="mt-8 space-y-3">
          <label
            htmlFor="fan-ticket-email"
            className="block text-sm font-semibold text-white"
          >
            Email
          </label>

          <input
            id="fan-ticket-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !loading) {
                void sendTicketLinks();
              }
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className="input"
          />

          <button
            type="button"
            onClick={sendTicketLinks}
            disabled={loading}
            className={`w-full rounded-2xl px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] transition active:scale-[0.98] ${
              loading
                ? "cursor-not-allowed bg-white/10 text-white/30"
                : "bg-[#C5A96A] text-black shadow-[0_0_24px_rgba(197,169,106,0.35)]"
            }`}
          >
            {loading ? "Sending Links..." : "Send My Ticket Links"}
          </button>
        </div>

        {message && (
          <div
            role="status"
            className="mt-6 rounded-2xl border border-[#C5A96A]/35 bg-[#C5A96A]/10 p-4 text-sm leading-relaxed text-[#E1CC96]"
          >
            {message}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm leading-relaxed text-red-200"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm text-white/50">
            Haven’t joined the jocdocs fan community yet?
          </p>

          <Link
            href="/create-fan"
            className="mt-3 inline-block font-bold text-[#C5A96A] underline underline-offset-4"
          >
            Claim My Fan Ticket →
          </Link>
        </div>
      </div>
    </main>
  );
}