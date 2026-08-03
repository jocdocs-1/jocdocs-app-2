"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import { frederickSans } from "./fonts";

const featuredCards = [
  { src: "/featured-cards/track.png", alt: "Featured track athlete card" },
  { src: "/featured-cards/soccer.png", alt: "Featured soccer athlete card" },
  {
    src: "/featured-cards/football.png",
    alt: "Featured football athlete card",
  },
  { src: "/featured-cards/tennis.png", alt: "Featured tennis athlete card" },
  {
    src: "/featured-cards/baseball.png",
    alt: "Featured baseball athlete card",
  },
  {
    src: "/featured-cards/basketball.png",
    alt: "Featured basketball athlete card",
  },
];

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);

  const [selectedCard, setSelectedCard] = useState<null | {
    src: string;
    alt: string;
  }>(null);

  useEffect(() => {
    const flipToBack = window.setTimeout(() => {
      setIsFlipped(true);
    }, 1400);

    const flipToFront = window.setTimeout(() => {
      setIsFlipped(false);
    }, 6200);

    return () => {
      window.clearTimeout(flipToBack);
      window.clearTimeout(flipToFront);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex w-full max-w-[430px] flex-col items-center px-5 pb-6 pt-7">
        {/* LOGO */}
        <div className="w-[292px] max-w-full">
  <Image
    src="/jocdocs-logo-full-v2.png"
    alt="jocdocs"
    width={320}
    height={110}
    priority
    className="h-auto w-full"
  />

  {/* Centered beneath the JOCDOCS typography, excluding the badge */}
  <p className="ml-[65px] mt-[-4px] text-center text-[19px] font-normal leading-none tracking-[-0.01em] text-black">
    Create. Collect. Connect.
  </p>
</div>

        {/* FEATURED ATHLETE HEADING */}
        <div className="mt-7 text-center">
          <p
  className={`${frederickSans.className} text-[50px] leading-none tracking-[0.025em] text-[#C9AD68]`}
>
  FEATURED ATHLETE
</p>
        </div>

        {/* HERO FLIP CARD */}
        <button
          type="button"
          onClick={() => setIsFlipped((current) => !current)}
          className="relative mt-0 h-[640px] w-[378px] max-w-[calc(100vw-32px)] cursor-pointer [perspective:1200px]"
          aria-label="Tap to flip featured athlete card"
        >
          <div
            className={`relative h-full w-full transition-transform duration-[3000ms] ease-[cubic-bezier(.22,1,.36,1)] [transform-style:preserve-3d] ${
              isFlipped
                ? "[transform:rotateY(-180deg)]"
                : "[transform:rotateY(0deg)]"
            }`}
          >
            {/* FRONT */}
            <div className="absolute inset-0 overflow-hidden rounded-[28px] drop-shadow-[0_10px_14px_rgba(0,0,0,0.34)] [backface-visibility:hidden]">
              <Image
                src="/hero-cards/bdavie-front.png"
                alt="Featured athlete card front"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 378px"
                className="object-contain"
              />
            </div>

            {/* BACK */}
            <div className="absolute inset-0 overflow-hidden rounded-[28px] drop-shadow-[0_10px_14px_rgba(0,0,0,0.34)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src="/hero-cards/bdavie-back.png"
                alt="Featured athlete card back"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 378px"
                className="object-contain"
              />
            </div>

            {/* SHIMMER */}
            <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-[28px]">
              <div className="hero-shimmer absolute inset-y-0 -left-1/2 w-[42%]" />
            </div>
          </div>
        </button>

        <p className="mt-2 text-[13px] italic text-black/45">
          Tap card to flip
        </p>

        <button
          type="button"
          onClick={() => setShowFeatured(true)}
          className="mt-3 text-[17px] italic underline decoration-[#C9AD68] underline-offset-4"
        >
          See More Featured Cards
        </button>

        {/* COMMUNITY SECTION */}
        <section className="mt-8 w-full">
          <div className="text-center">
            <h1
  className={`${frederickSans.className} text-[58px] leading-[0.88] tracking-[0.025em] text-black`}
>
  JOIN THE
  <br />
  <span className="text-[#C9AD68]">JOCDOCS COMMUNITY</span>
</h1>

<p className="mx-auto mt-0 max-w-[330px] text-[17px] leading-[1.2] text-black/65">
  Create your sports identity, discover athletes and become part
  of the jocdocs community.
</p>
          </div>

          {/* ATHLETE INVITATION */}
          <Link
            href="/create"
            className="group relative mt-8 block overflow-hidden rounded-[25px] border-2 border-[#C9AD68] bg-black px-5 py-5 text-white shadow-[0_10px_22px_rgba(0,0,0,0.20)] transition duration-200 active:translate-y-[2px] active:shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
          >
            <div className="text-center">
              <p
                className={`${frederickSans.className} text-[38px] leading-none tracking-[0.04em] text-[#C9AD68]`}
              >
                ATHLETES
              </p>

              <h2
  className={`${frederickSans.className} mt-2 whitespace-nowrap text-[46px] leading-none tracking-[0.015em]`}
>
  CREATE MY ATHLETE CARD
</h2>

              <p className="mt-2 text-[17px] leading-tight text-white/75">
                Showcase your athletic career.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-4 right-5 text-[24px] text-[#C9AD68] transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          {/* SPORTS FAN INVITATION */}
          <Link
  href="/create-fan"
  className="group relative mt-5 block overflow-hidden rounded-[25px] border-2 border-[#C9AD68] bg-black px-5 py-5 text-white shadow-[0_10px_22px_rgba(0,0,0,0.20)] transition duration-200 active:translate-y-[2px] active:shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
>

            <div className="text-center">
              <p
                className={`${frederickSans.className} text-[38px] leading-none tracking-[0.04em] text-[#C9AD68]`}
              >
                FANS
              </p>

              <h2
  className={`${frederickSans.className} mt-2 whitespace-nowrap text-[46px] leading-none tracking-[0.015em]`}
>
  CLAIM MY FAN TICKET
</h2>

              <p className="mt-2 text-[17px] leading-tight text-white/75">
                Collect and follow your favorite athletes.
              </p>
            </div>
          <span
  aria-hidden="true"
  className="absolute bottom-4 right-5 text-[24px] text-[#C9AD68] transition-transform group-hover:translate-x-1"
>
  →
</span>

</Link>

          {/* EVERYONE INVITATION */}
          <Link
            href="/explore"
            className="group relative mt-5 block overflow-hidden rounded-[25px] border-2 border-[#C9AD68] bg-black px-5 py-5 text-white shadow-[0_10px_22px_rgba(0,0,0,0.20)] transition duration-200 active:translate-y-[2px] active:shadow-[0_5px_12px_rgba(0,0,0,0.18)]"
          >
            <div className="text-center">
              <p
                className={`${frederickSans.className} text-[38px] leading-none tracking-[0.04em] text-[#C9AD68]`}
              >
                EVERYONE
              </p>

              <h2
  className={`${frederickSans.className} mt-2 whitespace-nowrap text-[46px] leading-none tracking-[0.015em]`}
>
  EXPLORE ATHLETES
</h2>

              <p className="mt-2 text-[17px] leading-tight text-white/75">
                Discover athletes from every sport.
              </p>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-4 right-5 text-[24px] text-[#C9AD68] transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </section>

        {/* EXISTING MEMBERS */}
        <section className="mt-9 w-full border-t border-black/10 pt-7 text-center">

          <div>
            <p className="text-[16px] text-black/60">
              Already have an Athlete Card?
            </p>

            <Link
              href="/my-cards"
              className="mt-2 inline-flex min-h-[48px] w-full max-w-[315px] items-center justify-center rounded-full border-2 border-[#C9AD68] bg-white px-6 py-3 text-[18px] font-bold text-[#A98B43] transition active:scale-[0.98]"
            >
              Manage My Cards
            </Link>
          </div>

          <div className="mt-7">
            <p className="text-[16px] text-black/60">
              Already have a Fan Ticket?
            </p>

            <div
              aria-disabled="true"
              className="mt-2 inline-flex min-h-[48px] w-full max-w-[315px] items-center justify-center rounded-full border-2 border-black/15 bg-black/[0.04] px-6 py-3 text-[18px] font-bold text-black/35"
            >
              Manage My Ticket — Coming Soon
            </div>
          </div>
        </section>
      </section>

      {/* SLIDE-UP FEATURED CARDS PANEL */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] transform rounded-t-[28px] bg-white px-5 pb-8 pt-5 shadow-[0_-14px_34px_rgba(0,0,0,0.22)] transition-transform duration-500 ease-out ${
          showFeatured ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setShowFeatured(false)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-[#C9AD68]/20 text-[22px] font-semibold leading-none text-black/70"
          aria-label="Close featured cards"
        >
          ×
        </button>

        <div className="pr-12 text-center">
          <h2
            className={`${frederickSans.className} text-[29px] leading-none tracking-[0.03em]`}
          >
            FEATURED CARDS
          </h2>

          <p className="mt-2 text-[15px] text-black/55">
            Swipe to scroll. Tap a card to open it.
          </p>
        </div>

        <div className="-mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredCards.map((card) => (
            <button
              key={card.src}
              type="button"
              onClick={() => setSelectedCard(card)}
              className="w-[155px] shrink-0 snap-center overflow-hidden rounded-[20px] bg-white shadow-[0_10px_22px_rgba(0,0,0,0.22)] transition active:scale-[0.98]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={330}
                height={520}
                className="h-auto w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED CARD PREVIEW */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm"
          onClick={() => setSelectedCard(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedCard(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[24px] text-black shadow-md"
            aria-label="Close preview"
          >
            ×
          </button>

          <div
            className="relative w-full max-w-[360px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedCard.src}
              alt={selectedCard.alt}
              width={720}
              height={1230}
              className="h-auto w-full rounded-[28px] shadow-2xl"
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}