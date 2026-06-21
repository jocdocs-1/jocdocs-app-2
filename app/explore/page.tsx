"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function ExplorePage() {
  const [cards, setCards] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All");

  useEffect(() => {
  loadCards();
}, []);

async function loadCards() {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("First Card:", data?.[0]);
console.table(data?.slice(0, 1));
  console.log("Error:", error);

  if (!error && data) {
    setCards(data);
  }
}

const sports = [
  "All",
  "Football",
  "Soccer",
  "Volleyball",
  "Basketball",
  "Wrestling",
  "Swimming",
  "Baseball",
  "Softball",
  "Track",
  "Tennis",
];

const filteredCards = cards.filter((card) => {
  const term = search.toLowerCase();

  const matchesSearch =
    card.name?.toLowerCase().includes(term) ||
    card.school?.toLowerCase().includes(term) ||
    card.sport?.toLowerCase().includes(term);

  const athleteSport =
  card.sport || card.card_data?.primarySport || "";

const matchesSport =
  selectedSport === "All" ||
  athleteSport.toLowerCase().includes(selectedSport.toLowerCase());

  return matchesSearch && matchesSport;
});

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
        href="/"
        className="mb-6 inline-block text-[16px] underline underline-offset-4 text-[#C5A96A]"
      >
        ← Back to Home
      </Link>
        <h1 className="mb-2 text-center text-4xl font-bold">
  Explore Athletes
</h1>

<p className="mb-2 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A96A]">
  {cards.length} Athlete Cards
</p>

<p className="mb-10 text-center text-white/60">
  Browse athlete cards from across the jocdocs community.
</p>

<div className="mb-8 flex justify-center">
  <input
    type="text"
    placeholder="Search athletes, schools, or sports..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-lg rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C5A96A]"
  />
</div>

<div className="mb-8 flex flex-wrap justify-center gap-2">
  {sports.map((sport) => (
    <button
      key={sport}
      onClick={() => setSelectedSport(sport)}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        selectedSport === sport
          ? "bg-[#C5A96A] text-black"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      {sport}
    </button>
  ))}
</div>

<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
  {filteredCards.map((card) => (
  <a
  key={card.id}
  href={`/card/${card.id}`}
  className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
>
  <img
    src={card.action_image_url}
    alt={card.name}
    className="aspect-[2.5/3.5] w-full rounded-xl object-cover"
  />

  <h2 className="mt-3 font-bold text-white">
    {card.name}
  </h2>

  <p className="mt-1 text-sm text-white/70">
    {card.school}
  </p>

  <p className="mt-2 text-xs uppercase tracking-wider text-[#C5A96A]">
    {card.sport}
  </p>
</a>
))}
</div>
      </div>
    </main>
  );
}