"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import { frederickSans } from "./fonts";
import FanTicket from "./components/cards/FanTicket";

export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const flipToBack = window.setTimeout(() => {
      setIsFlipped(true);
    }, 1600);

    const flipToFront = window.setTimeout(() => {
      setIsFlipped(false);
    }, 5200);

    return () => {
      window.clearTimeout(flipToBack);
      window.clearTimeout(flipToFront);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-black text-white">
{/* =========================================================
    HEADER
========================================================= */}
<header className="sticky top-0 z-50 border-b border-black/10 bg-white">
  <div className="mx-auto flex h-[96px] w-full max-w-[430px] items-center justify-between px-[18px]">
<Link
  href="/"
  aria-label="jocdocs home"
  className="ml-[8px] block w-[287px]"
>
      <Image
        src="/jocdocs-logo-full-v2.png"
        alt="jocdocs"
        width={320}
        height={110}
        priority
        className="h-auto w-full"
      />
    </Link>

    <button
      type="button"
      onClick={() => setMenuOpen((current) => !current)}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      className="flex h-12 w-12 items-center justify-center text-[#C5A96A]"
    >
{menuOpen ? (
<span className="flex h-[38px] w-[38px] items-center justify-center text-[48px] font-light leading-none">
  ×
</span>
) : (
        <span className="flex w-[27px] flex-col gap-[5px]">
          <span className="h-[3px] w-full rounded-full bg-[#C5A96A]" />
          <span className="h-[3px] w-full rounded-full bg-[#C5A96A]" />
          <span className="h-[3px] w-full rounded-full bg-[#C5A96A]" />
        </span>
      )}
    </button>
  </div>

{/* SLIDE-IN MENU */}
<div
  className={`fixed right-0 top-[96px] z-40 h-[calc(100vh-96px)] w-[82%] max-w-[330px] bg-white text-black shadow-[-12px_0_34px_rgba(0,0,0,0.30)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
    menuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <nav className="px-7 pb-6 pt-1">
    <a
      href="#spotlight"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
    >
      Spotlight Athlete
    </a>

    <a
      href="#community"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
    >
      Join the Community
    </a>

    <a
      href="#story"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
    >
      The jocdocs Story
    </a>

    <a
      href="#fans"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
    >
      Fan Ticket
    </a>

    <Link
      href="/meet-the-fans"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
    >
      Meet the Fans
    </Link>

    <Link
  href="/explore"
  onClick={closeMenu}
  className="block border-b-[1.5px] border-[#C5A96A]/70 py-4 text-[19px] font-medium"
>
  Explore Athletes
</Link>

    <Link
      href="/terms"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/60 py-4 text-[18px] font-medium text-black/55"
    >
      Terms
    </Link>

    <Link
      href="/privacy"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/60 py-4 text-[18px] font-medium text-black/55"
    >
      Privacy
    </Link>

    <Link
      href="/contact"
      onClick={closeMenu}
      className="block border-b-[1.5px] border-[#C5A96A]/60 py-4 text-[18px] font-medium text-black/55"
    >
      Contact
    </Link>

<a
  href="https://www.instagram.com/jocdocsapp/"
  target="_blank"
  rel="noopener noreferrer"
  onClick={closeMenu}
  className="flex items-center gap-3 border-b-[1.5px] border-[#C5A96A]/60 py-4 text-[18px] font-medium text-black/70"
>
  <Image
    src="/social/instagram-icon.png"
    alt=""
    width={24}
    height={24}
    className="h-[24px] w-[24px] object-contain"
  />
  Instagram
</a>

<a
  href="https://www.facebook.com/profile.php?id=61589316473413"
  target="_blank"
  rel="noopener noreferrer"
  onClick={closeMenu}
  className="flex items-center gap-3 border-b-[1.5px] border-[#C5A96A]/60 py-4 text-[18px] font-medium text-black/70"
>
  <Image
    src="/social/facebook-icon.png"
    alt=""
    width={24}
    height={24}
    className="h-[24px] w-[24px] object-contain"
  />
  Facebook
</a>
  </nav>
</div>

{/* DARK OVERLAY BEHIND MENU */}
<button
  type="button"
  aria-label="Close menu"
  onClick={closeMenu}
  className={`fixed inset-x-0 bottom-0 top-[96px] z-30 bg-black/55 backdrop-blur-[1px] transition-opacity duration-500 ${
    menuOpen
      ? "pointer-events-auto opacity-100"
      : "pointer-events-none opacity-0"
  }`}
/>
</header>

{/* =========================================================
    HERO STATEMENT
========================================================= */}
<section className="mx-auto flex min-h-[245px] w-full max-w-[430px] items-center justify-center bg-black px-[15px] py-6 text-center">
  <h1
    className={`${frederickSans.className} w-full max-w-[415px] translate-y-[7px] text-[57px] uppercase leading-[0.94] tracking-[0.015em] text-[#D0B36D]`}
  >
    Your Athletic Story,
    <br />
    On One Shareable,
    <br />
    Collectible,
    <br />
    Easy-Access Card.
  </h1>
</section>

{/* =========================================================
    SPOTLIGHT ATHLETE
========================================================= */}
<section
  id="spotlight"
  className="scroll-mt-[96px] bg-white px-4 pb-5 pt-6 text-black"
>
  <div className="mx-auto w-full max-w-[430px] text-center">
    <div className="mx-auto mb-2 inline-flex min-w-[250px] items-center justify-center rounded-full border border-black/30 bg-[#C5A96A] px-7 py-[5px] shadow-[0_2px_4px_rgba(0,0,0,0.20)]">
      <span className="text-[17px] font-bold uppercase tracking-[0.13em] text-white">
        Spotlight Athlete
      </span>
    </div>

{/* FEATURED ATHLETE HERO CARD */}
<button
  type="button"
  onClick={() => setIsFlipped((current) => !current)}
  aria-label="Flip featured athlete card"
  className="relative -mt-[2px] mx-auto block aspect-[310/530] w-[calc(100vw-34px)] max-w-[378px] cursor-pointer border-0 bg-transparent p-0 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]"
  style={{ perspective: "1200px" }}
>
  <div
    className="relative h-full w-full transition-transform duration-700 ease-in-out"
    style={{
      transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
      transformStyle: "preserve-3d",
      WebkitTransformStyle: "preserve-3d",
    }}
  >
    {/* FRONT */}
    <div
      className="absolute inset-0"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <Image
        src="/hero-cards/jake-anderson-jocdocs-front-2.png"
        alt="Jake Anderson jocdocs card front"
        fill
        priority
        sizes="(max-width: 430px) calc(100vw - 34px), 378px"
        className="object-contain"
      />
    </div>

    {/* BACK */}
    <div
      className="absolute inset-0"
      style={{
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <Image
        src="/hero-cards/jake-anderson-jocdocs-back-2.png"
        alt="Jake Anderson jocdocs card back"
        fill
        priority
        sizes="(max-width: 430px) calc(100vw - 34px), 378px"
        className="object-contain"
      />
    </div>
  </div>

  {/* HERO CARD SHIMMER */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
    <div className="hero-card-shimmer absolute -left-[35%] -top-[40%] h-[180%] w-[14%] bg-gradient-to-r from-transparent via-white/45 to-transparent blur-[2px]" />
  </div>
</button>

    <p className="mt-5 text-[18px] italic leading-none text-black/55">
      Tap card to flip.
    </p>
  </div>
</section>

{/* =========================================================
    COMMUNITY INTRO
========================================================= */}
<section
  id="community"
  className="scroll-mt-[96px] bg-black px-4 pb-8 pt-4"
>
  <div className="mx-auto w-full max-w-[430px]">
    <div className="text-center">
      <p className="text-[24px] italic leading-[1.02] text-white/75">
        Whether you're
        <br />
        an athlete or sports fan,
      </p>

      <h2
        className={`${frederickSans.className} mt-4 text-[62px] uppercase leading-[0.86] tracking-[0.01em] text-[#C5A96A]`}
      >
        Join the jocdocs
        <br />
        Sports Community.
      </h2>
    </div>
    <div className="-mt-4">
    </div>

    <HomeCTA
      eyebrow="ATHLETES"
      title="CREATE MY ATHLETE CARD"
      subtitle="Showcase your athletic career."
      href="/create"
    />

    <HomeCTA
      eyebrow="FANS"
      title="CLAIM MY FAN TICKET"
      subtitle="Follow and collect your favorite athletes."
      href="/create-fan"
    />

    <HomeCTA
      eyebrow="EVERYONE"
      title="EXPLORE ATHLETES"
      subtitle="Discover athletes from every sport."
      href="/explore"
    />
  </div>
</section>

{/* =========================================================
    EXISTING MEMBERS
========================================================= */}
<section className="bg-[#C5A96A] px-5 pb-7.5 pt-5 text-black">
  <div className="mx-auto w-full max-w-[430px] text-center">
    <p className="mb-4 text-[24px] italic leading-none">
      Already have a card? Access here:
    </p>

    <div className="flex flex-col items-center gap-5">
      <Link
        href="/my-cards"
        className="flex min-h-[58px] w-[84%] items-center justify-center rounded-full border-[1.5px] border-white bg-black px-6 text-[25px] font-semibold text-white shadow-[0_5px_10px_rgba(0,0,0,0.30)] transition active:scale-[0.98]"
      >
        My Athlete Card
      </Link>

      <Link
        href="/manage-fan-ticket"
        className="flex min-h-[58px] w-[84%] items-center justify-center rounded-full border-[1.5px] border-white bg-black px-6 text-[25px] font-semibold text-white shadow-[0_5px_10px_rgba(0,0,0,0.30)] transition active:scale-[0.98]"
      >
        My Fan Ticket
      </Link>
    </div>
  </div>
</section>

{/* =========================================================
    JOCDOCS STORY / PROMO VIDEO
========================================================= */}
<section
  id="story"
  className="scroll-mt-[96px] bg-white px-4 pb-9 pt-8"
>
  <div className="mx-auto w-full max-w-[430px] text-center">
    <h2
      className={`${frederickSans.className} text-[66px] uppercase leading-[0.83] tracking-[0.015em] text-black`}
    >
      Every Athlete
      <br />
      Has A Story
    </h2>

    <div className="mx-auto mt-3 w-[92%] overflow-hidden rounded-[12px] border-[1.5px] border-[#C5A96A] bg-black shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
<video
  controls
  playsInline
  preload="metadata"
  poster="/videos/jocdocs-vid1-Cover.jpg"
  className="block h-auto w-full"
>
  <source
    src="/videos/jocdocs-vid1.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>
    </div>
  </div>
</section>

{/* =========================================================
    FAN TICKET
========================================================= */}
<section
  id="fans"
  className="scroll-mt-[96px] border-t-[2px] border-[#C5A96A] bg-white px-4 pb-8 pt-8 text-center text-black"
>
  <div className="mx-auto w-full max-w-[430px]">
    <h2
      className={`${frederickSans.className} text-[66px] uppercase leading-[0.83] tracking-[0.015em] text-black`}
    >
      Every Fan
      <br />
      Has A Favorite
    </h2>

    <div className="mt-2 flex justify-center">
      <Suspense fallback={null}>
<FanTicket
  name="JOHN SMITH"
  photo="/homepage/fan-sample.png"
  collectedCount={3}
/>
      </Suspense>
    </div>

<p className="mx-auto -mt-33 max-w-[390px] text-[23px] italic leading-[1.15] text-black/65">
  Create your own Fan Ticket,
  <br />
  follow your favorite athletes and
  <br />
  build your personal sports collection.
</p>

<Link
  href="/create-fan"
  className="group relative mx-auto mt-4 flex min-h-[58px] w-[76%] items-center justify-center rounded-[11px] border-[1.5px] border-white bg-[#C5A96A] px-4 text-center text-black shadow-[0_5px_12px_rgba(0,0,0,0.32)] transition active:translate-y-[1px]"
>
  <span
    className={`${frederickSans.className} translate-y-[4px] text-[clamp(34px,9vw,41px)] uppercase leading-[0.92] tracking-[0.005em]`}
  >
    Claim My Fan Ticket
  </span>
</Link>
  </div>
</section>

{/* =========================================================
    ATHLETIC CONNECTIVITY
========================================================= */}
<section className="bg-[#C5A96A] px-6 py-8 text-center text-black">
  <div className="mx-auto w-full max-w-[430px]">
    <p className="mx-auto max-w-[385px] text-[26px] font-medium italic leading-[1.15]">
      Athleticonnectivity,
      <br />
      powering the connection between
      <br />
      athletes and the sports community.
    </p>
  </div>
</section>

      <style jsx global>{`
        @keyframes heroCardShimmer {
          0% {
            transform: translate3d(0, -18%, 0) rotate(45deg);
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          90% {
            opacity: 1;
          }

          100% {
            transform: translate3d(850%, 115%, 0) rotate(45deg);
            opacity: 0;
          }
        }

        .hero-card-shimmer {
          will-change: transform, opacity;
          backface-visibility: hidden;
          animation: heroCardShimmer 0.62s linear 0.35s 1 forwards;
        }
      `}</style>

      <Footer />
    </main>
  );
}

/* ===============================================================
   HOME CTA
================================================================ */

function HomeCTA({
  eyebrow,
  title,
  subtitle,
  href,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative mx-auto mt-12 block w-[90%] rounded-[12px] border-[1.5px] border-white bg-[#C5A96A] px-3 pb-[18px] pt-[31px] text-center text-black shadow-[0_5px_12px_rgba(0,0,0,0.32)] transition active:translate-y-[1px]"
    >
      {/* CATEGORY PILL */}
      <div className="absolute left-1/2 top-0 flex min-w-[165px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-white bg-black px-5 py-[1px]">
        <span className="text-[18px] font-bold uppercase tracking-[0.16em] text-white">
          {eyebrow}
        </span>
      </div>

      {/* CTA HEADLINE */}
      <div
        className={`${frederickSans.className} whitespace-nowrap text-[clamp(40px,10.8vw,49px)] uppercase leading-[0.92] tracking-[-0.005em]`}
      >
        {title}
      </div>

      {/* SUBHEAD */}
      <p className="mt-[-2px] text-[19px] italic leading-[1.05] text-black/80">
        {subtitle}
      </p>

      {/* ARROW */}
      <span
        aria-hidden="true"
        className="absolute bottom-[4px] right-[10px] text-[48px] font-light leading-none text-white transition-transform group-hover:translate-x-[2px]"
      >
        ›
      </span>
    </Link>
  );
}