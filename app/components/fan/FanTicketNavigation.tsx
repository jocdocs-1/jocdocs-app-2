"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavigationButton from "../navigation/NavigationButton";

export default function FanTicketNavigation({
  fanId,
}: {
  fanId: string;
}) {
  const [isOwnTicket, setIsOwnTicket] = useState<boolean | null>(null);
    const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const fansAthleteId = searchParams.get("fansAthleteId");

  useEffect(() => {
    const ownFanId = window.localStorage.getItem("jocdocsFanId");
    setIsOwnTicket(ownFanId === fanId);
  }, [fanId]);

  if (isOwnTicket === null) return null;

  return (
  <NavigationButton
    type={
  source === "fans" || source === "meet-the-fans"
    ? "close"
    : isOwnTicket
      ? "back"
      : "close"
}
    onClick={() => {
  if (source === "meet-the-fans") {
    window.location.href = "/meet-the-fans";
    return;
  }

  if (source === "fans" && fansAthleteId) {
    window.location.href = `/fans/${fansAthleteId}`;
    return;
  }

  if (isOwnTicket) {
    window.location.href = "/";
    return;
  }

  window.history.back();
}}
  />
);
}