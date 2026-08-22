"use client";

import {
  Bookmark,
  Share2,
  Star,
} from "lucide-react";
import { frederickSans } from "../../fonts";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type FanTicketProps = {
  fanId?: string;
  name?: string;
  photo?: string;
  collectedCount?: number;
  createdAt?: string;
};

export default function FanTicket({
  fanId,
  name = "Your Name",
  photo = "",
  collectedCount = 0,
  createdAt,
}: FanTicketProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

const source = searchParams.get("source");
const fansAthleteId = searchParams.get("fansAthleteId");

const handleOpenCollection = () => {
  const params = new URLSearchParams();

  params.set("from", "fan");

  if (fanId) {
    params.set("returnFanId", fanId);
  }

  if (source) {
    params.set("returnSource", source);
  }

  if (fansAthleteId) {
    params.set("fansAthleteId", fansAthleteId);
  }

  router.push(`/collection?${params.toString()}`);
};

  const memberSince = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})
  .format(createdAt ? new Date(createdAt) : new Date())
  .toUpperCase();
  /*
    LOCKED SHELL — DO NOT CHANGE

    Card: 310 × 530
  Gold border: 7px
  Perforation and side-cut center: y = 445
*/

  const ticketShape = `
  M 32 3.5

  H 278
  A 28.5 28.5 0 0 0 306.5 32

  V 425

  Q 286.5 425 286.5 445
  Q 286.5 465 306.5 465

  V 498

  A 28.5 28.5 0 0 0 278 526.5

  H 32

  A 28.5 28.5 0 0 0 3.5 498

  V 465

  Q 23.5 465 23.5 445
  Q 23.5 425 3.5 425

  V 32

  A 28.5 28.5 0 0 0 32 3.5

  Z
`;

  const nameLength = name.trim().length;

const nameSize =
  nameLength <= 16
    ? "text-[43px]"
    : nameLength <= 22
    ? "text-[39px]"
    : nameLength <= 28
    ? "text-[35px]"
    : "text-[31px]";

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      style={{
        fontFamily: '"Roboto Condensed", Roboto, sans-serif',
      }}
    >
{/* RESPONSIVE FAN TICKET STAGE */}
<div className="relative aspect-[310/530] w-full">

        {/* SAME FIXED CARD SIZE AS ATHLETE CARD */}
<div
  className="absolute left-1/2 top-0"
  style={{
    width: "310px",
    height: "530px",
    transform: "translateX(-50%)",
    transformOrigin: "top center",
  }}
>

          {/* LOCKED TICKET SHELL */}
          <svg
            viewBox="0 0 310 530"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
            preserveAspectRatio="none"
            style={{
  filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.42))",
}}
          >
<defs>
  <clipPath id="fanTicketClip">
    <path d={ticketShape} />
  </clipPath>
</defs>

{/* SIMPLE BASE BEHIND STADIUM */}
<path
  d={ticketShape}
  fill="#050505"
  stroke="none"
/>

{/* NEW STADIUM BACKGROUND */}
<g clipPath="url(#fanTicketClip)">
  <image
    href="/fan-ticket/stadium-fan-ticket.png"
    x="-10"
    y="25"
    width="330"
    height="470"
    preserveAspectRatio="xMidYMid slice"
    opacity="1"
  />

  {/* SUBTLE GOLD ATMOSPHERE */}
  <rect
    x="0"
    y="0"
    width="310"
    height="445"
    fill="#C5A96A"
    opacity="0.20"
  />
</g>

{/* LOWER WHITE ACTION AREA */}
<rect
  x="0"
  y="445"
  width="310"
  height="85"
  fill="#FCF8EE"
  clipPath="url(#fanTicketClip)"
/>

{/* PERFORATION */}
<line
  x1="27"
  y1="445"
  x2="283"
  y2="445"
  stroke="rgba(0,0,0,0.42)"
  strokeWidth="2.2"
  strokeDasharray="6 5"
  vectorEffect="non-scaling-stroke"
/>

{/* GOLD INNER RULE */}
<path
  d={ticketShape}
  fill="none"
  stroke="#C5A96A"
  strokeWidth="17"
  strokeLinejoin="round"
  vectorEffect="non-scaling-stroke"
  clipPath="url(#fanTicketClip)"
/>

{/* WHITE FRAME */}
<path
  d={ticketShape}
  fill="none"
  stroke="#FFFFFF"
  strokeWidth="12"
  strokeLinejoin="round"
  vectorEffect="non-scaling-stroke"
  clipPath="url(#fanTicketClip)"
/>
          </svg>

          {/* BRANDING SECTION */}
          <header className="absolute left-[22px] right-[22px] top-[18px] z-20 text-center">
            <div className="mx-auto w-[175px]">
              <Image
                src="/jocdocs-logo-full-light-2.png"
                alt="jocdocs"
                width={320}
                height={110}
                priority
                className="h-auto w-full"
              />
            </div>

            {/* THIN BRANDING DIVIDER */}
            <div className="mx-auto mt-[6px] h-px w-[92%] bg-[#C5A96A]/60" />
          </header>

          {/* FAN TICKET TITLE */}
<div className="absolute left-[20px] right-[20px] top-[83px] z-10 text-center">
  <h2
    className={`${frederickSans.className} whitespace-nowrap text-[50px] leading-[0.88] tracking-[0.025em] text-white`}
  >
    FAN TICKET
  </h2>

  {/* OFFICIAL MEMBER */}
  <div className="mt-[-11px] text-center text-[#C5A96A]">
    <div className="inline-flex items-center justify-center gap-[6px]">
      <Star
        size={7}
        strokeWidth={1.8}
        fill="currentColor"
        className="shrink-0 opacity-60"
        aria-hidden="true"
      />

      <p className="whitespace-nowrap text-[11.5px] font-bold uppercase leading-none tracking-[0.24em]">
        OFFICIAL MEMBER
      </p>

      <Star
        size={8}
        strokeWidth={1.8}
        fill="currentColor"
        className="shrink-0 opacity-60"
        aria-hidden="true"
      />
    </div>
  </div>
</div>

{/* PROFILE PHOTO */}
<div className="absolute left-1/2 top-[147.5px] z-10 -translate-x-1/2">
  <div className="rounded-full border-[2px] border-[#C5A96A] bg-[#C5A96A]">
    <div className="rounded-full border-[4px] border-white shadow-[0_6px_15px_rgba(0,0,0,0.66)]">
      <div className="h-[145px] w-[145px] overflow-hidden rounded-full bg-black/35">
        {photo ? (
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/55">
            Profile Photo
          </div>
        )}
      </div>
    </div>
  </div>
</div>

{/* FAN IDENTITY */}
<div className="absolute left-[14px] right-[14px] top-[317px] z-10 text-center">
  <h3
    className={`
      ${frederickSans.className}
      ${nameSize}
      overflow-hidden
      text-ellipsis
      whitespace-nowrap
      text-center
      leading-[0.88]
      tracking-[0.002em]
      text-black
    `}
  >
    {name}
  </h3>

  <div className="mt-[-2px] flex items-center justify-center gap-[7px]">
    <span className="h-px w-[23px] bg-[#C5A96A]" />

    <p className="whitespace-nowrap text-[8px] font-bold uppercase leading-none tracking-[0.10em] text-black/55">
      Member Since{" "}
      <span className="relative -top-[-0.5px] text-[9.5px] tracking-normal text-black">
  {memberSince}
</span>
    </p>

    <span className="h-px w-[23px] bg-[#C5A96A]" />
  </div>
</div>

{/* MY COLLECTION BUTTON */}
<button
  type="button"
  onClick={handleOpenCollection}
  className="absolute left-[41px] right-[41px] top-[371px] z-20 h-[61px] rounded-[17px] border-[2px] border-[#C5A96A] bg-black px-[8px] text-white"
>
  <span className="flex h-full items-center justify-center">
    {/* COLLECTION ICON */}
    <span className="flex h-[42px] w-[46px] shrink-0 items-center justify-center">
      <img
        src="/icons/gold-cards-icon.png"
        alt=""
        aria-hidden="true"
        className="h-[34px] w-[34px] object-contain opacity-90"
      />
    </span>

    {/* DIVIDER */}
    <span
      aria-hidden="true"
      className="ml-[3px] mr-[10px] h-[39px] w-px shrink-0 bg-[#C5A96A]/55"
    />

    {/* BUTTON TYPOGRAPHY */}
    <span className="relative top-[2.7px] min-w-0 flex-1 text-left">
      <span
        className={`${frederickSans.className} block whitespace-nowrap text-[30.5px] leading-[0.70] tracking-[0.027em] text-white`}
      >
        MY COLLECTION
      </span>

<span className="mt-[2.5px] block whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-[0.14em] text-[#C5A96A]">
  View My Athlete Cards
</span>
    </span>
  </span>
</button>

{/* ACTION BUTTONS */}
<footer className="absolute bottom-[18px] left-[50px] right-[50px] z-20 flex items-start justify-between text-black">

  {/* CENTER SEPARATOR — same height/position as Athlete Card */}
  <div className="pointer-events-none absolute left-1/2 top-[5px] h-[42px] w-px -translate-x-1/2 bg-[#C5A96A]/65" />

  {/* COLLECTION ACTION */}
  <button
    type="button"
    aria-label={`View ${collectedCount} collected athlete cards`}
    onClick={handleOpenCollection}
    className="flex w-[70px] flex-col items-center gap-1"
  >
    <span className="relative top-[-1px] flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#C5A96A] bg-black text-white shadow-[0_2px_3px_rgba(0,0,0,0.48)]">
      <Bookmark size={21} strokeWidth={2} />

      {collectedCount > 0 && (
        <span className="absolute -right-[8px] -top-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c51f24] px-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.72)]">
          <span className="relative top-[1px] text-[9px] font-bold leading-none text-white">
            {collectedCount}
          </span>
        </span>
      )}
    </span>

<span className="text-[10px] font-medium not-italic uppercase leading-none text-black/55">
  Collected
</span>
  </button>

  {/* SHARE ACTION */}
  <button
    type="button"
    aria-label="Share Fan Ticket"
    className="flex w-[70px] flex-col items-center gap-1"
  >
    <span className="relative top-[-1px] flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-[#C5A96A] bg-black text-white shadow-[0_2px_3px_rgba(0,0,0,0.48)]">
      <Share2 size={21} strokeWidth={2} />
    </span>

<span className="text-[10px] font-medium not-italic uppercase leading-none text-black/55">
  Share
</span>
  </button>

</footer>

        </div>
      </div>
    </div>
  );
}
