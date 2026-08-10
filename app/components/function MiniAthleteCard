"use client";

import type { Athlete } from "../data/athletes";

interface MiniAthleteCardProps {
  athlete: Athlete;
  onClick?: () => void;
}

export default function MiniAthleteCard({
  athlete,
  onClick,
}: MiniAthleteCardProps) {
  const imageSrc = athlete.actionImage || athlete.image || "";
  const name = athlete.name || "Unnamed Athlete";
  const sport = athlete.primarySport || "Sport";
  const position = athlete.position || "Position";
  const nameParts = (name || "").trim().split(/\s+/);
const firstName = nameParts[0] || "";
const lastName = nameParts.slice(1).join(" ");

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left"
    >
      <div className="w-full overflow-hidden rounded-[16px] border border-yellow-300/50 bg-gradient-to-b from-zinc-900 via-black to-yellow-950/20 shadow-lg transition-transform duration-200 hover:-translate-y-1">
  <div className="px-2 pt-2">
    <div className="rounded-md bg-black/60 px-2 py-[2px]">
      <p className="text-left text-[13px] font-extrabold uppercase leading-[1.15] tracking-[0.06em] text-zinc-300">
        <span className="block truncate">{firstName || name}</span>
        {lastName ? (
          <span className="block truncate">{lastName}</span>
        ) : null}
      </p>
    </div>
  </div>

  <div className="px-2 pt-1.5">
    <div className="aspect-[2.5/3] overflow-hidden rounded-[12px] border border-white/10 bg-zinc-800">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">
          No Image
        </div>
      )}
    </div>
  </div>

  <div className="px-2 pb-2 pt-1">
    <div className="rounded-md bg-black/60 px-2 py-1">
      <p className="truncate text-[12px] font-bold uppercase leading-[1.05] tracking-[0.08em] text-zinc-400">
        {sport}
      </p>
      <p className="truncate text-[11px] font-medium leading-[1.05] text-zinc-400">
        {position}
      </p>
    </div>
  </div>
</div>
    </button>
  );
}