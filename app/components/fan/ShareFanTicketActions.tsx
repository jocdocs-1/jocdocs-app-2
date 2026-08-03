"use client";

import { useState } from "react";

type ShareFanTicketActionsProps = {
  fanName: string;
};

export default function ShareFanTicketActions({
  fanName,
}: ShareFanTicketActionsProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  async function handleShareTicket() {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${fanName}'s jocdocs Fan Ticket`,
          text: `Check out ${fanName}'s jocdocs Fan Ticket.`,
          url: shareUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(shareUrl);

      setCopySuccess(true);

      window.setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Error sharing Fan Ticket:", error);
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      <p className="mt-8 max-w-[340px] text-center text-[15px] italic leading-[1.25] text-neutral-500">
        Use share button either on ticket or below to share with
        athletes, friends, family, coaches and fellow fans.
      </p>

      <button
        type="button"
        onClick={handleShareTicket}
        className="mt-4 flex w-full max-w-[340px] items-center justify-center rounded-full bg-[#C9AD68] px-6 py-3 text-center text-[26px] font-bold leading-tight text-white shadow-lg shadow-[#C9AD68]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Share My Ticket
      </button>

      {copySuccess && (
        <p className="mt-3 text-center text-[13px] font-bold text-[#C5A96A]">
          Link copied.
        </p>
      )}

      <a
        href="/"
        className="mt-4 text-[18px] font-medium text-black underline underline-offset-4"
      >
        Visit jocdocs.com →
      </a>
    </div>
  );
}