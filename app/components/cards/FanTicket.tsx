"use client";

import {
  Bookmark,
  Share2,
  Star,
} from "lucide-react";
import { frederickSans } from "../../fonts";
import Image from "next/image";
import { useRouter } from "next/navigation";

type FanTicketProps = {
  name?: string;
  photo?: string;
  collectedCount?: number;
  createdAt?: string;
};

export default function FanTicket({
  name = "Your Name",
  photo = "",
  collectedCount = 0,
  createdAt,
}: FanTicketProps) {

  const router = useRouter();

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
      ? "text-[39px]"
      : nameLength <= 22
      ? "text-[35px]"
      : nameLength <= 28
      ? "text-[31px]"
      : "text-[28px]";

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      style={{
        fontFamily: '"Roboto Condensed", Roboto, sans-serif',
      }}
    >
      {/* SAME RESPONSIVE SPACE AS ATHLETE CARD */}
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
  {/* MAIN BACKGROUND GRADIENT */}
  <linearGradient
    id="fanTicketGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >
    <stop offset="0%" stopColor="#000000" />
    <stop offset="35%" stopColor="#060606" />
    <stop offset="50%" stopColor="#18150F" />
    <stop offset="61%" stopColor="#5B4A28" />
    <stop offset="70%" stopColor="#A98B4F" />
    <stop offset="78%" stopColor="#D9C79B" />
    <stop offset="84%" stopColor="#F5EEE1" />
    <stop offset="88%" stopColor="#FFFFFF" />
    <stop offset="100%" stopColor="#FFFFFF" />
  </linearGradient>

  {/* GOLD MEZZOTINT */}
  <pattern
    id="fanTicketMezzotint"
    width="8"
    height="8"
    patternUnits="userSpaceOnUse"
  >
    <circle
      cx="1.5"
      cy="1.5"
      r="0.65"
      fill="#C5A96A"
      opacity="0.22"
    />

    <circle
      cx="6"
      cy="4"
      r="0.45"
      fill="#ffffff"
      opacity="0.10"
    />

    <circle
      cx="3.5"
      cy="7"
      r="0.35"
      fill="#C5A96A"
      opacity="0.15"
    />
  </pattern>

  {/* LEFT LIGHT */}
  <radialGradient id="leftLight">
    <stop offset="0%" stopColor="#ffffff" stopOpacity=".70" />
    <stop offset="25%" stopColor="#fff5d5" stopOpacity=".34" />
    <stop offset="60%" stopColor="#C5A96A" stopOpacity=".10" />
    <stop offset="100%" stopColor="#C5A96A" stopOpacity="0" />
  </radialGradient>

  {/* RIGHT LIGHT */}
<radialGradient id="rightLight">
  <stop offset="0%" stopColor="#ffffff" stopOpacity=".70" />
  <stop offset="25%" stopColor="#fff5d5" stopOpacity=".34" />
  <stop offset="60%" stopColor="#C5A96A" stopOpacity=".10" />
  <stop offset="100%" stopColor="#C5A96A" stopOpacity="0" />
</radialGradient>

{/* STADIUM-TO-WHITE TRANSITION */}
<linearGradient
  id="ticketWhiteFade"
  x1="0"
  y1="0"
  x2="0"
  y2="1"
>
  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.15" />
  <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.55" />
  <stop offset="74%" stopColor="#FFFFFF" stopOpacity="0.9" />
  <stop offset="84%" stopColor="#FFFFFF" stopOpacity="1" />
  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
</linearGradient>

<clipPath id="fanTicketClip">
  <path d={ticketShape} />
</clipPath>
</defs>

{/* SLIM WHITE OUTER SILHOUETTE */}
<path
  d={ticketShape}
  fill="none"
  stroke="#FFFFFF"
  strokeWidth="11"
  strokeLinejoin="round"
  vectorEffect="non-scaling-stroke"
/>

{/* BACKGROUND */}
<path
  d={ticketShape}
  fill="url(#fanTicketGradient)"
  stroke="#C5A96A"
  strokeWidth="7"
  strokeLinejoin="round"
  vectorEffect="non-scaling-stroke"
/>

{/* STADIUM BACKGROUND IMAGE */}
<g clipPath="url(#fanTicketClip)">
  <image
    href="/fan-ticket/fan-ticket-stadium-bg.png"
    x="0"
    y="80"
    width="310"
    height="327"
    preserveAspectRatio="xMidYMid slice"
    opacity="0.92"
  />

  {/* FADE THE STADIUM TO WHITE */}
  <rect
    x="0"
    y="315"
    width="310"
    height="115"
    fill="url(#ticketWhiteFade)"
  />

  {/* PURE WHITE AREA BEFORE PERFORATION */}
  <rect
    x="0"
    y="420"
    width="310"
    height="25"
    fill="#ffffff"
  />
</g>

{/* LOWER WHITE ACTION AREA */}
<rect
  x="0"
  y="445"
  width="310"
  height="85"
  fill="#ffffff"
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

            {/* LOCKED GOLD OUTLINE */}
            <path
              d={ticketShape}
              fill="none"
              stroke="#C5A96A"
              strokeWidth="7"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* BRANDING SECTION */}
          <header className="absolute left-[22px] right-[22px] top-[11px] z-20 text-center">
            <div className="mx-auto w-[175px]">
              <Image
                src="/jocdocs-logo-full-light-2.png"
                alt="jocdocs"
                width={320}
                height={110}
                priority
                className="h-auto w-full"
              />

              {/* CENTERED BENEATH JOCDOCS TYPOGRAPHY */}
              <p className="ml-[39px] mt-[-3.7px] whitespace-nowrap text-center text-[10.4px] font-normal leading-none tracking-[0.01em] text-[#C5A96A]">
                Create. Collect. Connect.
              </p>
            </div>

            {/* THIN BRANDING DIVIDER */}
            <div className="mt-[7px] h-px w-full bg-[#C5A96A]/60" />
          </header>

          {/* FAN TICKET TITLE */}
<div className="absolute left-[20px] right-[20px] top-[87px] z-10 text-center">
  <h2
    className={`${frederickSans.className} whitespace-nowrap text-[58px] leading-[0.88] tracking-[0.025em] text-white`}
  >
    FAN TICKET
  </h2>

  {/* OFFICIAL MEMBER */}
  <div className="mt-[-8px] text-center text-[#C5A96A]">
    <div className="inline-flex items-center justify-center gap-[6px]">
      <Star
        size={8}
        strokeWidth={1.8}
        fill="currentColor"
        className="shrink-0 opacity-60"
        aria-hidden="true"
      />

      <p className="whitespace-nowrap text-[12px] font-bold uppercase leading-none tracking-[0.24em]">
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
<div className="absolute left-1/2 top-[158px] z-10 -translate-x-1/2">
  <div className="rounded-full border-[2px] border-[#C5A96A] bg-[#C5A96A]">
    <div className="rounded-full border-[4px] border-white shadow-[0_8px_18px_rgba(0,0,0,0.38)]">
      <div className="h-[132px] w-[132px] overflow-hidden rounded-full bg-black/35">
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

  <div className="mt-[1px] flex items-center justify-center gap-[7px]">
    <span className="h-px w-[23px] bg-[#C5A96A]" />

    <p className="whitespace-nowrap text-[8px] font-bold uppercase leading-none tracking-[0.16em] text-black/55">
      Member Since{" "}
      <span className="relative -top-[-0.5px] text-[10px] tracking-normal text-black">
  {memberSince}
</span>
    </p>

    <span className="h-px w-[23px] bg-[#C5A96A]" />
  </div>
</div>

{/* MY COLLECTION BUTTON */}
<button
  type="button"
  onClick={() => router.push("/collection?from=fan")}
  className="absolute left-[36px] right-[36px] top-[370px] z-20 h-[62px] rounded-[17px] border-[2px] border-[#C5A96A] bg-black px-[10px] text-white"
>
  <span className="flex h-full items-center">
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
      className="ml-[3px] mr-[14px] h-[39px] w-px shrink-0 bg-[#C5A96A]/55"
    />

    {/* BUTTON TYPOGRAPHY */}
    <span className="relative top-[2.7px] min-w-0 flex-1 text-left">
      <span
        className={`${frederickSans.className} block whitespace-nowrap text-[30.5px] leading-[0.70] tracking-[0.027em] text-white`}
      >
        MY COLLECTION
      </span>

      <span className="mt-[3px] block whitespace-nowrap text-[9px] font-bold uppercase leading-none tracking-[0.17em] text-[#C5A96A]">
        View My Athlete Cards
      </span>
    </span>
  </span>
</button>

          {/* ACTION BUTTONS */}
<footer className="absolute bottom-[7px] left-[50px] right-[50px] z-20 grid h-[75px] grid-cols-2 text-center text-black">
  {/* COLLECTION ACTION */}
<button
  type="button"
  aria-label={`View ${collectedCount} collected athlete cards`}
  onClick={() => router.push("/collection?from=fan")}
  className="flex flex-col items-center justify-center border-r border-black/10"
>
  <span className="flex h-[41px] w-[41px] items-center justify-center rounded-full border-[1.5px] border-[#C5A96A] bg-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)]">
    <Bookmark size={21} strokeWidth={1.9} />
  </span>

  <span className="mt-[9px] text-[9px] font-bold uppercase leading-none tracking-[0.12em] text-black/55">
    {collectedCount} Collected
  </span>
</button>

  {/* SHARE ACTION */}
  <button
    type="button"
    aria-label="Share Fan Ticket"
    className="flex flex-col items-center justify-center"
  >
    <span className="flex h-[41px] w-[41px] items-center justify-center rounded-full border-[1.5px] border-[#C5A96A] bg-black text-white shadow-[0_4px_10px_rgba(0,0,0,0.22)]">
  <Share2 size={21} strokeWidth={1.9} />
</span>

    <span className="mt-[9px] text-[9px] font-bold uppercase leading-none tracking-[0.14em] text-black/55">
      Share
    </span>
  </button>
</footer>
        </div>
      </div>
    </div>
  );
}