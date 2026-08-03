import { Resend } from "resend";
import { supabase } from "@/app/lib/supabaseClient";

const resend = new Resend(process.env.RESEND_API_KEY);

type FanRecord = {
  id: string;
  name: string;
  edit_token: string;
  created_at: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return Response.json(
        {
          error: "Please enter your email address.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("fans")
      .select("id, name, edit_token, created_at")
      .eq("email", email)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Fan Ticket lookup error:", error);

      return Response.json(
        {
          error: "Unable to retrieve your Fan Ticket.",
        },
        {
          status: 500,
        }
      );
    }

    const tickets = (data || []) as FanRecord[];

    /*
      We deliberately return the same success response whether or
      not a matching ticket exists. This prevents someone from using
      the form to discover which email addresses belong to members.
    */
    if (tickets.length === 0) {
      return Response.json({
        success: true,
      });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || "https://jocdocs.com";

    const ticketLinksHtml = tickets
      .map((ticket) => {
        const viewUrl = `${origin}/fan/${ticket.id}`;
        const editUrl = `${origin}/edit-fan/${ticket.edit_token}`;

        const memberSince = new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(new Date(ticket.created_at));

        return `
          <div
            style="
              margin: 0 auto 18px;
              max-width: 440px;
              padding: 20px;
              border: 1px solid #e4e4e4;
              border-radius: 18px;
              background-color: #fafafa;
            "
          >
            <h2
              style="
                margin: 0 0 6px;
                color: #000000;
                font-size: 22px;
              "
            >
              ${escapeHtml(ticket.name || "My Fan Ticket")}
            </h2>

            <p
              style="
                margin: 0 0 18px;
                color: #666666;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 1px;
              "
            >
              Member since ${escapeHtml(memberSince)}
            </p>

            <a
              href="${viewUrl}"
              style="
                display: inline-block;
                margin: 0 4px 8px;
                padding: 12px 20px;
                border-radius: 999px;
                background-color: #C9AD68;
                color: #ffffff;
                font-size: 14px;
                font-weight: bold;
                text-decoration: none;
              "
            >
              VIEW FAN TICKET
            </a>

            <a
              href="${editUrl}"
              style="
                display: inline-block;
                margin: 0 4px 8px;
                padding: 12px 20px;
                border-radius: 999px;
                background-color: #000000;
                color: #ffffff;
                font-size: 14px;
                font-weight: bold;
                text-decoration: none;
              "
            >
              EDIT FAN TICKET
            </a>
          </div>
        `;
      })
      .join("");

    const result = await resend.emails.send({
      from: "jocdocs <hello@jocdocs.com>",
      to: email,
      subject:
        tickets.length === 1
          ? "Your jocdocs Fan Ticket links"
          : "Your jocdocs Fan Tickets",
      html: `
        <div
          style="
            padding: 24px;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            text-align: center;
          "
        >
          <div style="margin-bottom: 20px;">
            <img
              src="https://jocdocs.com/logo.png"
              alt="jocdocs"
              style="height: 38px;"
            />
          </div>

          <h1
            style="
              margin: 0 0 10px;
              color: #000000;
              font-size: 27px;
            "
          >
            Your Fan Ticket
          </h1>

          <p
            style="
              margin: 0 auto 28px;
              max-width: 480px;
              color: #444444;
              font-size: 15px;
              line-height: 1.5;
            "
          >
            Use the secure links below to view or update your
            jocdocs Fan Ticket.
          </p>

          ${ticketLinksHtml}

          <div style="margin-top: 26px;">
            <a
              href="https://jocdocs.com"
              style="
                color: #000000;
                font-size: 16px;
                text-decoration: underline;
              "
            >
              Visit jocdocs.com →
            </a>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error("Fan Ticket recovery email error:", result.error);

      return Response.json(
        {
          error: "Unable to send your Fan Ticket links.",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Recover Fan Ticket error:", error);

    return Response.json(
      {
        error: "Unable to send your Fan Ticket links.",
      },
      {
        status: 500,
      }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}