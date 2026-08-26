import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black px-6 pb-6 pt-4 text-white">
      <div className="mx-auto w-full max-w-[430px] text-center">

        {/* FOOTER LINKS */}
        <nav className="mx-auto flex items-center justify-center gap-14">
          <Link
            href="/terms"
            className="text-[17px] font-medium transition-opacity hover:opacity-70"
          >
            Terms
          </Link>

          <Link
            href="/privacy"
            className="text-[16px] font-medium transition-opacity hover:opacity-70"
          >
            Privacy
          </Link>

          <Link
            href="/contact"
            className="text-[16px] font-medium transition-opacity hover:opacity-70"
          >
            Contact
          </Link>
        </nav>

        {/* COPYRIGHT */}
        <p className="mt-4 text-[12px] leading-none text-white/60">
          Copyright © 2026, 29 Sweep Media. All rights reserved.
        </p>

      </div>
    </footer>
  );
}