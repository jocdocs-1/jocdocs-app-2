"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";
import MiniFanTicket from "@/app/components/cards/MiniFanTicket";
import MiniAthleteCard from "@/app/components/MiniAthleteCard";
import NavigationButton from "../../components/navigation/NavigationButton";
import type { Athlete } from "@/app/data/athletes";

type FanRecord = {
  id: string;
  created_at: string;
  name: string;
  photo_url: string | null;
};

export default function AthleteFansPage() {
  const params = useParams<{ athleteId: string }>();
  const router = useRouter();

  const athleteId =
    typeof params?.athleteId === "string" ? params.athleteId : "";

  const [athleteName, setAthleteName] = useState("Athlete");
  const [fanCollectors, setFanCollectors] = useState<FanRecord[]>([]);
  const [athleteCollectors, setAthleteCollectors] = useState<Athlete[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalFans = fanCollectors.length + athleteCollectors.length;

  useEffect(() => {
    async function loadFansPage() {
      if (!athleteId) return;

      setIsLoading(true);

      try {
        // LOAD ATHLETE NAME
        const { data: athleteData, error: athleteError } = await supabase
          .from("cards")
          .select("name, card_data")
          .eq("id", athleteId)
          .maybeSingle();

        if (athleteError) {
          throw athleteError;
        }

        const resolvedAthleteName =
          athleteData?.name ||
          athleteData?.card_data?.name ||
          "Athlete";

        setAthleteName(resolvedAthleteName);

        // LOAD ALL COLLECTION RECORDS FOR THIS ATHLETE
        const { data: collectionRows, error: collectionError } =
          await supabase
            .from("collections")
            .select("collector_type, collector_id")
            .eq("collected_type", "athlete_card")
            .eq("collected_id", athleteId);

        if (collectionError) {
          throw collectionError;
        }

        const fanIds = Array.from(
          new Set(
            (collectionRows ?? [])
              .filter((row) => row.collector_type === "fan")
              .map((row) => row.collector_id)
              .filter((id): id is string => Boolean(id))
          )
        );

        const athleteIds = Array.from(
          new Set(
            (collectionRows ?? [])
              .filter((row) => row.collector_type === "athlete")
              .map((row) => row.collector_id)
              .filter((id): id is string => Boolean(id))
          )
        );

        // LOAD FAN TICKET COLLECTORS
        if (fanIds.length > 0) {
          const { data: fanRows, error: fanError } = await supabase
            .from("fans")
            .select("id, created_at, name, photo_url")
            .in("id", fanIds);

          if (fanError) {
            throw fanError;
          }

          setFanCollectors(fanRows ?? []);
        } else {
          setFanCollectors([]);
        }

        // LOAD ATHLETE CARD COLLECTORS
        if (athleteIds.length > 0) {
          const { data: cardRows, error: cardError } = await supabase
            .from("cards")
            .select(
              "id, name, school, sport, action_image_url, portrait_image_url, card_data"
            )
            .in("id", athleteIds);

          if (cardError) {
            throw cardError;
          }

          const resolvedAthleteCollectors: Athlete[] =
  cardRows?.map((row) => ({
    ...(row.card_data ?? {}),
    id: row.id,
    name: row.card_data?.name ?? row.name ?? "",
    school: row.card_data?.school ?? row.school ?? "",
    primarySport:
      row.card_data?.primarySport ?? row.sport ?? "",
    actionImage:
      row.card_data?.actionImage ??
      row.action_image_url ??
      "",
    portraitImage:
      row.card_data?.portraitImage ??
      row.portrait_image_url ??
      "",
    theme:
      row.card_data?.theme ?? "gold",
  })) ?? [];

          setAthleteCollectors(resolvedAthleteCollectors);
        } else {
          setAthleteCollectors([]);
        }
      } catch (error) {
        console.error("Error loading athlete fans:", error);
        setFanCollectors([]);
        setAthleteCollectors([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadFansPage();
  }, [athleteId]);

  return (
    <main className="relative min-h-screen bg-black px-4 pb-6 pt-20 text-white">
      <NavigationButton
        type="back"
        href={`/card/${athleteId}`}
      />

      <div className="mx-auto w-full max-w-6xl">
        <header className="text-center">
  <h1 className="mb-1 text-3xl font-bold">
    Fans of {athleteName}
  </h1>

  <p className="mb-8 text-sm leading-tight text-white/70">
    {totalFans} {totalFans === 1 ? "Fan" : "Fans"}
  </p>
</header>

        {isLoading ? (
          <p className="text-center text-white/60">
            Loading fans...
          </p>
        ) : totalFans === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/15 bg-white/5 px-6 py-10 text-center">
            <h2 className="text-xl font-bold text-white">
              No fans yet
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Be the first to collect this Athlete Card.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {athleteCollectors.map((athlete) => (
              <button
                key={`athlete-${athlete.id}`}
                type="button"
                onClick={() =>
  router.push(
    `/card/${athlete.id}?source=fans&fansAthleteId=${athleteId}`
  )
}
                className="text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MiniAthleteCard
                  athlete={athlete}
                />
              </button>
            ))}

            {fanCollectors.map((fan) => (
              <button
                key={`fan-${fan.id}`}
                type="button"
                onClick={() =>
  router.push(
    `/fan/${fan.id}?source=fans&fansAthleteId=${athleteId}`
  )
}
                className="text-left transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MiniFanTicket
                  name={fan.name}
                  photo={fan.photo_url}
                  createdAt={fan.created_at}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}