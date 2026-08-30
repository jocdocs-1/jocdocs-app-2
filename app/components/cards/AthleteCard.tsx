"use client";

import { useEffect, useState, type Ref } from "react";
import {
  Users,
  Bookmark,
  Share2,
  RefreshCw,
} from "lucide-react";
import type { Athlete } from "../../data/athletes";
import { allison, barlowCondensed } from "../../fonts";

const themeMap: Record<
  string,
  {
    from: string;
    to: string;
    stadium: string;
    stadiumLift: number;
    stadiumContrast: number;
  }
> = {
  gold: {
    from: "#eab308",
    to: "#a16207",
    stadium: "#f4c430",
    stadiumLift: 0.28,
    stadiumContrast: 0.18,
  },

  red: {
    from: "#ef4444",
    to: "#b91c1c",
    stadium: "#ef4444",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  orange: {
    from: "#f97316",
    to: "#c2410c",
    stadium: "#ff8a1f",
    stadiumLift: 0.14,
    stadiumContrast: 0.18,
  },

  yellow: {
    from: "#fde047",
    to: "#eab308",
    stadium: "#ffe45c",
    stadiumLift: 0.42,
    stadiumContrast: 0.18,
  },

  green: {
    from: "#22c55e",
    to: "#15803d",
    stadium: "#22c55e",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  navy: {
    from: "#1e293b",
    to: "#172554",
    stadium: "#284b8f",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  royal: {
    from: "#3b82f6",
    to: "#1d4ed8",
    stadium: "#3b82f6",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  purple: {
    from: "#a855f7",
    to: "#7e22ce",
    stadium: "#a855f7",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  maroon: {
    from: "#7f1d1d",
    to: "#4c0519",
    stadium: "#7f1d1d",
    stadiumLift: 0,
    stadiumContrast: 0,
  },

  silver: {
    from: "#d4d4d8",
    to: "#71717a",
    stadium: "#d4d4d8",
    stadiumLift: 0.24,
    stadiumContrast: 0.18,
  },

  black: {
    from: "#27272a",
    to: "#000000",
    stadium: "#27272a",
    stadiumLift: 0,
    stadiumContrast: 0,
  },
};

export default function AthleteCard({
  athlete,
  isOwnCard = true,
  onOpenCollection,
  onOpenFans,
  onToggleCollect,
  onShare,
  collectionCount = 0,
  isCollected = false,
  fansCount = 0,
  frontExportRef,
backExportRef,
  exportMode = false,
  forceFace,
}: {
  athlete: Athlete;
  isOwnCard?: boolean;
  onOpenCollection?: () => void;
  onOpenFans?: () => void;
  onToggleCollect?: () => void;
  onShare?: () => void;
  collectionCount?: number;
  isCollected?: boolean;
  fansCount?: number;
  frontExportRef?: Ref<HTMLDivElement>;
backExportRef?: Ref<HTMLDivElement>;
  exportMode?: boolean;
  forceFace?: "front" | "back";
}) {
  const collectLabel = isCollected ? "Collected" : "Collect";
const fansLabel = "Fans";
const collectionLabel = "Collection";
  const themeColors = themeMap[athlete.theme || "gold"] || themeMap.gold;
  const cardColor = themeColors.from;

const [isFlipped, setIsFlipped] = useState(false);
const resolvedIsFlipped =
  forceFace === "back"
    ? true
    : forceFace === "front"
    ? false
    : isFlipped;
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

const renderCardNavigation = (face: "front" | "back") => {
  const isFront = face === "front";

  const buttonClass =
    "flex w-[70px] flex-col items-center gap-1 text-white";

const iconClass = isFront
  ? `relative top-[-1px] flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#C5A96A] bg-black ${
      exportMode ? "" : "shadow-[0_2px_3px_rgba(0,0,0,0.78)]"
    }`
  : `relative top-[-1px] flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-white/40 bg-white/10 backdrop-blur-sm ${
      exportMode ? "" : "shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
    }`;

  const labelClass =
  "text-[10px] font-medium not-italic uppercase leading-none text-white";

  const flipCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFlipped(isFront);
  };

  const fansButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenFans?.();
      }}
      className={buttonClass}
      aria-label={`View fans of ${athlete.name}`}
    >
      <span className={iconClass}>
        <Users size={21} strokeWidth={2} />

        {fansCount > 0 && (
          <span className="absolute -right-[8px] -top-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c51f24] px-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.72)]">
            <span className="relative top-[1px] text-[9px] font-bold leading-none text-white">
              {fansCount}
            </span>
          </span>
        )}
      </span>

      <span className={labelClass}>{fansLabel}</span>
    </button>
  );

  const collectionButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpenCollection?.();
      }}
      className={buttonClass}
    >
      <span className={iconClass}>
        <Bookmark size={21} strokeWidth={2} />

        {collectionCount > 0 && (
          <span className="absolute -right-[8px] -top-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c51f24] px-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.72)]">
            <span className="relative top-[1px] text-[9px] font-bold leading-none text-white">
              {collectionCount}
            </span>
          </span>
        )}
      </span>

      <span className={labelClass}>{collectionLabel}</span>
    </button>
  );

  const collectButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggleCollect?.();
      }}
      className={buttonClass}
      aria-label={
        isCollected
          ? `Remove ${athlete.name} from collection`
          : `Add ${athlete.name} to collection`
      }
    >
      <span
        className={`${iconClass} ${
          isCollected
            ? isFront
              ? "bg-white/80"
              : "border-white/70 bg-white/80"
            : ""
        }`}
      >
        <Bookmark
          size={18}
          strokeWidth={2}
          className={
            isCollected
              ? "fill-neutral-600 text-neutral-600"
              : "text-white"
          }
        />
      </span>

      <span className={labelClass}>{collectLabel}</span>
    </button>
  );

  const shareButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();

        if (onShare) {
          onShare();
        } else {
          handleShare();
        }
      }}
      className={buttonClass}
    >
      <span className={iconClass}>
        <Share2 size={21} strokeWidth={2} />
      </span>

      <span className={labelClass}>Share</span>
    </button>
  );

  const flipButton = (
    <button
      type="button"
      onClick={flipCard}
      className={buttonClass}
    >
      <span className={iconClass}>
        <RefreshCw size={21} strokeWidth={2} />
      </span>

      <span className={labelClass}>Flip</span>
    </button>
  );

  return (
    <>
      {isOwnCard ? (
        <>
          {fansButton}
          {collectionButton}
          {shareButton}
          {flipButton}
        </>
      ) : (
        <>
          {collectButton}
          {fansButton}
          {shareButton}
          {flipButton}
        </>
      )}
    </>
  );
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
    <div
      className="relative h-full w-full transform-gpu duration-700 ease-in-out"
      style={{
        transform: resolvedIsFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
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
<div
  ref={frontExportRef}
  className="relative h-full w-full overflow-visible rounded-[22px] bg-white p-[5.5px]"
style={{
  boxShadow: exportMode
    ? "none"
    : "0 14px 38px rgba(0,0,0,0.62), 0 3px 10px rgba(0,0,0,0.55)",
}}
>

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
  className="relative h-full w-full overflow-hidden rounded-[16px] border-[1.5px] border-[#C5A96A]"
  style={{
    backgroundColor: themeColors.from,
  }}
>
  {/* STADIUM BACKGROUND */}
<div className="pointer-events-none absolute inset-0 z-0">
  {/* Stadium artwork */}
<img
  src="/card-backgrounds/stadium-athlete-2.png"
  alt=""
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
/>

  {/* Theme-specific luminosity lift */}
  <div
    className="absolute inset-0"
    style={{
      backgroundColor: "#ffffff",
      mixBlendMode: "screen",
      opacity: themeColors.stadiumLift,
    }}
  />

  {/* Middle stadium contrast */}
<div
  className="absolute inset-0"
  style={{
    background: `linear-gradient(
      to bottom,
      transparent 18%,
      rgba(0,0,0,${themeColors.stadiumContrast}) 38%,
      rgba(0,0,0,${themeColors.stadiumContrast}) 58%,
      transparent 76%
    )`,
    mixBlendMode: "multiply",
  }}
/>

{/* Theme color */}
<div
  className="absolute inset-0"
  style={{
    backgroundColor: themeColors.stadium,
mixBlendMode: "color",
opacity: 0.94,
  }}
/>
</div>

{/* LEGACY STRIP */}
{athlete.isLegacy && (
  <div
  className="absolute left-[16px] top-[69px] z-30"
  style={{
    filter: exportMode
  ? "none"
  : "drop-shadow(0 2px 1px rgba(0,0,0,0.72))",
  }}
>
    <div
  className="relative flex h-[24px] w-[73px] items-center pl-[11px]"
  style={{
    background:
      "linear-gradient(90deg, #8f650d 0%, #e7bf52 18%, #f2d474 48%, #c9972f 78%, #9b6b12 100%)",

    clipPath:
  "polygon(0 0, 100% 0, 100% 12%, 92% 82%, 89% 94%, 87% 100%, 0 100%)",

    borderTop: "1px solid rgba(255,255,255,0.68)",
    borderTopRightRadius: "6px",

boxShadow: exportMode
  ? "none"
  : "0 3px 2px -1px rgba(0,0,0,0.78)",
  }}
>
      <span
        className={`${barlowCondensed.className} relative top-[-1px] text-[15px] font-black italic uppercase leading-none tracking-[0.12em]`}
        style={{
          color: "#8a611a",
          textShadow: "0 -0.5px 0 rgba(255,225,145,0.38)",
        }}
      >
        LEGACY
      </span>
    </div>
  </div>
)}

<div className="absolute right-[-5px] top-[-4px] z-40 flex h-13 w-13 items-center justify-center overflow-visible">
  <img
    src="/logo.png"
    alt="jocdocs logo"
    className="h-[58%] w-[58%] object-contain"
  />
</div>

<div
  className={`absolute left-1/2 top-[8px] z-30 w-max min-w-[185px] max-w-[275px] -translate-x-1/2 rounded-[24px] border-[2.7px] border-[#C5A96A] bg-white px-6 pt-[5px] pb-[1px] ${
    exportMode ? "" : "shadow-[0_3px_5px_2px_rgba(0,0,0,0.75)]"
  }`}
>
  <div className="relative top-[-3.4px]">
    <p
  className={`${barlowCondensed.className} whitespace-nowrap text-center text-[21px] font-bold italic leading-[1] tracking-[0.01em] text-black`}
>
  {firstName}
</p>

    <h2
      className={`${barlowCondensed.className} mt-[-1px] truncate whitespace-nowrap overflow-hidden text-center text-[39px] font-black italic uppercase leading-[0.82] tracking-[0.01em] text-black`}
    >
      {lastName || firstName}
    </h2>
  </div>
</div>

<div
  className={`absolute bottom-[92px] left-[14px] right-[14px] top-[54px] overflow-hidden rounded-[15px] border-[2.7px] border-white bg-neutral-300 ${
    exportMode
      ? "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]"
      : "shadow-[0_0_0_1px_rgba(0,0,0,0.18),inset_0_0_0_1px_rgba(255,255,255,0.55)]"
  }`}
>
  <img
    src={athlete.actionImage || athlete.image || "/action-sample.png?v=2"}
    alt="Athlete action"
    className="h-full w-full object-cover"
    style={{
      filter: "contrast(1.12) saturate(1.08) brightness(0.98)",
    }}
  />

  {/* PHOTO ATMOSPHERE LAYER */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.12)_68%,rgba(0,0,0,0.35)_100%)]" />

  {/* BOTTOM READABILITY GRADIENT */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/45 via-black/18 to-transparent" />
</div>

{exportMode && (
<svg
  className="pointer-events-none absolute bottom-[110px] right-[29px] z-[21]"
    width="105"
    height="90"
    viewBox="0 0 105 90"
    overflow="visible"
  >
    <text
      x="100"
      y="70"
      textAnchor="end"
      fill="none"
      stroke="white"
      strokeWidth="1.5"
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{
        fontFamily: barlowCondensed.style.fontFamily,
        fontSize: "82px",
        fontWeight: 700,
        fontStyle: "italic",
        transform: "skewX(-5deg) scaleX(1.04)",
        transformOrigin: "center",
      }}
    >
      {String(athlete.jerseyNumber || athlete.number || "")
        .replace(/\D/g, "")
        .slice(0, 2)}
    </text>
  </svg>
)}

  <div
  className={`${barlowCondensed.className} absolute bottom-[126.5px] right-[29px] z-20 select-none pointer-events-none font-bold italic leading-none`}
style={{
  fontSize: "82px",
  lineHeight: "0.85",
  color: `color-mix(in srgb, ${cardColor} 38%, transparent)`,
  WebkitTextStroke: exportMode ? "0px transparent" : "1.4px white",
  letterSpacing: "0.015em",
  transform: "skewX(-5deg) scaleX(1.04)",
  transformOrigin: "center",
  filter: exportMode
    ? "none"
    : "drop-shadow(1px 2px 1.5px rgba(0,0,0,0.82))",
}}
>
{String(athlete.jerseyNumber || athlete.number || "")
  .replace(/\D/g, "")
  .slice(0, 2)}
</div>

<div className="absolute bottom-[70px] left-1/2 z-30 w-max min-w-[218px] max-w-[265px] -translate-x-1/2">
  <div
    className="rounded-[16px] border-[2px] border-[#C5A96A] bg-black px-4 pt-[5px] pb-[4px] text-center"
style={{
  boxShadow: exportMode
    ? "none"
    : "0 3px 4px 1px rgba(0,0,0,0.52)",
}}
  >
    <div className="relative top-[-2px]">
      <p className="truncate whitespace-nowrap text-[13px] font-bold not-italic uppercase leading-[1.4] tracking-[0.09em] text-[#C5A96A]">
        {athlete.school}
      </p>

      <p
        className={`${barlowCondensed.className} mt-[-1px] truncate whitespace-nowrap text-[25px] font-bold italic uppercase leading-[0.86] tracking-[0.045em] text-white`}
      >
        {athlete.team}
      </p>
    </div>
  </div>
</div>

{/* BOTTOM NAV READABILITY */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[92px] bg-gradient-to-t from-black/70 via-black/28 to-transparent" />

<div
  className="absolute bottom-[5px] left-[7px] right-[7px] z-40 flex items-start justify-between"
  onClick={(e) => e.stopPropagation()}
>

  {/* NAV SEPARATOR LINES */}
<div className="pointer-events-none absolute left-[25%] top-[5px] h-[42px] w-px bg-[#C5A96A]/65" />

<div className="pointer-events-none absolute left-1/2 top-[5px] h-[42px] w-px -translate-x-1/2 bg-[#C5A96A]/65" />

<div className="pointer-events-none absolute left-[75%] top-[5px] h-[42px] w-px bg-[#C5A96A]/65" />

{renderCardNavigation("front")}
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
<div
  ref={backExportRef}
  className="relative h-full w-full rounded-[20px] bg-white p-[5px]"
  style={{
    boxShadow: exportMode
      ? "none"
      : "0 14px 38px rgba(0,0,0,0.62)",
  }}
>
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-[#242424] text-white">

{/* BACK STADIUM ATMOSPHERE */}
<div className="pointer-events-none absolute inset-0 z-0">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url("/card-backgrounds/stadium-athlete-2.png")`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      filter: "grayscale(1) brightness(0.65) contrast(1.06)",
      opacity: 0.52,
    }}
  />

  {/* Darker center, brighter vertical sides */}
  <div
    className="absolute inset-0"
    style={{
background:
  "linear-gradient(to right, rgba(0,0,0,0.00) 0%, rgba(42,42,42,0.08) 7%, rgba(42,42,42,0.18) 16%, rgba(42,42,42,0.30) 23%, rgba(42,42,42,0.44) 28%, rgba(42,42,42,0.60) 33%, rgba(42,42,42,0.76) 36%, rgba(42,42,42,0.90) 41%, rgba(42,42,42,0.97) 46%, rgba(42,42,42,0.995) 52%, rgba(42,42,42,0.995) 60%, rgba(42,42,42,0.97) 64%, rgba(42,42,42,0.90) 69%, rgba(42,42,42,0.76) 75%, rgba(42,42,42,0.60) 81%, rgba(42,42,42,0.44) 86%, rgba(42,42,42,0.30) 89%, rgba(42,42,42,0.18) 92%, rgba(42,42,42,0.08) 97%, rgba(0,0,0,0.00) 100%)",
    }}
  />

  {/* Bottom readability */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(to bottom, rgba(20,20,20,0.08) 0%, rgba(24,24,24,0.18) 58%, rgba(16,16,16,0.52) 100%)",
    }}
  />
</div>

{/* ALL BACK CONTENT */}
<div className="relative z-10 flex h-full w-full flex-col">

  <div className="relative px-0 pt-[10px]">
<div className="absolute right-[-2px] top-[-2px] z-40 flex h-12 w-12 items-center justify-center overflow-visible">
                        <img
                          src="/logo-bw.png"
                          alt="jocdocs logo"
                          className="h-[58%] w-[58%] object-contain"
                        />
                      </div>

<div
  className={`absolute left-1/2 top-[8px] z-30 w-max min-w-[170px] max-w-[270px] -translate-x-1/2 rounded-[22px] border-[2px] border-[#C5A96A] bg-white px-5 pt-[4px] pb-[2px] ${
    exportMode ? "" : "shadow-[0_3px_5px_1px_rgba(0,0,0,0.62)]"
  }`}
>
  <div className="relative top-[-2px]">
    <p
      className={`${barlowCondensed.className} whitespace-nowrap text-center text-[17px] font-bold italic leading-[1] tracking-[0.01em] text-black`}
    >
      {firstName}
    </p>

    <h2
      className={`${barlowCondensed.className} mt-[-1px] truncate whitespace-nowrap overflow-hidden text-center text-[30px] font-black italic uppercase leading-[0.84] tracking-[0.01em] text-black`}
    >
      {lastName || firstName}
    </h2>
  </div>
</div>
                    </div>

                    <div className="px-5 pt-[57px]">
                      <div className="flex gap-[10px]">
                        <div
  className={`h-[112px] w-[106px] shrink-0 overflow-hidden rounded-[15px] border-[1.5px] border-white bg-neutral-300 ${
    exportMode ? "" : "shadow-md"
  }`}
>
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

                          <p className="my-[2px] truncate whitespace-nowrap overflow-hidden text-[17px] font-medium italic leading-[1.0] text-white/90">
  {athlete.position}
</p>

                          <p
  className={`text-[53px] font-extrabold italic leading-[0.84] text-white ${
    exportMode ? "" : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
  }`}
>
                            <span className="relative -top-[17px] mr-[1px] text-[27px] font-normal italic">
                              #
                            </span>
                            {athlete.jerseyNumber}
                          </p>
                        </div>
                      </div>

                      <div
  className={`mt-[3px] max-w-full overflow-hidden truncate whitespace-nowrap pl-[1px] text-[42px] leading-none text-white/65 ${allison.className}`}
>
  {signatureName}
</div>

                      <div className="mt-[6px] space-y-[2px] text-[14.5px] leading-tight text-white">
<p>
  Age:{" "}
  <span className="font-bold text-[#C5A96A]">{age}</span>
  &nbsp;&nbsp; Height:{" "}
  <span className="font-bold text-[#C5A96A]">
    {athlete.height || "—"}
  </span>
  &nbsp;&nbsp; Weight:{" "}
  <span className="font-bold text-[#C5A96A]">
    {athlete.weight || "—"}
  </span>
</p>

                        <p className="truncate whitespace-nowrap overflow-hidden">
  Hometown:{" "}
<span className="font-bold text-[#C5A96A]">
  {athlete.hometown || "—"}
</span>
</p>

<p className="truncate whitespace-nowrap">
                          <span className="font-normal">Sport:
                          </span>{" "}
<span className="font-bold text-[#C5A96A]">
  {athlete.primarySport || "—"}
</span>
                          {otherSports.length > 0 && (
                            <>
                              {" "}
                              <span className="font-normal">Other:</span>{" "}
<span className="font-bold text-[#C5A96A]">
  {otherSports.join(", ")}
</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mx-5 my-[4.5px] h-[1px] bg-white/25" />

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
className={`min-w-0 w-[75px] shrink-0 rounded-xl border border-white/20 bg-white/5 px-2 py-[4px] text-center ${
  exportMode ? "" : "shadow-sm"
}`}
>
<div className="truncate text-[19px] font-extrabold italic leading-none text-[#C5A96A]">
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
                              className="block truncate rounded-lg border border-white/15 bg-white/5 px-3 py-[3px] text-[#C5A96A]"
                            >
                              {link}
                            </a>
                          ) : (
<div
  key={index}
  className="block truncate rounded-lg border border-white/10 bg-white/5 px-3 py-[3px] text-white/60 italic"
>
  <span className="relative top-[1px]">
    {`Add Link ${index + 1}`}
  </span>
</div>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="mt-auto px-4 pb-1.5 pt-[8px]"
                      onClick={(e) => e.stopPropagation()}
                    >
<div className="relative flex items-start justify-between">

  {/* NAV SEPARATOR LINES */}
  <div className="pointer-events-none absolute left-[25%] top-[5px] h-[42px] w-px bg-white/25" />

  <div className="pointer-events-none absolute left-1/2 top-[5px] h-[42px] w-px -translate-x-1/2 bg-white/25" />

  <div className="pointer-events-none absolute left-[75%] top-[5px] h-[42px] w-px bg-white/25" />

{renderCardNavigation("back")}
</div>
                    </div>

                    {/* CLOSE ALL BACK CONTENT */}
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