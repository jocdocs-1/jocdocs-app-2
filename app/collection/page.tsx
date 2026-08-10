"use client";

import { useEffect, useState } from "react";
import MiniAthleteCard from "../components/MiniAthleteCard";
import NavigationButton from "../components/navigation/NavigationButton";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function CollectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from =
  searchParams.get("from") === "athlete" ? "athlete" : "fan";

const [ownerId, setOwnerId] = useState<string | null>(null);
const [collection, setCollection] = useState<any[]>([]);
const [isLoaded, setIsLoaded] = useState(false);
const ownerIdFromParams = searchParams.get("ownerId");

  useEffect(() => {
  async function loadCollection() {
    const collectorId =
  from === "athlete"
    ? window.localStorage.getItem("jocdocsAthleteCardId")
    : window.localStorage.getItem("jocdocsFanId");

setOwnerId(collectorId);

if (!collectorId) {
  setCollection([]);
  setIsLoaded(true);
  return;
}

    try {
      // Get the Athlete Card IDs collected by this owner.
      const { data: collectionRows, error: collectionError } =
  await supabase
    .from("collections")
    .select("collected_id")
    .eq("collector_type", from)
    .eq("collector_id", collectorId)
    .eq("collected_type", "athlete_card");

      if (collectionError) {
        throw collectionError;
      }

      const collectedIds =
        collectionRows?.map((row) => row.collected_id) ?? [];

      if (collectedIds.length === 0) {
        setCollection([]);
        return;
      }

      // Retrieve the actual Athlete Cards.
      const { data: cardRows, error: cardsError } = await supabase
        .from("cards")
        .select(
  "id, name, school, sport, action_image_url, portrait_image_url, card_data"
)
        .in("id", collectedIds);

      if (cardsError) {
        throw cardsError;
      }

      const athleteCards =
        cardRows?.map((row) => ({
          ...(row.card_data ?? {}),
          id: row.id,
          name: row.card_data?.name ?? row.name ?? "",
          school: row.card_data?.school ?? row.school ?? "",
          primarySport:
            row.card_data?.primarySport ?? row.sport ?? "",
            theme:
  row.card_data?.theme ?? "gold",
          actionImage:
            row.card_data?.actionImage ??
            row.action_image_url ??
            "",
          portraitImage:
            row.card_data?.portraitImage ??
            row.portrait_image_url ??
            "",
        })) ?? [];

      setCollection(athleteCards);
    } catch (error) {
  console.error("Error loading Fan collection:", error);
  setCollection([]);
} finally {
  setIsLoaded(true);
}
  }

  loadCollection();
}, []);

  return (
  <main className="relative min-h-screen bg-black text-white">
    <NavigationButton
  type="back"
  onClick={() => {
    const returnOwnerId = ownerIdFromParams || ownerId;

    if (!returnOwnerId) {
      window.location.href = "/";
      return;
    }

    if (from === "athlete") {
      window.location.href =
        `/card/${returnOwnerId}?from=athlete&ownerId=${returnOwnerId}`;
      return;
    }

    window.location.href = `/fan/${returnOwnerId}`;
  }}
/>
      <div className="mx-auto max-w-6xl">

        <header className="mt-6 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">
            My Collection
          </h1>

          <p className="mt-2 text-sm text-white/60">
            {collection.length}{" "}
            {collection.length === 1 ? "Athlete Card" : "Athlete Cards"}
          </p>
        </header>

        <div className="mt-10 flex justify-center">
      <Link
  href={`/explore?source=collection&from=${from}${
    ownerId ? `&ownerId=${ownerId}` : ""
  }`}
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#C5A96A] px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-85"
      >
        Explore Athletes
      </Link>
    </div>

        {!isLoaded ? (
          <p className="mt-12 text-center text-sm text-white/50">
            Loading collection...
          </p>
        ) : collection.length > 0 ? (
  <>
    <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {collection.map((card, index) => (
        <MiniAthleteCard
          key={card.id ?? index}
          athlete={card}
          onClick={() => {
  if (card.id) {
    router.push(
      `/card/${card.id}?source=collection&from=${from}${
        ownerId ? `&ownerId=${ownerId}` : ""
      }`
    );
  }
}}
        />
      ))}
    </section>

  </>
) : (

          <section className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-14 text-center">
            <h2 className="text-xl font-bold">
              Your collection is currently empty.
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/60">
              Explore Athlete Cards and begin building your personal jocdocs
              collection.
            </p>

          </section>
        )}
      </div>
    </main>
  );
}