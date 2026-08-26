"use client";

import { Suspense, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Footer from "../components/Footer";
import NavigationButton from "../components/navigation/NavigationButton";
import { useSearchParams } from "next/navigation";

function ExplorePageContent() {
  const searchParams = useSearchParams();

  const fromParam = searchParams.get("from");

const from =
  fromParam === "athlete"
    ? "athlete"
    : fromParam === "fan"
      ? "fan"
      : null;

const ownerId = searchParams.get("ownerId");

const source =
  searchParams.get("source") === "collection"
    ? "collection"
    : "home";

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
    <main className="relative min-h-screen bg-black px-4 pb-10 pt-20 text-white">
      <NavigationButton
  type="back"
  onClick={() => {
    if (source === "collection" && from) {
      const ownerParam = ownerId ? `&ownerId=${ownerId}` : "";

      window.location.href =
        `/collection?from=${from}${ownerParam}`;
      return;
    }

    window.location.href = "/";
  }}
/>
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-1 text-center text-3xl font-bold uppercase">
  Explore Athletes
</h1>

<p className="mb-1 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A96A]">
  {cards.length} Athlete Cards
</p>

<p className="mb-8 text-center text-sm leading-tight text-white/70">
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
  href={`/card/${card.id}?source=explore&exploreSource=${source}${
  from ? `&from=${from}` : ""
}${
  ownerId ? `&ownerId=${ownerId}` : ""
}`}
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
    mx-auto
    w-[88%]
    mt-2
    -mb-3
    relative
    z-20
    rounded-full
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
<div className="relative z-20 -mt-5 px-2 md:-mt-6 md:px-5">
  <div
    title={card.school}
    className="
      mx-auto
      w-[88%]
      rounded-full
      bg-black
      py-[6px]
      pl-5
      pr-3
      text-center
      text-[14px]
      font-medium
      text-white
      whitespace-nowrap
      overflow-hidden
      text-ellipsis
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
  title={card.sport}
  className="
    w-full
    overflow-hidden
    whitespace-nowrap
    text-ellipsis
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

<Footer />

</main>
);
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white">
          <p className="pt-12 text-center text-sm text-white/50">
            Loading athletes...
          </p>
        </main>
      }
    >
      <ExplorePageContent />
    </Suspense>
  );
}