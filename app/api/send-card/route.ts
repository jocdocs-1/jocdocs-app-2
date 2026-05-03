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
  subject: `${name ? `${name}, your` : "Your"} jocdocs card is ready`,
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 24px; text-align: center;">

    <!-- LOGO -->
    <div style="margin-bottom: 20px;">
      <img src="https://jocdocs.com/logo.png" alt="jocdocs" style="height: 38px;" />
    </div>

    <!-- HEADLINE -->
    <h1 style="font-size: 26px; color: #000000; margin-bottom: 10px;">
      Your jocdocs card is ready.
    </h1>

    <!-- SUBTEXT -->
    <p style="font-size: 15px; color: #333333; margin-bottom: 30px;">
      Tap below to view and share your card.
    </p>

    <!-- PRIMARY CTA -->
    <a href="${shareUrl}" 
       style="
         display: inline-block;
         padding: 13px 26px;
         background-color: #C9AD68;
         color: #ffffff;
         text-decoration: none;
         font-weight: bold;
         border-radius: 6px;
         font-size: 15px;
         margin-bottom: 24px;
       ">
      VIEW CARD
    </a>

    <!-- SECONDARY LINK -->
    <div style="margin-top: 10px;">
      <a href="https://jocdocs.com" 
         style="
           color: #000000;
           text-decoration: underline;
           font-size: 16px;
         ">
        Visit jocdocs.com →
      </a>
    </div>

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