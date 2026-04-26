"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Bookmark,
  Share2,
  RefreshCw,
  UserPlus,
} from "lucide-react";
import type { Athlete } from "../data/athletes";
import { allison } from "../fonts";

const themeMap: Record<string, { from: string; to: string }> = {
  gold: { from: "#eab308", to: "#a16207" },
  red: { from: "#ef4444", to: "#b91c1c" },
  orange: { from: "#f97316", to: "#c2410c" },
  yellow: { from: "#fde047", to: "#eab308" },
  green: { from: "#22c55e", to: "#15803d" },
  navy: { from: "#1e293b", to: "#172554" },
  royal: { from: "#3b82f6", to: "#1d4ed8" },
  purple: { from: "#a855f7", to: "#7e22ce" },
  maroon: { from: "#7f1d1d", to: "#4c0519" },
  silver: { from: "#d4d4d8", to: "#71717a" },
  black: { from: "#27272a", to: "#000000" },
};

export default function AthleteCard({
  athlete,
  isOwnCard = true,
  onOpenCollection,
  onCollect,
  onToggleFollow,
  onShare,
  collection,
  isCollected = false,
  isFollowed = false,
  fansCount = 0,
}: {
  athlete: Athlete;
  isOwnCard?: boolean;
  onOpenCollection?: () => void;
  onCollect?: () => void;
  onToggleFollow?: () => void;
  onShare?: () => void;
  collection?: Athlete[];
  isCollected?: boolean;
  isFollowed?: boolean;
  fansCount?: number;
}) {
    const followLabel = isFollowed ? "Following" : "Follow";
  const collectLabel = isCollected ? "Collected" : "Collect";
  const fansLabel = `Fans ${fansCount}`;
  const themeColors = themeMap[athlete.theme || "gold"] || themeMap.gold;
const [isFlipped, setIsFlipped] = useState(false);
const [showToast, setShowToast] = useState(false);
const [cardScale, setCardScale] = useState(1);

useEffect(() => {
  if (!showToast) return;

  const timer = setTimeout(() => {
    setShowToast(false);
  }, 2000);

  return () => clearTimeout(timer);
}, [showToast]);

useEffect(() => {
  const updateScale = () => {
    const availableWidth = Math.min(window.innerWidth - 24, 520);
    setCardScale(availableWidth / 310);
  };

  updateScale();
  window.addEventListener("resize", updateScale);
  return () => window.removeEventListener("resize", updateScale);
}, []);

const nameParts = athlete.name.split(" ");
const firstName = nameParts[0] || athlete.name;
const lastName = nameParts.slice(1).join(" ") || "";

  const otherSports = [
    athlete.otherSport1,
    athlete.otherSport2,
  ].filter(Boolean);

  const signatureName = athlete.signatureName ?? athlete.name;
  const age = athlete.age ?? "17";
  const statSeason = athlete.statsYear ?? "2026";

  const normalizeUrl = (url?: string) => {
  if (!url?.trim()) return "";
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

  const ribbonTopText =
    athlete.achievementBanner === "state_champion"
      ? "STATE"
      : athlete.achievementBanner === "national_champion"
      ? "NATIONAL"
      : athlete.achievementBanner === "world_champion"
      ? "WORLD"
      : athlete.achievementBanner === "gold_medalist"
      ? "GOLD"
      : athlete.achievementBanner === "first_place"
      ? "FIRST"
      : "";

  const ribbonBottomText =
    athlete.achievementBanner === "state_champion"
      ? "CHAMPION"
      : athlete.achievementBanner === "national_champion"
      ? "CHAMPION"
      : athlete.achievementBanner === "world_champion"
      ? "CHAMPION"
      : athlete.achievementBanner === "gold_medalist"
      ? "MEDALIST"
      : athlete.achievementBanner === "first_place"
      ? "PLACE"
      : "";

      const ribbonPositionMap: Record<string, string> = {
  default: "left-[4.5px] top-[40.5px]",
  gold_medalist: "left-[8px] top-[40px]",
  first_place: "left-[18px] top-[42px]",
};

      const handleShare = async () => {
  const slugBase = `${athlete.name || "athlete"}-${athlete.jerseyNumber || "card"}`;

  const slug = slugBase
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "athlete-card";

  const athleteToShare = {
    ...athlete,
    id: slug,
  };

  const shareKey = `jocdocs_share_${slug}`;

  try {
    localStorage.setItem(shareKey, JSON.stringify(athleteToShare));
  } catch (error) {
    console.error("Error saving shared card:", error);
  }

  const params = new URLSearchParams({
    name: athlete.name || "",
    school: athlete.school || "",
    sport: athlete.primarySport || "",
    team: athlete.team || "",
    theme: athlete.theme || "gold",
    isLegacy: athlete.isLegacy ? "true" : "false",
    achievementBanner: athlete.achievementBanner || "none",
    jerseyNumber: athlete.jerseyNumber || "",
    position: athlete.position || "",
    age: athlete.age || "",
    height: athlete.height || "",
    weight: athlete.weight || "",
    hometown: athlete.hometown || "",
    statsYear: athlete.statsYear || "",
    statLabel1: athlete.statLabel1 || "",
    stat1: athlete.stat1 || "",
    statLabel2: athlete.statLabel2 || "",
    stat2: athlete.stat2 || "",
    statLabel3: athlete.statLabel3 || "",
    stat3: athlete.stat3 || "",
    otherSport1: athlete.otherSport1 || "",
    otherSport2: athlete.otherSport2 || "",
    otherSport3: athlete.otherSport3 || "",
    link1: athlete.link1 || "",
    link2: athlete.link2 || "",
  });

  const origin = window.location.origin;
  const shareUrl = `${origin}/card/${slug}?${params.toString()}`;

  const isLocalhost =
    origin.includes("localhost") ||
    origin.includes("127.0.0.1") ||
    origin.includes("192.168.");
    const messages = [
  `${athlete.name || "This athlete"} just dropped their card. You next?`,
  `Check out ${athlete.name || "this athlete"}'s jocdocs card — create your own!`,
  `Your career deserves a card. See ${athlete.name || "this athlete"}'s on jocdocs.`,
  `This is actually pretty cool — check out ${athlete.name || "this athlete"}'s card.`,
];

const randomMessage =
  messages[Math.floor(Math.random() * messages.length)];

  try {
    if (navigator.share) {
      await navigator.share({
        title: `${athlete.name || "Athlete"} on jocdocs`,
        text: randomMessage,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);

      if (isLocalhost) {
        alert("Local test link copied. This will only work on this machine/browser unless the app is deployed.");
      } else {
        alert("Share link copied to clipboard!");
      }
    }
  } catch (error) {
    if ((error as Error)?.name !== "AbortError") {
      console.error("Error sharing:", error);
      alert("There was a problem creating the share link.");
    }
  }
};

    return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      style={{ fontFamily: '"Roboto Condensed", Roboto, sans-serif' }}
    >
      <div className="relative w-full aspect-[310/530]">
        <div
  className="absolute left-1/2 top-0"
  style={{
    width: "310px",
    height: "530px",
    transform: `translateX(-50%) scale(${cardScale})`,
    transformOrigin: "top center",
  }}
>
          <div className="relative h-[530px] w-[310px] [perspective:1400px]">
            <div
              className="relative h-full w-full transform-gpu duration-700 ease-in-out"
              style={{
                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                transformStyle: "preserve-3d",
                WebkitTransformStyle: "preserve-3d",
              }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 z-20"
                style={{
                  transform: "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="relative h-full w-full overflow-visible rounded-[22px] bg-white p-[7px] shadow-[0_10px_24px_rgba(120,120,120,0.45)]">
                  {/* ACHIEVEMENT RIBBON */}
                  {athlete.achievementBanner && athlete.achievementBanner !== "none" && (
                    <div className="pointer-events-none absolute left-[-10.7px] top-[-19.7px] z-[300] h-[135px] w-[115px]">
                      <img
                        src="/ribbons/gold-ribbon-v2.png"
                        alt="Achievement ribbon"
                        className="h-full w-full object-contain"
                      />

                      <div
                        className={`absolute ${
                          ribbonPositionMap[athlete.achievementBanner ?? "default"] || ribbonPositionMap.default
                        } rotate-[-45deg] text-center text-white`}
                      >
                        <div
                          className="text-[11px] font-extrabold italic leading-[0.8] tracking-[0.03em]"
                          style={{ fontFamily: '"Roboto Condensed", Roboto, sans-serif' }}
                        >
                          {ribbonTopText}
                        </div>
                        <div
                          className="mt-[1px] text-[15.5px] font-extrabold italic leading-none tracking-[0.01em]"
                          style={{ fontFamily: '"Roboto Condensed", Roboto, sans-serif' }}
                        >
                          {ribbonBottomText}
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className="relative h-full w-full overflow-hidden rounded-[16px]"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        ${themeColors.from} 0%,
                        ${themeColors.from} 86%,
                        ${themeColors.to} 100%
                      )`,
                    }}
                  >

                    {/* LEGACY STRIP */}
                    {athlete.isLegacy && (
                      <div className="absolute left-0 top-[56px] z-30">
                        <div
                          className="inline-block rounded-r-[3000px] pl-3 pr-3 py-[8px]"
                          style={{ backgroundColor: "#C5A96A" }}
                        >
                          <span
                            className="block translate-y-[6px] text-[13.5px] font-bold italic uppercase leading-none tracking-[0.01em] text-black"
                            style={{ fontFamily: '"Roboto Condensed", Roboto, sans-serif' }}
                          >
                            LEGACY
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="absolute right-[1px] top-[4px] z-30 flex h-12 w-12 items-center justify-center overflow-hidden">
                      <img
                        src="/logo.png"
                        alt="jocdocs logo"
                        className="h-[64%] w-[64%] object-cover"
                      />
                    </div>

                    <div className="absolute left-0 top-[10px] z-30 w-[85%]">
                      <div className="rounded-r-full bg-white py-[4px] pl-5 pr-5 shadow-md">
                        <p className="text-center text-[19px] font-extrabold italic leading-none text-black">
                          {firstName}
                        </p>
                        <h2 className="mt-[1px] text-center text-[30px] font-extrabold italic uppercase leading-none tracking-[0.01em] text-black">
                          {lastName || firstName}
                        </h2>
                      </div>
                    </div>

                    <div className="absolute bottom-[94px] left-[10px] right-[10px] top-[52px] overflow-hidden rounded-[15px] border-[2px] border-white bg-neutral-300">
                      <img
                        src={athlete.actionImage || athlete.image || "/action.jpg"}
                        alt="Athlete action"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="absolute bottom-[118px] right-5 z-20 text-[62px] font-extrabold italic leading-none text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)]">
                      {athlete.jerseyNumber || String(athlete.number || "")}
                    </div>

                    <div className="absolute bottom-[70px] right-0 z-30 w-[86%]">
                      <div className="rounded-l-full bg-black py-[7px] pl-6 pr-4 text-left text-white shadow-lg">
                        <p className="truncate whitespace-nowrap text-[14px] font-extrabold italic leading-none text-white-300">
                          {athlete.school}
                        </p>
                        <p className="mt-[3px] truncate whitespace-nowrap text-[19px] font-extrabold italic uppercase leading-none tracking-[0.01em]">
                          {athlete.team}
                        </p>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-1 left-3 right-3 z-30 flex items-start justify-between"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isOwnCard ? (
                        <>
                          <button
                            type="button"
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                              <Users size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">{fansLabel}</span>
                          </button>

                          <button
                            type="button"
                            onClick={onOpenCollection}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                              <Bookmark size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">Collection</span>
                          </button>

                          <button
                            type="button"
                            onClick={onShare ?? handleShare}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                              <Share2 size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">Share</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFlipped(true);
                            }}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                              <RefreshCw size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">Flip</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={onToggleFollow}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-150 ${
                                isFollowed
                                  ? "border-white/80 bg-white/80"
                                  : "border-white/40 bg-white/10"
                              }`}
                            >
                              <UserPlus
                                size={18}
                                strokeWidth={2}
                                className={isFollowed ? "text-neutral-700" : "text-white"}
                              />
                            </span>

                            <span
                              className={`text-[10px] ${
                                isFollowed ? "font-semibold text-white" : "text-white"
                              }`}
                            >
                              {followLabel}
                            </span>
                          </button>

                          <button
                            type="button"
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                              <Users size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">{fansLabel}</span>
                          </button>

                          <button
                            type="button"
                            onClick={isCollected ? undefined : onCollect}
                            disabled={isCollected}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] backdrop-blur-sm ${
                                isCollected
                                  ? "border-white/70 bg-white/80"
                                  : "border-white/40 bg-white/10"
                              }`}
                            >
                              <Bookmark
                                size={18}
                                strokeWidth={2}
                                className={isCollected ? "text-neutral-600 fill-neutral-600" : "text-white"}
                              />
                            </span>

                            <span className="text-[10px] font-semibold">{collectLabel}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleShare}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                              <Share2 size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">Share</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsFlipped(true);
                            }}
                            className="flex w-[70px] flex-col items-center gap-1 text-white"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                              <RefreshCw size={18} strokeWidth={2} />
                            </span>
                            <span className="text-[10px]">Flip</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 z-10"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="relative h-full w-full rounded-[22px] bg-white p-[7px] shadow-[0_10px_24px_rgba(120,120,120,0.45)]">
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-gradient-to-b from-[#4a4a4a] to-[#2f2f2f] text-white">
                    <div className="relative px-0 pt-[10px]">
                      <div className="absolute right-[2px] top-[2px] z-20 flex h-10 w-10 items-center justify-center overflow-hidden">
                        <img
                          src="/logo-bw.png"
                          alt="jocdocs logo"
                          className="h-[72%] w-[72%] object-contain"
                        />
                      </div>

                      <div className="w-[86%]">
                        <div className="rounded-r-full bg-white py-[3px] pl-5 pr-4 shadow-md">
                          <p className="text-center text-[15px] font-extrabold italic leading-none text-black">
                            {firstName}
                          </p>
                          <h2 className="mt-[1px] text-center text-[24px] font-extrabold italic uppercase leading-none tracking-[0.01em] text-black">
                            {lastName || firstName}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pt-[11px]">
                      <div className="flex gap-[10px]">
                        <div className="h-[112px] w-[106px] shrink-0 overflow-hidden rounded-[15px] border-[1.5px] border-white bg-neutral-300 shadow-md">
                          <img
                            src={athlete.profileImage || athlete.portraitImage || "/portrait.png"}
                            alt="Athlete portrait"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between py-[1px]">
                          <p className="mb-[5px] truncate whitespace-nowrap overflow-hidden text-[15px] font-bold italic leading-[0.9] text-white/90">
                            {athlete.school}
                          </p>

                          <p className="truncate whitespace-nowrap overflow-hidden text-[18px] font-extrabold italic uppercase leading-[0.92] text-white">
                            {athlete.team}
                          </p>

                          <p className="my-[2px] text-[17px] font-medium italic leading-[1.0] text-white/90">
                            {athlete.position}
                          </p>

                          <p className="text-[53px] font-extrabold italic leading-[0.84] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                            <span className="relative -top-[17px] mr-[1px] text-[27px] font-normal italic">
                              #
                            </span>
                            {athlete.jerseyNumber}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`mt-[3px] pl-[1px] text-[42px] leading-none text-white/65 ${allison.className}`}
                      >
                        {signatureName}
                      </div>

                      <div className="mt-[6px] space-y-[2px] text-[14.5px] leading-tight text-white">
                        <p>
                          Age: <span className="font-bold">{age}</span>
                          &nbsp;&nbsp; Height: <span className="font-bold">{athlete.height || "—"}</span>
                          &nbsp;&nbsp; Weight: <span className="font-bold">{athlete.weight || "—"}</span>
                        </p>

                        <p>
                          Hometown: <span className="font-bold">{athlete.hometown || "—"}</span>
                        </p>

                        <p className="truncate whitespace-nowrap">
                          <span className="font-normal">Sport:</span>{" "}
                          <span className="font-bold">{athlete.primarySport || "—"}</span>
                          {otherSports.length > 0 && (
                            <>
                              {" "}
                              <span className="font-normal">Other:</span>{" "}
                              <span className="font-bold">{otherSports.join(", ")}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mx-5 my-[8px] h-[1px] bg-white/25" />

                    <div className="px-5">
                      <p className="mb-[4px] text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                        Key Stats {statSeason}
                      </p>

                      <div className="mx-auto flex w-[252px] justify-between">
                        {[
                          { label: athlete.statLabel1 || "STAT", value: athlete.stat1 || "—" },
                          { label: athlete.statLabel2 || "STAT", value: athlete.stat2 || "—" },
                          { label: athlete.statLabel3 || "STAT", value: athlete.stat3 || "—" },
                        ].map((stat, index) => (
                          <div
                            key={index}
                            className="w-[75px] shrink-0 rounded-xl border border-white/20 bg-white/5 px-2 py-[4px] text-center shadow-sm"
                          >
                            <div className="text-[19px] font-extrabold italic leading-none text-white">
                              {stat.value}
                            </div>
                            <div className="mt-[1px] truncate text-[8px] uppercase tracking-[0.05em] text-white/75">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-5 pt-[6px]">
                      <p className="mb-[5px] text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                        Links / Highlights
                      </p>

                      <div className="space-y-[3px] text-[10px]">
                        {[athlete.link1, athlete.link2].map((link, index) => {
                          const safeLink = normalizeUrl(link);

                          return safeLink ? (
                            <a
                              key={index}
                              href={safeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="block truncate rounded-lg border border-white/15 bg-black/15 px-3 py-[4px] text-white"
                            >
                              {link}
                            </a>
                          ) : (
                            <div
                              key={index}
                              className="block truncate rounded-lg border border-white/10 bg-black/10 px-3 py-[4px] text-white/60 italic"
                            >
                              {`Add Link ${index + 1}`}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="mt-auto px-4 pb-1.5 pt-[8px]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between">
                        {isOwnCard ? (
                          <>
                            <button
                              type="button"
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                                <Users size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">{fansLabel}</span>
                            </button>

                            <button
                              type="button"
                              onClick={onOpenCollection}
                              disabled={isCollected}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm border-white/40 bg-white/10">
                                <Bookmark
                                  size={18}
                                  strokeWidth={2}
                                  className={isCollected ? "text-white fill-white" : "text-white"}
                                />
                              </span>
                              <span className="text-[10px]">Collection</span>
                            </button>

                            <button
                              type="button"
                              onClick={handleShare}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                                <Share2 size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">Share</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(false);
                              }}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                                <RefreshCw size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">Flip</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={onToggleFollow ?? (() => {})}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-150 ${
                                  isFollowed
                                    ? "border-white/80 bg-white/80"
                                    : "border-white/40 bg-white/10"
                                }`}
                              >
                                <UserPlus
                                  size={18}
                                  strokeWidth={2}
                                  className={isFollowed ? "text-neutral-700" : "text-white"}
                                />
                              </span>

                              <span
                                className={`text-[10px] ${
                                  isFollowed ? "font-semibold text-white" : "text-white"
                                }`}
                              >
                                {followLabel}
                              </span>
                            </button>

                            <button
                              type="button"
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                                <Users size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">{fansLabel}</span>
                            </button>

                            <button
                              type="button"
                              onClick={isCollected ? undefined : (onCollect ?? (() => {}))}
                              disabled={isCollected}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] backdrop-blur-sm ${
                                  isCollected
                                    ? "border-white/70 bg-white/80"
                                    : "border-white/40 bg-white/10"
                                }`}
                              >
                                <Bookmark
                                  size={18}
                                  strokeWidth={2}
                                  className={isCollected ? "text-neutral-600 fill-neutral-600" : "text-white"}
                                />
                              </span>

                              <span className="text-[10px] font-semibold">{collectLabel}</span>
                            </button>

                            <button
                              type="button"
                              onClick={onShare ?? handleShare}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                                <Share2 size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">Share</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(false);
                              }}
                              className="flex w-[70px] flex-col items-center gap-1 text-white"
                            >
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                                <RefreshCw size={18} strokeWidth={2} />
                              </span>
                              <span className="text-[10px]">Flip</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showToast && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 z-[400] -translate-x-1/2 rounded-full bg-black/85 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
              Card link copied — share it! 🔥
            </div>
          )}
        </div>
      </div>
    </div>
  );
}