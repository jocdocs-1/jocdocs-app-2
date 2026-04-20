import AthleteCard from "./components/AthleteCard";
import { athletes } from "./data/athletes";

export default function Home() {
  const athlete = athletes[0];

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-200 px-6 py-10">
      <div className="relative h-[560px] w-[360px]">
        {/* back stack card 2 */}
<div className="absolute left-[12px] top-[8px] h-[530px] w-[310px] rounded-[22px] bg-white/75 shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />

{/* back stack card 1 */}
<div className="absolute left-[6px] top-[4px] h-[530px] w-[310px] rounded-[22px] bg-white/90 shadow-[0_3px_10px_rgba(0,0,0,0.28)]" />

        {/* main live card */}
        <div className="absolute left-0 top-0">
          <AthleteCard athlete={athlete} />
        </div>
      </div>
    </main>
  );
}