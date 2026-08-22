import FanTicket from "@/app/components/cards/FanTicket";
import ShareFanTicketActions from "@/app/components/fan/ShareFanTicketActions";
import FanTicketNavigation from "@/app/components/fan/FanTicketNavigation";
import { supabase } from "@/app/lib/supabaseClient";
import NavigationButton from "../../components/navigation/NavigationButton";

type FanPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FanPage({
  params,
}: FanPageProps) {
  const { id } = await params;

  const { data: fan, error } = await supabase
    .from("fans")
    .select("id, created_at, name, photo_url")
    .eq("id", id)
    .single();

    const { count: collectedCount, error: collectionCountError } =
  await supabase
    .from("collections")
    .select("*", { count: "exact", head: true })
    .eq("collector_type", "fan")
    .eq("collector_id", id)
    .eq("collected_type", "athlete_card");

if (collectionCountError) {
  console.error(
    "Fan collection count error:",
    collectionCountError
  );
}

  if (error) {
    console.error("Fan fetch error:", error);

    return (
      <main className="min-h-screen bg-white p-8 text-black">
        <NavigationButton
  type="back"
  href="/"
/>
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold">
            Fan Ticket unavailable
          </h1>

          <p className="mt-4 text-neutral-500">
            We could not load this Fan Ticket.
          </p>

          <a
            href="/"
            className="mt-6 inline-block font-semibold underline underline-offset-4"
          >
            Visit jocdocs.com →
          </a>
        </div>
      </main>
    );
  }

  if (!fan) {
    return (
      <main className="min-h-screen bg-white p-8 text-black">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold">
            Fan Ticket not found
          </h1>

          <a
            href="/"
            className="mt-6 inline-block font-semibold underline underline-offset-4"
          >
            Visit jocdocs.com →
          </a>
        </div>
      </main>
    );
  }

  return (
  <main className="relative flex min-h-screen flex-col items-center bg-white px-4 pb-12 pt-16">
    <FanTicketNavigation fanId={fan.id} />

    {/* FAN TICKET */}
    <div className="relative flex w-full justify-center">
  <div className="relative h-[583px] w-[341px] sm:h-[716px] sm:w-[419px]">
    <div
      className="
        absolute left-1/2 top-0
        h-[530px] w-[310px]
        origin-top
        -translate-x-1/2
        scale-[1.10]
        sm:scale-[1.35]
      "
    >
      <FanTicket
  fanId={fan.id}
  name={fan.name}
  photo={fan.photo_url || ""}
  collectedCount={collectedCount ?? 0}
  createdAt={fan.created_at}
/>
    </div>
  </div>
</div>

      {/* SHARE OPTIONS */}
      <ShareFanTicketActions fanName={fan.name} />
    </main>
  );
}