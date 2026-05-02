import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, shareUrl } = await req.json();

    if (!email || !shareUrl) {
      return Response.json(
        { error: "Missing email or shareUrl" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "jocdocs <hello@jocdocs.com>",
      to: email,
      subject: `${name || "Your"} jocdocs card is ready`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your jocdocs card is ready 🃏</h2>
          <p>Click below to view and share your card:</p>
          
          <a href="${shareUrl}" 
             style="
               display:inline-block;
               padding:12px 20px;
               background:#C9AD68;
               color:#ffffff;
               text-decoration:none;
               border-radius:6px;
               font-weight:bold;
             ">
            View My Card
          </a>

          <p style="margin-top:20px;font-size:12px;color:#888;">
            Create. Collect. Connect.
          </p>
        </div>
      `,
    });

    console.log("EMAIL SENT:", data);

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json(
      { error: "Error sending email" },
      { status: 500 }
    );
  }
}