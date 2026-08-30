"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import NavigationButton from "../components/navigation/NavigationButton";
import Footer from "../components/Footer";
import { frederickSans } from "../fonts";

export default function ManageFanTicketPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function findTicket() {
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
      const { data, error } = await supabase
        .from("fans")
        .select("id")
        .eq("email", cleanedEmail)
        .limit(1)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data?.id) {
        setErrorMessage("No Fan Ticket was found for that email address.");
        return;
      }

      window.localStorage.setItem("jocdocsFanId", data.id);
      window.location.href = `/fan/${data.id}`;
    } catch (error) {
      console.error("Fan Ticket lookup error:", error);
      setErrorMessage("Unable to find your Fan Ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
  <>
    <NavigationButton type="back" href="/" />

    <main className="min-h-screen bg-black px-5 pb-8 pt-20 text-white">
      <div className="mx-auto max-w-[520px]">

        <h1 className="text-4xl font-black tracking-[-0.04em]">
          Manage My Fan Ticket
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Enter the email address you used when publishing your Fan Ticket to view and manage your Fan Ticket.
        </p>

        <div className="mt-8 space-y-3">
          <input
            id="fan-ticket-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !loading) {
                void findTicket();
              }
            }}
            placeholder="you@example.com"
            autoComplete="email"
            className="input"
          />

          <div className="mt-5">
          <button
            type="button"
            onClick={findTicket}
            disabled={loading}
            className={`w-full rounded-2xl px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] transition active:scale-[0.98] ${
              loading
                ? "cursor-not-allowed bg-white/10 text-white/30"
                : "bg-[#C5A96A] text-black shadow-[0_0_24px_rgba(197,169,106,0.35)]"
            }`}
          >
            Find My Ticket
          </button>
          </div>

          <button
            type="button"
            onClick={sendTicketLinks}
            disabled={loading}
            className="mt-3 w-full rounded-2xl border border-[#C5A96A] px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] text-[#C5A96A] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40" 
          >
            Send My Ticket Link
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

<div className="mt-10 border-t border-white/10 pt-7">
  <p className="mb-4 text-center text-[19px] italic text-white/55">
    Don&apos;t have a Fan Ticket yet?
  </p>

  <Link
    href="/create-fan"
    className="group relative mx-auto flex min-h-[58px] w-[76%] items-center justify-center rounded-[11px] border-[1.5px] border-white bg-[#C5A96A] px-3 text-center text-black shadow-[0_5px_12px_rgba(0,0,0,0.32)] transition active:translate-y-[1px]"
  >
    <span
      className={`${frederickSans.className} translate-y-[2px] text-[clamp(34px,9vw,41px)] uppercase leading-[0.92] tracking-[-0.005em]`}
    >
      Claim My Fan Ticket
    </span>
  </Link>
</div>
      </div>
    </main>

    <Footer />
  </>
);
}