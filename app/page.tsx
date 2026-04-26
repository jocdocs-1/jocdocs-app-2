"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredCards = [
  { src: "/featured-cards/track.png", alt: "Featured track athlete card" },
  { src: "/featured-cards/soccer.png", alt: "Featured soccer athlete card" },
  { src: "/featured-cards/football.png", alt: "Featured football athlete card" },
  { src: "/featured-cards/tennis.png", alt: "Featured tennis athlete card" },
  { src: "/featured-cards/baseball.png", alt: "Featured baseball athlete card" },
  { src: "/featured-cards/basketball.png", alt: "Featured basketball athlete card" },
];

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);
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
  const [showFeatured, setShowFeatured] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col items-center px-5 pb-8 pt-8">
        {/* LOGO */}
        <div className="mb-2 flex flex-col items-center">
          <Image
            src="/jocdocs-logo-full.png"
            alt="jocdocs"
            width={280}
            height={95}
            priority
            className="h-auto w-[245px]"
          />
        </div>

        {/* HERO FLIP CARD */}
        <button
          type="button"
          onClick={() => setIsFlipped((current) => !current)}
          className="relative mt-0 h-[640px] w-[378px] cursor-pointer [perspective:1200px]"
          aria-label="Tap to flip sample card"
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
                src="/hero-cards/fernando-front.png"
                alt="Fernando Mendoza front sample card"
                fill
                priority
                className="scale-[1] object-contain"
              />
            </div>

            {/* BACK */}
            <div className="absolute inset-0 overflow-hidden rounded-[28px] drop-shadow-[0_10px_14px_rgba(0,0,0,0.34)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <Image
                src="/hero-cards/fernando-back.png"
                alt="Fernando Mendoza back sample card"
                fill
                priority
                className="scale-[1] object-contain"
              />
            </div>

{/* SHIMMER */}
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-[28px]">
      <div className="hero-shimmer absolute inset-y-0 -left-1/2 w-[42%]" />
    </div>

          </div>
        </button>

        <div className="mt-[8px] text-[13px] italic text-black/45">
  Tap card to flip
</div>

        {/* HEADLINE */}
        <div className="mt-2 text-center">
  <h1 className="text-[26px] font-extrabold leading-[1.05] tracking-[-0.03em] text-black md:text-[58px]">
  Your Athletic Career Deserves Its Own Card
</h1>

  <p className="mt-2 text-[20px] font-normal leading-none tracking-[-0.02em]">
    Create. Collect. Connect.
  </p>
</div>

        {/* CTA */}
        <Link
          href="/create"
          className="mt-5 flex w-full max-w-[315px] flex-col items-center justify-center rounded-full bg-[#C9AD68] px-6 py-3 text-center text-white shadow-sm transition active:scale-[0.98]"
        >
          <span className="text-[25px] font-semibold leading-none tracking-[-0.003em]">
  Create Your Card
</span>
          <span className="mt-1 text-[18px] italic leading-none">
            It takes 60 seconds
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setShowFeatured(true)}
          className="mt-5 text-[18px] italic underline underline-offset-4"
        >
          See Featured Cards
        </button>
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
          <h2 className="text-[25px] font-semibold leading-none tracking-[-0.01em]">
            Featured Cards
          </h2>
          <p className="mt-2 text-[15px] text-black/55">
            Swipe to scroll Featured Cards, tap to open.
          </p>
        </div>

        <div className="-mx-5 mt-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredCards.map((card) => (
            <div
              key={card.src}
              className="w-[155px] shrink-0 snap-center overflow-hidden rounded-[20px] bg-white shadow-[0_10px_22px_rgba(0,0,0,0.22)]"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={330}
                height={520}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}