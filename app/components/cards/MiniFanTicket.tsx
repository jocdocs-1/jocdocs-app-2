"use client";

import { frederickSans } from "@/app/fonts";
import FanTicketShell from "./FanTicketShell";

type MiniFanTicketProps = {
  name: string;
  photo?: string | null;
  createdAt?: string | null;
};

export default function MiniFanTicket({
  name,
  photo,
  createdAt,
}: MiniFanTicketProps) {
  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const nameSize =
  name.length <= 16
    ? "text-[clamp(26px,5vw,43px)]"
    : name.length <= 22
      ? "text-[clamp(24px,4.8vw,39px)]"
      : name.length <= 28
        ? "text-[clamp(22px,4.4vw,35px)]"
        : "text-[clamp(20px,4vw,31px)]";

  return (
    <FanTicketShell className="drop-shadow-[0_12px_28px_rgba(0,0,0,0.48)]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#6f592f] to-white" />

      {/* LOGO */}
      <div className="absolute inset-x-0 top-[3.3%] z-10 flex justify-center">
        <img
          src="/jocdocs-logo-full-light-2.png"
          alt="jocdocs"
          className="w-[60%] object-contain"
        />
      </div>

      {/* DIVIDER */}
      <div className="absolute left-[8%] right-[8%] top-[14.5%] h-px bg-[#C5A96A]/85" />

      {/* TITLE */}
      <div className="absolute inset-x-0 top-[17%] z-10 text-center">
        <p
  className={`${frederickSans.className} text-[clamp(28px,5.8vw,54px)] uppercase tracking-[0.025em] leading-none text-white`}
>
  Fan Ticket
</p>

        <p className="mt-[-3%] text-[clamp(6px,1.25vw,13px)] font-bold uppercase tracking-[0.22em] text-[#E4C982]">
          Official Member
        </p>
      </div>

      {/* PHOTO */}
      <div className="absolute left-1/2 top-[34%] z-10 aspect-square w-[47%] -translate-x-1/2 overflow-hidden rounded-full border-[3px] border-white shadow-[0_0_0_2px_#C5A96A]">
        <img
          src={photo || "/portrait.png"}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* NAME */}
      <div className="absolute inset-x-[6%] top-[65%] z-10 text-center">
        <p
          className={`${frederickSans.className} ${nameSize} truncate uppercase tracking-[0.025em] leading-none text-black`}
        >
          {name}
        </p>

        {memberSince && (
          <p className="mt-[-2%] text-[clamp(6px,1.2vw,12px)] font-semibold uppercase tracking-[0.08em] text-black/55">
            Member Since {memberSince}
          </p>
        )}
      </div>

      {/* COLLECTION BLOCK */}
      <div className="absolute left-1/2 top-[79%] z-10 w-[72%] -translate-x-1/2 rounded-[13px] border-[1.5px] border-[#C5A96A] bg-black px-[5%] py-[3.8%] text-center shadow-lg">
        <p
  className={`${frederickSans.className} translate-y-[6px] text-[clamp(18px,3.5vw,28px)] uppercase leading-[0.9] tracking-[0.025em] text-white`}
>
  My Collection
</p>

<p className="mt-[3%] text-[clamp(5px,1vw,9px)] uppercase tracking-[0.06em] text-white/65">
  View My Athlete Cards
</p>
      </div>
    </FanTicketShell>
  );
}