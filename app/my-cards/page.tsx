"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type CardRecord = {
  id: string;
  name: string | null;
  school: string | null;
  sport: string | null;
  created_at: string;
};

export default function MyCardsPage() {
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState<CardRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function findCards() {
    setLoading(true);
    setSearched(true);

    const { data: leads, error: leadError } = await supabase
      .from("leads")
      .select("card_id")
      .eq("email", email.trim().toLowerCase());

    if (leadError) {
      console.error(leadError);
      setLoading(false);
      return;
    }

    const cardIds = leads?.map((lead) => lead.card_id).filter(Boolean) || [];

    if (cardIds.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }

    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .select("id, name, school, sport, created_at")
      .in("id", cardIds)
      .order("created_at", { ascending: false });

    if (cardError) {
      console.error(cardError);
      setLoading(false);
      return;
    }

    setCards(cardData || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto max-w-[520px]">
        <h1 className="text-3xl font-black tracking-[-0.04em]">
          My Cards
        </h1>

        <p className="mt-2 text-sm leading-tight text-white/60">
          Enter your email to find the cards you’ve published.
        </p>

        <div className="mt-8 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
          />

          <button
            type="button"
            onClick={findCards}
            className="w-full rounded-2xl bg-[#C5A96A] px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(197,169,106,0.35)] transition active:scale-[0.98]"
          >
            {loading ? "Finding Cards..." : "Find My Cards"}
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {searched && !loading && cards.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
              No cards found for that email yet.
            </p>
          )}

          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/card/${card.id}`}
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <p className="text-lg font-extrabold">
                {card.name || "Untitled Card"}
              </p>
              <p className="mt-1 text-sm text-white/60">
                {[card.school, card.sport].filter(Boolean).join(" • ")}
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#C5A96A]">
                View Card →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}