"use client";

import { useEffect, useState } from "react";
import AthleteCard from "../../components/cards/AthleteCard";
import type { Athlete } from "../../data/athletes";
import { supabase } from "../../lib/supabaseClient";

export default function CardStudioCapturePage() {
  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [face, setFace] = useState<"front" | "back">("front");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      const requestedFace =
        params.get("face") === "back" ? "back" : "front";

      setFace(requestedFace);

      if (!id) {
        setError("Missing card ID.");
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from("cards")
          .select(
            "id, name, school, sport, action_image_url, portrait_image_url, card_data"
          )
          .eq("id", id)
          .maybeSingle();

        if (supabaseError) throw supabaseError;
        if (!data) throw new Error("Card not found.");

        const loadedAthlete: Athlete = {
          ...(data.card_data ?? {}),
          id: data.id,

          name:
            data.card_data?.name ??
            data.name ??
            "",

          school:
            data.card_data?.school ??
            data.school ??
            "",

          primarySport:
            data.card_data?.primarySport ??
            data.sport ??
            "",

          theme:
            data.card_data?.theme ??
            "gold",

          actionImage:
            data.card_data?.actionImage ||
            data.action_image_url ||
            "",

          portraitImage:
            data.card_data?.portraitImage ||
            data.card_data?.profileImage ||
            data.portrait_image_url ||
            "",

          profileImage:
            data.card_data?.profileImage ||
            data.card_data?.portraitImage ||
            data.portrait_image_url ||
            "",
        };

        setAthlete(loadedAthlete);
      } catch (err) {
        console.error("CAPTURE PAGE LOAD ERROR:", err);
        setError("Could not load Athlete Card.");
      }
    };

    load();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!athlete) {
    return <div>Loading...</div>;
  }

  return (
    <main
      style={{
        width: "310px",
        height: "530px",
        margin: 0,
        padding: 0,
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        id="capture-card"
        data-capture-ready="true"
        style={{
          width: "310px",
          height: "530px",
        }}
      >
        <AthleteCard
          athlete={athlete}
          isOwnCard={true}
          collectionCount={0}
          fansCount={0}
          exportMode={true}
          forceFace={face}
        />
      </div>
    </main>
  );
}
