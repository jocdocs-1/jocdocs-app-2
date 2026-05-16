"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import AthleteCard from "@/app/components/AthleteCard";
import type { Athlete } from "@/app/data/athletes";
import { supabase } from "@/app/lib/supabaseClient";

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
      achievementBanner: (
  searchParams.get("achievementBanner") === "state_champion" ||
  searchParams.get("achievementBanner") === "national_champion" ||
  searchParams.get("achievementBanner") === "world_champion" ||
  searchParams.get("achievementBanner") === "gold_medalist" ||
  searchParams.get("achievementBanner") === "first_place"
    ? searchParams.get("achievementBanner")
    : "none"
) as Athlete["achievementBanner"],
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

  const [athlete, setAthlete] = useState<Athlete | null>(null);
const [isFollowed, setIsFollowed] = useState(false);
const [isCollected, setIsCollected] = useState(false);
const [fansCount, setFansCount] = useState(0);
const [copySuccess, setCopySuccess] = useState(false);

useEffect(() => {
  async function loadCardFromSupabase() {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.log("No Supabase card found, falling back...");
        return;
      }

      console.log("LOADED FROM SUPABASE:", data);

      if (data.card_data) {
        setAthlete({
          ...data.card_data,
          id: data.id,
          actionImage: data.action_image_url || data.card_data.actionImage,
          portraitImage: data.portrait_image_url || data.card_data.portraitImage,
          profileImage: data.portrait_image_url || data.card_data.profileImage,
        });
      }
    } catch (err) {
      console.error("Error loading card from Supabase:", err);
    }
  }

  loadCardFromSupabase();
}, [id]);

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
  }, [id]);

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
  if (!athlete) return;

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

  if (!athlete) {
  return <main className="min-h-screen bg-white" />;
}

const handleShareCard = async () => {
  const shareUrl = window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${athlete.name}'s jocdocs Card`,
        text: `Check out ${athlete.name}'s jocdocs card.`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  } catch (error) {
    console.error("Error sharing card:", error);
  }
};

return (
  <main className="min-h-screen bg-white flex flex-col items-center px-4 pt-8 pb-12">

    {/* CARD */}
<div className="relative z-10 w-full max-w-[420px] pb-[24px]">
  <AthleteCard
    athlete={athlete}
    isOwnCard={false}
    isFollowed={isFollowed}
    isCollected={isCollected}
    fansCount={fansCount}
    onToggleFollow={handleToggleFollow}
    onCollect={handleCollect}
  />
</div>

{/* CTA SECTION */}
<div className="relative z-0 mt-1 flex w-full flex-col items-center sm:mt-6">
  <p className="mb-4 text-[15px] text-neutral-500">
    Want one of your own?
  </p>

  <a
    href="/?ref=card"
    className="flex w-full max-w-[340px] flex-col items-center justify-center rounded-full bg-[#C9AD68] px-6 py-3 text-center text-white shadow-lg shadow-[#C9AD68]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
  >
    <span className="text-[26px] font-bold leading-tight">
      Create Your Own Card
    </span>
    <span className="-mt-[2px] text-[20px] font-roboto-condensed italic leading-tight tracking-tight opacity-90">
      It takes 60 seconds
    </span>
  </a>

{/* SHARE SECTION */}

<p className="mt-8 max-w-[320px] text-center text-[15px] italic leading-[1.25] text-neutral-500">
  Use share button either on card or below to share with teammates,
  friends, family and coaches.
</p>

<button
  onClick={handleShareCard}
  className="mt-4 flex w-full max-w-[340px] items-center justify-center rounded-full bg-[#C9AD68] px-6 py-3 text-center text-[26px] font-bold leading-tight text-white shadow-lg shadow-[#C9AD68]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
>
  Share My Card
</button>

{copySuccess && (
  <p className="mt-3 text-center text-[13px] font-bold text-[#C5A96A]">
    Link copied.
  </p>
)}

<a
    href="/"
    className="mt-4 text-[18px] font-medium text-black underline underline-offset-4"
  >
    Visit jocdocs.com →
  </a>
</div>

  </main>
);
}