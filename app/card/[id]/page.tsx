"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import AthleteCard from "../../components/cards/AthleteCard";
import type { Athlete } from "@/app/data/athletes";
import { supabase } from "@/app/lib/supabaseClient";
import NavigationButton from "@/app/components/navigation/NavigationButton";

export default function CardPage() {
const params = useParams<{ id: string }>();
const router = useRouter();
const searchParams = useSearchParams();

  const source = searchParams.get("source");
  const fansAthleteId = searchParams.get("fansAthleteId");

const exploreSource =
  searchParams.get("exploreSource") === "collection"
    ? "collection"
    : "home";

  const from =
  searchParams.get("from") === "athlete" ? "athlete" : "fan";

const ownerId = searchParams.get("ownerId");

  const id = typeof params?.id === "string" ? params.id : "unknown-athlete";

  const [collectionCount, setCollectionCount] = useState(0);

  const [isOwnCard, setIsOwnCard] = useState(false);

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
const [collectionMessage, setCollectionMessage] = useState("");

useEffect(() => {
  if (!collectionMessage) return;

  const timer = window.setTimeout(() => {
    setCollectionMessage("");
  }, 2200);

  return () => window.clearTimeout(timer);
}, [collectionMessage]);

useEffect(() => {
  const ownCardId = localStorage.getItem("jocdocsAthleteCardId");
  setIsOwnCard(ownCardId === id);
}, [id]);

useEffect(() => {
  if (!isOwnCard || !id) return;

  async function loadCollectionCount() {
    const { count, error } = await supabase
      .from("collections")
      .select("*", { count: "exact", head: true })
      .eq("collector_type", "athlete")
      .eq("collector_id", id)
      .eq("collected_type", "athlete_card");

    if (error) {
      console.error("Error loading collection count:", error);
      return;
    }

    setCollectionCount(count ?? 0);
  }

  loadCollectionCount();
}, [isOwnCard, id]);

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
          actionImage:
            data.action_image_url || data.card_data.actionImage,
          portraitImage:
            data.portrait_image_url || data.card_data.portraitImage,
          profileImage:
            data.portrait_image_url || data.card_data.profileImage,
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

    setIsFollowed(followedIds.includes(id));
  } catch (error) {
    console.error("Error loading follow state:", error);
  }
}, [id]);

useEffect(() => {
  async function loadFansCount() {
    if (!id) return;

    const { count, error } = await supabase
      .from("collections")
      .select("*", { count: "exact", head: true })
      .eq("collected_type", "athlete_card")
      .eq("collected_id", id);

    if (error) {
      console.error("Error loading fans count:", error);
      return;
    }

    setFansCount(count ?? 0);
  }

  loadFansCount();
}, [id]);

useEffect(() => {
  async function checkCollectionStatus() {
    const collectorType = from;

    const collectorId =
      from === "athlete"
        ? ownerId || window.localStorage.getItem("jocdocsAthleteCardId")
        : window.localStorage.getItem("jocdocsFanId");

    if (!collectorId || !id) {
      setIsCollected(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("collections")
        .select("id")
        .eq("collector_type", collectorType)
        .eq("collector_id", collectorId)
        .eq("collected_type", "athlete_card")
        .eq("collected_id", id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setIsCollected(Boolean(data));
    } catch (error) {
      console.error("Error checking collection status:", error);
    }
  }

  checkCollectionStatus();
}, [id, from, ownerId]);

  const handleToggleFollow = () => {
  try {
    const followedIds = JSON.parse(
      localStorage.getItem("jocdocs_followed_ids") || "[]"
    ) as string[];

    let nextFollowedIds: string[];
    let nextIsFollowed: boolean;

    if (followedIds.includes(id)) {
      nextFollowedIds = followedIds.filter(
        (followedId) => followedId !== id
      );
      nextIsFollowed = false;
    } else {
      nextFollowedIds = [...followedIds, id];
      nextIsFollowed = true;
    }

    localStorage.setItem(
      "jocdocs_followed_ids",
      JSON.stringify(nextFollowedIds)
    );

    setIsFollowed(nextIsFollowed);
  } catch (error) {
    console.error("Error toggling follow:", error);
  }
};

  const handleCollect = async () => {
  if (!athlete) return;

  const collectorType = from;

  const collectorId =
    from === "athlete"
      ? ownerId || window.localStorage.getItem("jocdocsAthleteCardId")
      : window.localStorage.getItem("jocdocsFanId");

  if (!collectorId) {
    if (from === "athlete") {
      window.alert(
        "We could not identify your Athlete Card. Please return to your card and try again."
      );
      return;
    }

    const createFanTicket = window.confirm(
      "Create your Fan Ticket first so you can begin your collection."
    );

    if (createFanTicket) {
      window.location.href = "/create-fan";
    }

    return;
  }

  try {
    // REMOVE FROM COLLECTION
    if (isCollected) {
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("collector_type", collectorType)
        .eq("collector_id", collectorId)
        .eq("collected_type", "athlete_card")
        .eq("collected_id", athlete.id);

      if (error) {
        throw error;
      }

      setIsCollected(false);
      setFansCount((count) => Math.max(0, count - 1));
      setCollectionMessage("Removed from My Collection");
      return;
    }

    // ADD TO COLLECTION
    const { error } = await supabase.from("collections").insert({
      collector_type: collectorType,
      collector_id: collectorId,
      collected_type: "athlete_card",
      collected_id: athlete.id,
    });

    if (error) {
      if (error.code === "23505") {
        setIsCollected(true);
        setCollectionMessage("Already in My Collection");
        return;
      }

      throw error;
    }

    setIsCollected(true);
    setFansCount((count) => count + 1);
    setCollectionMessage("Added to My Collection");
  } catch (error) {
    console.error("Error updating Athlete Card collection:", error);

    window.alert(
      isCollected
        ? "We could not remove this Athlete Card from your collection."
        : "We could not add this Athlete Card to your collection."
    );
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

const handleOpenFans = () => {
  const params = new URLSearchParams();

  if (source) {
    params.set("cardSource", source);
  }

  if (source === "explore") {
    params.set("exploreSource", exploreSource);
    params.set("from", from);

    if (ownerId) {
      params.set("ownerId", ownerId);
    }
  }

  const query = params.toString();

router.push(
  `/fans/${athlete.id}${query ? `?${query}` : ""}`
);
};

const handleOpenCollection = () => {
  const athleteOwnerId =
    ownerId || window.localStorage.getItem("jocdocsAthleteCardId");

  if (!athleteOwnerId) {
    window.location.href = "/collection?from=athlete";
    return;
  }

  window.location.href =
    `/collection?from=athlete&ownerId=${athleteOwnerId}`;
};

return (
  <main className="relative min-h-screen bg-white flex flex-col items-center px-4 pt-16 pb-12">
    <NavigationButton
  type={source === "fans" ? "close" : isOwnCard ? "back" : "close"}
  onClick={() => {
  if (source === "fans" && fansAthleteId) {
    window.location.href = `/fans/${fansAthleteId}`;
    return;
  }

  if (isOwnCard) {
    window.location.href = "/";
    return;
  }

    const ownerParam = ownerId ? `&ownerId=${ownerId}` : "";

    // Card was opened directly from My Collection.
    if (source === "collection") {
      window.location.href =
        `/collection?from=${from}${ownerParam}`;
      return;
    }

    // Card was opened from Explore.
    if (source === "explore") {
      const fromParam = from ? `&from=${from}` : "";

      window.location.href =
        `/explore?source=${exploreSource}${fromParam}${ownerParam}`;
      return;
    }

    // Shared/direct Athlete Card with no known parent.
    window.location.href = "/";
  }}
/>

    {/* CARD */}
<div className="relative z-10 w-full max-w-[420px] pb-[190px]">
  <AthleteCard
  athlete={athlete}
  isOwnCard={isOwnCard}
  isCollected={isCollected}
  fansCount={fansCount}
  collectionCount={collectionCount}
  onToggleCollect={handleCollect}
  onOpenFans={handleOpenFans}
  onOpenCollection={handleOpenCollection}
/>

  {collectionMessage && (
  <div className="pointer-events-none absolute bottom-[56px] left-1/2 z-[500] -translate-x-1/2 whitespace-nowrap rounded-full border border-[#C9AD68] bg-white px-5 py-3 text-center text-sm font-semibold text-black shadow-lg">
    {collectionMessage}
  </div>
)}
</div>

{/* CTA SECTION */}
<div className="relative z-0 mt-24 flex w-full flex-col items-center sm:mt-6">

{/* SHARE SECTION */}

<button
  onClick={handleShareCard}
  className="flex w-full max-w-[340px] items-center justify-center rounded-full bg-[#C9AD68] px-6 py-3 text-center text-[26px] font-bold leading-tight text-white shadow-lg shadow-[#C9AD68]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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