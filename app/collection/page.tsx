"use client";

import { useEffect, useState } from "react";
import MiniAthleteCard from "../components/MiniAthleteCard";

export default function CollectionPage() {
  const [collection, setCollection] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("collection");
    if (stored) {
      setCollection(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="min-h-screen bg-black p-6 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Collection ({collection.length})
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {collection.length > 0 ? (
          collection.map((card, index) => (
            <MiniAthleteCard
              key={index}
              athlete={card}
              onClick={() => {
                console.log("Open full card later:", card);
              }}
            />
          ))
        ) : (
          <>
            <div className="flex aspect-[2.5/3.5] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-sm text-white/50">
              Empty
            </div>
            <div className="flex aspect-[2.5/3.5] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-sm text-white/50">
              Empty
            </div>
            <div className="flex aspect-[2.5/3.5] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-sm text-white/50">
              Empty
            </div>
            <div className="flex aspect-[2.5/3.5] items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 text-sm text-white/50">
              Empty
            </div>
          </>
        )}
      </div>
    </main>
  );
}