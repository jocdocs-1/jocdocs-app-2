"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import MiniFanTicket from "@/app/components/cards/MiniFanTicket";
import NavigationButton from "@/app/components/navigation/NavigationButton";
import Footer from "@/app/components/Footer";

type FanRecord = {
  id: string;
  created_at: string;
  name: string;
  photo_url: string | null;
};

export default function MeetTheFansPage() {
  const [fans, setFans] = useState<FanRecord[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadFans() {
      const { data, error } = await supabase
        .from("fans")
        .select("id, created_at, name, photo_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading fans:", error);
        return;
      }

      setFans(data ?? []);
    }

    loadFans();
  }, []);

  const filteredFans = fans.filter((fan) =>
    fan.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-black px-4 pb-10 pt-20 text-white">
      <NavigationButton
        type="back"
        href="/"
      />

      <div className="mx-auto max-w-6xl">
        <h1 className="mb-1 text-center text-3xl font-bold uppercase">
          Meet the Fans
        </h1>

        <p className="mb-1 text-center text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A96A]">
          {fans.length} Fan Tickets
        </p>

        <p className="mb-8 text-center text-sm leading-tight text-white/70">
          Meet the fans who are part of the jocdocs community.
        </p>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search fans..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full max-w-lg rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#C5A96A]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredFans.map((fan) => (
            <a
              key={fan.id}
              href={`/fan/${fan.id}?source=meet-the-fans`}
              className="block transition hover:scale-[1.02]"
            >
              <MiniFanTicket
                name={fan.name}
                photo={fan.photo_url}
                createdAt={fan.created_at}
              />
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}