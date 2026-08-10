import type { CSSProperties, ReactNode } from "react";

type FanTicketShellProps = {
  children: ReactNode;
  className?: string;
};

/*
  MINI FAN TICKET SHELL

  Card: 310 × 530
  Gold border: 7px
  Four enlarged corner die-cuts
  No side cuts
  No perforation
*/

const ticketShape = `
  M 42 3.5

  H 268

  A 38.5 38.5 0 0 0 306.5 42

  V 488

  A 38.5 38.5 0 0 0 268 526.5

  H 42

  A 38.5 38.5 0 0 0 3.5 488

  V 42

  A 38.5 38.5 0 0 0 42 3.5

  Z
`;

const maskSvg = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 310 530"
    preserveAspectRatio="none"
  >
    <path
      d="${ticketShape.replace(/\s+/g, " ").trim()}"
      fill="white"
    />
  </svg>
`;

const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(maskSvg)}")`;

export default function FanTicketShell({
  children,
  className = "",
}: FanTicketShellProps) {
  const maskStyles: CSSProperties = {
    WebkitMaskImage: maskUrl,
    maskImage: maskUrl,

    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",

    WebkitMaskPosition: "center",
    maskPosition: "center",

    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  };

  return (
    <div
      className={`relative aspect-[310/530] w-full max-w-[310px] ${className}`}
    >
      {/* CROPPED TICKET ARTWORK */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={maskStyles}
      >
        <div className="relative h-full w-full">
          {children}
        </div>
      </div>

      {/* GOLD OUTLINE */}
      <svg
        viewBox="0 0 310 530"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-50 block h-full w-full"
        aria-hidden="true"
      >
        <path
          d={ticketShape}
          fill="none"
          stroke="#C5A96A"
          strokeWidth="7"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}