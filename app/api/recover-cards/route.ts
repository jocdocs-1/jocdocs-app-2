import { Resend } from "resend";
import { supabase } from "../../lib/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    const { data: leads, error: leadError } = await supabase
  .from("leads")
  .select("card_id")
  .eq("email", email.trim().toLowerCase());

if (leadError) {
  return Response.json(
    { error: "Unable to find cards" },
    { status: 500 }
  );
}

const cardIds =
  leads?.map((lead) => lead.card_id).filter(Boolean) || [];

if (cardIds.length === 0) {
  return Response.json(
    { error: "No cards found for that email" },
    { status: 404 }
  );
}

const { data: cards, error: cardError } = await supabase
  .from("cards")
  .select("id, name, edit_token")
  .in("id", cardIds);

if (cardError) {
  return Response.json(
    { error: "Unable to load cards" },
    { status: 500 }
  );
}

const cardsHtml = cards
  ?.map((card) => {
    const viewUrl = `https://jocdocs.com/card/${card.id}`;
    const editUrl = `https://jocdocs.com/edit/${card.edit_token}`;

    return `
      <div style="margin-bottom: 32px;">
        <h2 style="color:#000000;">
          ${card.name || "Untitled Card"}
        </h2>

        <a href="${viewUrl}"
           style="
             display:inline-block;
             padding:12px 24px;
             background:#C9AD68;
             color:white;
             text-decoration:none;
             border-radius:999px;
             font-weight:bold;
             margin-right:10px;
           ">
          VIEW CARD
        </a>

        <a href="${editUrl}"
           style="
             display:inline-block;
             padding:12px 24px;
             background:#000000;
             color:white;
             text-decoration:none;
             border-radius:999px;
             font-weight:bold;
           ">
          EDIT CARD
        </a>
      </div>
    `;
  })
  .join("");

    const data = await resend.emails.send({
      from: "jocdocs <hello@jocdocs.com>",
      to: email,
      subject: "Your jocdocs card links",
      html: `
  <div style="font-family: Arial, sans-serif; padding: 24px;">

    <h1>Your jocdocs Cards</h1>

    <p>
      Use the links below anytime to view or edit your cards.
    </p>

    ${cardsHtml}

  </div>
`,
    });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Error sending recovery email" },
      { status: 500 }
    );
  }
}