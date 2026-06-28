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
        <div className="rounded-[20px] bg-white p-[4px] shadow-[0_8px_20px_rgba(0,0,0,0.45)] md:rounded-[24px] md:p-[5px]">
          <div
            className="overflow-hidden rounded-[16px] md:rounded-[19px]"
            style={{ backgroundColor: themeColor }}
          >
            {/* NAME */}
            <div
              className="
                ml-0
                mr-5
                mt-2
                -mb-3
                relative
                z-20
                rounded-r-full
                bg-white
                px-2
                pt-[3px]
                pb-[4px]
                text-center
                md:mt-3
                md:-mb-4
                md:px-3
                md:pt-1
                md:pb-1
              "
            >
              <div className="text-[15px] italic font-semibold leading-[1.05] text-black md:text-[18px] lg:text-[20px]">
                {firstName}
              </div>

              <div className="text-[24px] italic font-black uppercase leading-[0.88] text-black md:text-[28px] lg:text-[32px]">
                {lastName}
              </div>
            </div>

            {/* IMAGE */}
            <div className="px-[8px] pt-1 md:px-[10px] md:pt-1.5">
              <img
                src={card.action_image_url}
                alt={card.name}
                className="
                  aspect-[2.5/3.5]
                  w-full
                  rounded-lg
                  border
                  border-white
                  object-cover
                  md:rounded-xl
                "
              />
            </div>

            {/* SCHOOL */}
            <div className="relative z-20 -mt-5 pl-7 pr-0 md:-mt-6 md:pl-8">
              <div
                title={card.school}
                className="
                  ml-auto
                  max-w-[92%]
                  rounded-l-full
                  bg-black
                  py-[6px]
                  pl-5
                  pr-3
                  text-left
                  text-[14px]
                  font-medium
                  text-white
                  whitespace-nowrap
                  overflow-hidden
                  text-ellipsis
                  md:max-w-[94%]
                  md:py-[7px]
                  md:pl-6
                  md:pr-4
                  md:text-[16px]
                  lg:text-[17px]
                "
              >
                {card.school || "\u00A0"}
              </div>
            </div>

            {/* SPORT */}
            <div
              className="
                px-3
                pt-1
                pb-2
                text-right
                text-[14px]
                uppercase
                tracking-[0.12em]
                text-white
                md:px-4
                md:text-[15px]
                lg:text-[16px]
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