"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function MyCardPage() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [card, setCard] = useState<any>(null);
const [error, setError] = useState("");

async function findCard() {
  try {
    setLoading(true);
    setError("");

const { data: leads, error: leadError } = await supabase
  .from("leads")
  .select("*")
  .eq("email", email)
  .order("created_at", { ascending: false });

const lead = leads?.[0];

    if (leadError || !lead) {
      setError("No card found for that email.");
      return;
    }

  const { data: cardRows, error: cardError } = await supabase
  .from("cards")
  .select("*")
  .eq("id", lead.card_id);

const cardData = cardRows?.[0];

if (!cardData) {
  setError("Card not found.");
  return;
}

    setCard(cardData);
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold mb-6">My Card</h1>

        <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email address"
  className="w-full rounded-xl border border-white/20 bg-white/10 p-3"
/>

        <button
  onClick={findCard}
  disabled={loading}
  className="mt-4 w-full rounded-xl bg-[#C5A96A] p-3 font-bold text-black"
>
  {loading ? "Searching..." : "Find My Card"}
</button>

{error && (
  <p className="mt-4 text-red-400">
    {error}
  </p>
)}

{card && (
  <div className="mt-6 rounded-xl border border-white/10 p-4">
    <h2 className="text-xl font-bold">
      {card.card_data?.name}
    </h2>

    <p className="text-white/70">
      {card.card_data?.primarySport}
    </p>
  </div>
)}
      </div>
    </main>
  );
}