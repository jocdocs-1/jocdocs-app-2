"use client";

import Image from "next/image";
import Link from "next/link";

type NavigationButtonProps = {
  type: "back" | "close";
  href?: string;
  onClick?: () => void;
  className?: string;
};

export default function NavigationButton({
  type,
  href,
  onClick,
  className = "",
}: NavigationButtonProps) {
  const content = (
    <Image
      src={
        type === "back"
          ? "/icons/nav-back.png"
          : "/icons/nav-close.png"
      }
      alt=""
      width={26}
      height={26}
      priority
    />
  );

  const sharedClassName = `
    absolute
    left-7
    top-7
    z-50
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-full
    transition-all
    duration-200
    hover:bg-white/5
    active:scale-95
    ${className}
  `;

  const label = type === "back" ? "Go back" : "Close";

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        className={sharedClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}