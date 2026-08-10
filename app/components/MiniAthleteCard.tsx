"use client";

import type { Athlete } from "../data/athletes";

interface MiniAthleteCardProps {
  athlete: Athlete;
  onClick?: () => void;
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

export default function MiniAthleteCard({
  athlete,
  onClick,
}: MiniAthleteCardProps) {
  const themeColor =
    themeColors[athlete.theme || "gold"] || themeColors.gold;

  const nameParts = athlete.name?.trim().split(/\s+/) || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const imageSrc = athlete.actionImage || athlete.image || "";
  const school = athlete.school || "";
  const sport = athlete.primarySport || "";

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left transition hover:scale-[1.02]"
    >
      <div className="rounded-[20px] bg-white p-[4px] shadow-[0_8px_20px_rgba(0,0,0,0.45)] md:rounded-[24px] md:p-[5px]">
        <div
          className="overflow-hidden rounded-[16px] md:rounded-[19px]"
          style={{ backgroundColor: themeColor }}
        >
          {/* NAME */}
          <div
            className="
              relative
              z-20
              -mb-3
              ml-0
              mr-5
              mt-2
              rounded-r-full
              bg-white
              px-2
              pb-[4px]
              pt-[3px]
              text-center
              md:-mb-4
              md:mt-3
              md:px-3
              md:pb-1
              md:pt-1
            "
          >
            <div className="text-[15px] font-semibold italic leading-[1.05] text-black md:text-[18px] lg:text-[20px]">
              {firstName}
            </div>

            <div className="text-[24px] font-black uppercase italic leading-[0.88] text-black md:text-[28px] lg:text-[32px]">
              {lastName}
            </div>
          </div>

          {/* IMAGE */}
          <div className="px-[8px] pt-1 md:px-[10px] md:pt-1.5">
            <div className="aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white bg-black/15 md:rounded-xl">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={athlete.name || "Athlete"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* SCHOOL */}
          <div className="relative z-20 -mt-5 pl-2 pr-0 md:-mt-6 md:pl-5">
            <div
              title={school}
              className="
                ml-auto
                max-w-[92%]
                overflow-hidden
                text-ellipsis
                whitespace-nowrap
                rounded-l-full
                bg-black
                py-[6px]
                pl-5
                pr-3
                text-left
                text-[14px]
                font-medium
                text-white
                md:max-w-[94%]
                md:py-[7px]
                md:pl-6
                md:pr-4
                md:text-[16px]
                lg:text-[17px]
              "
            >
              {school || "\u00A0"}
            </div>
          </div>

          {/* SPORT */}
          <div
            className="
              px-3
              pb-2
              pt-1
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
            {sport}
          </div>
        </div>
      </div>
    </button>
  );
}