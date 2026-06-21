type FooterProps = {
  theme?: "light" | "dark";
};

export default function Footer({ theme = "light" }: FooterProps) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`mt-14 border-t py-8 ${
        isDark ? "border-white/10" : "border-black/10"
      }`}
    >
      <div
        className={`mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 text-sm ${
          isDark ? "text-white/45" : "text-black/50"
        }`}
      >
        <a
          href="/terms"
          className={`transition ${
            isDark ? "hover:text-white" : "hover:text-black"
          }`}
        >
          Terms
        </a>

        <a
          href="/privacy"
          className={`transition ${
            isDark ? "hover:text-white" : "hover:text-black"
          }`}
        >
          Privacy
        </a>

        <a
  href="/contact"
  className={`transition ${
    isDark ? "hover:text-white" : "hover:text-black"
  }`}
>
  Contact
</a>

<a
  href="/my-cards"
  className={`font-semibold transition ${
    isDark
      ? "text-[#C5A96A] hover:text-white"
      : "text-[#C5A96A] hover:text-black"
  }`}
>
  Manage My Cards
</a>
      </div>
    </footer>
  );
}