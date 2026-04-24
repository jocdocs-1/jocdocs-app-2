"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AthleteCard from "@/app/components/AthleteCard";
import type { Athlete } from "@/app/data/athletes";

export default function CardPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const id = typeof params?.id === "string" ? params.id : "unknown-athlete";

  const fallbackAthlete = useMemo<Athlete>(
    () => ({
      id,
      name: searchParams.get("name") || "Unknown Athlete",
      school: searchParams.get("school") || "",
      primarySport: searchParams.get("sport") || "",
      team: searchParams.get("team") || "",
      theme: searchParams.get("theme") || "gold",
      isLegacy: searchParams.get("isLegacy") === "true",
      achievementBanner: searchParams.get("achievementBanner") || "none",
      jerseyNumber: searchParams.get("jerseyNumber") || "",
      position: searchParams.get("position") || "",
      age: searchParams.get("age") || "",
      height: searchParams.get("height") || "",
      weight: searchParams.get("weight") || "",
      hometown: searchParams.get("hometown") || "",
      statsYear: searchParams.get("statsYear") || "",
      statLabel1: searchParams.get("statLabel1") || "",
      stat1: searchParams.get("stat1") || "",
      statLabel2: searchParams.get("statLabel2") || "",
      stat2: searchParams.get("stat2") || "",
      statLabel3: searchParams.get("statLabel3") || "",
      stat3: searchParams.get("stat3") || "",
      otherSport1: searchParams.get("otherSport1") || "",
      otherSport2: searchParams.get("otherSport2") || "",
      otherSport3: searchParams.get("otherSport3") || "",
      link1: searchParams.get("link1") || "",
      link2: searchParams.get("link2") || "",
      number: Number(searchParams.get("jerseyNumber") || 0),
      image: "/action.jpg",
      portraitImage: "/portrait.png",
      actionImage: "/action.jpg",
      profileImage: "/portrait.png",
    }),
    [id, searchParams]
  );

  const [athlete, setAthlete] = useState<Athlete>(fallbackAthlete);
  const [isFollowed, setIsFollowed] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [fansCount, setFansCount] = useState(0);

  useEffect(() => {
    const shareKey = `jocdocs_share_${id}`;

    try {
      const saved = localStorage.getItem(shareKey);

      if (saved) {
        const parsed = JSON.parse(saved) as Athlete;
        if (parsed?.id === id) {
          setAthlete(parsed);
          return;
        }
      }
    } catch (error) {
      console.error("Error loading shared card from localStorage:", error);
    }

    setAthlete(fallbackAthlete);
  }, [id, fallbackAthlete]);

  useEffect(() => {
    try {
      const followedIds = JSON.parse(
        localStorage.getItem("jocdocs_followed_ids") || "[]"
      ) as string[];

      const collectedCards = JSON.parse(
        localStorage.getItem("jocdocs_collection") || "[]"
      ) as Athlete[];

      const storedFans = JSON.parse(
        localStorage.getItem("jocdocs_fans_counts") || "{}"
      ) as Record<string, number>;

      setIsFollowed(followedIds.includes(id));
      setIsCollected(collectedCards.some((card) => card.id === id));
      setFansCount(storedFans[id] || 0);
    } catch (error) {
      console.error("Error loading shared card interaction state:", error);
    }
  }, [id]);

  const handleToggleFollow = () => {
    try {
      const followedIds = JSON.parse(
        localStorage.getItem("jocdocs_followed_ids") || "[]"
      ) as string[];

      const storedFans = JSON.parse(
        localStorage.getItem("jocdocs_fans_counts") || "{}"
      ) as Record<string, number>;

      let nextFollowedIds = [...followedIds];
      let nextFans = storedFans[id] || 0;
      let nextIsFollowed = false;

      if (followedIds.includes(id)) {
        nextFollowedIds = followedIds.filter((followedId) => followedId !== id);
        nextFans = Math.max(0, nextFans - 1);
        nextIsFollowed = false;
      } else {
        nextFollowedIds.push(id);
        nextFans = nextFans + 1;
        nextIsFollowed = true;
      }

      storedFans[id] = nextFans;

      localStorage.setItem(
        "jocdocs_followed_ids",
        JSON.stringify(nextFollowedIds)
      );
      localStorage.setItem(
        "jocdocs_fans_counts",
        JSON.stringify(storedFans)
      );

      setIsFollowed(nextIsFollowed);
      setFansCount(nextFans);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleCollect = () => {
    try {
      const collection = JSON.parse(
        localStorage.getItem("jocdocs_collection") || "[]"
      ) as Athlete[];

      const alreadyCollected = collection.some((card) => card.id === athlete.id);

      if (alreadyCollected) {
        setIsCollected(true);
        return;
      }

      const updatedCollection = [...collection, athlete];
      localStorage.setItem(
        "jocdocs_collection",
        JSON.stringify(updatedCollection)
      );
      setIsCollected(true);
    } catch (error) {
      console.error("Error collecting shared card:", error);
    }
  };

  return (
  <main className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-3 py-4">
    {/* CARD */}
    <AthleteCard
      athlete={athlete}
      isOwnCard={false}
      onToggleFollow={handleToggleFollow}
      onCollect={handleCollect}
      isFollowed={isFollowed}
      isCollected={isCollected}
      fansCount={fansCount}
    />

    {/* CTA */}
    <div className="mt-3 flex flex-col items-center">
      <button
        onClick={() => (window.location.href = "/create")}
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-gray-200"
      >
        Create Your Own Card — It Takes 60 Seconds
      </button>
    </div>
  </main>
);
}