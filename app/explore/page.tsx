"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";
import Footer from "../components/Footer";

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

const themeColors: Record<string, string> = {
  gold: "#C5A96A",
  red: "#D62828",
  orange: "#E89B2C",
  yellow: "#D4B03A",
  green: "#2E8B57",
  navy: "#1B365D",
  royal: "#3B82F6",
  purple: "#3B2E7E",
  maroon: "#800000",
  silver: "#999999",
  black: "#222222",
};

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
  {filteredCards.map((card) => {
    const themeColor =
      themeColors[card.card_data?.theme || "gold"] || "#C5A96A";

    const nameParts = card.name?.split(" ") || [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ");

    return (
      <a
        key={card.id}
        href={`/card/${card.id}`}
        className="block transition hover:scale-[1.02]"
      >
        <div className="rounded-[24px] bg-white p-[6px] shadow-[0_8px_20px_rgba(0,0,0,0.45)]">

  <div
    className="overflow-hidden rounded-[18px]"
    style={{ backgroundColor: themeColor }}
  >

            {/* NAME */}
<div
  className="
    ml-0
    mr-5
    mt-3
    -mb-4
    relative
    z-20
    rounded-r-full
    bg-white
    px-3
    pt-1
    pb-1
    text-center
  "
>
              <div className="text-[20px] italic font-semibold leading-[1.05] text-black">
  {firstName}
</div>

<div className="text-[32px] italic font-black uppercase leading-[0.88] text-black">
  {lastName}
</div>
            </div>

            {/* IMAGE */}
            <div className="px-[10px] pt-1.5">
              <img
                src={card.action_image_url}
                alt={card.name}
                className="
  aspect-[2.5/3.5]
  w-full
  rounded-xl
  border
  border-white
  object-cover
"
              />
            </div>

            {/* SCHOOL */}
            <div className="pl-5 pr-0 -mt-6 relative z-20">
  <div
  title={card.school}
  className="
    max-w-[95%]
    rounded-l-full
    bg-black
    py-[8px]
    pl-7
    pr-4
    text-left
    text-[17px]
    font-medium
    text-white
    whitespace-nowrap
    overflow-hidden
    text-ellipsis
  "
>
  {card.school || "\u00A0"}
</div>
</div>

            {/* SPORT */}
<div
  className="
  px-4
  pt-1
  pb-2
  text-right
  text-[16px]
    uppercase
    tracking-[0.12em]
    text-white
  "
>
  {card.sport}
</div>

          </div>
        </div>
      </a>
    );
  })}
</div>
      </div>

<Footer theme="dark" />

</main>
);
}