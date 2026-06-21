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
  edit_token: string | null;
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
      .select("id, name, school, sport, created_at, edit_token")
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

async function sendCardLinks() {
  setLoading(true);
  setSearched(true);

  const response = await fetch("/api/recover-cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
    }),
  });

  const result = await response.json();

  setLoading(false);

  if (!response.ok) {
    alert(result.error || "Unable to send card links.");
    return;
  }

  alert("Your card links have been sent. Please check your email.");
}

async function deleteCard(cardId: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this card? This action cannot be undone."
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("cards")
    .delete()
    .eq("id", cardId);

  if (error) {
    console.error(error);
    alert("Unable to delete card.");
    return;
  }

  setCards((current) =>
    current.filter((card) => card.id !== cardId)
  );
}

 return (
  <main className="min-h-screen bg-black px-5 py-8 text-white">
    <div className="mx-auto max-w-[520px]">
      <Link
        href="/"
        className="mb-6 inline-block text-[16px] underline underline-offset-4 text-[#C5A96A]"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-black tracking-[-0.04em]">
        Manage My Cards
      </h1>

        <p className="mt-2 text-sm leading-tight text-white/60">
          Enter the email address you used when publishing your card to view and manage your cards.
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
          <button
  type="button"
  onClick={sendCardLinks}
  className="mt-3 w-full rounded-2xl border border-[#C5A96A] px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] text-[#C5A96A] transition active:scale-[0.98]"
>
  Send My Card Links
</button>
        </div>

        <div className="mt-8 space-y-4">
          {searched && !loading && cards.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
              No cards found for that email yet.
            </p>
          )}

          {cards.map((card) => (
  <div
    key={card.id}
    className="rounded-2xl border border-white/10 bg-white/5 p-4"
  >
    <p className="text-2xl font-extrabold">
  {card.name || "Untitled Card"}
</p>

    <p className="mt-1 text-sm text-white/60">
      {[card.school, card.sport].filter(Boolean).join(" • ")}
    </p>

    <div className="mt-4 flex gap-3">
  <Link
    href={`/card/${card.id}`}
    className="rounded-xl bg-[#C5A96A] px-4 py-2 text-sm font-bold text-black"
  >
    View Card
  </Link>

  {card.edit_token && (
    <Link
      href={`/edit/${card.edit_token}`}
      className="rounded-xl border border-[#C5A96A] px-4 py-2 text-sm font-bold text-[#C5A96A]"
    >
      Edit Card
    </Link>
  )}
</div>

<button
  type="button"
  onClick={() => deleteCard(card.id)}
  className="mt-10 text-sm font-bold text-[#ef4444] hover:text-[#f87171]"
>
  Delete Card
</button>
  </div>
))}
        </div>
      </div>
    </main>
  );
}