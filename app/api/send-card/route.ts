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
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f9f9f9;">

    import Image from "next/image";
      
      <h1 style="color: #000; margin-bottom: 10px;">
        Your jocdocs Card is Ready 🏆
      </h1>

      <p style="font-size: 16px; color: #444; margin-bottom: 20px;">
        ${name ? `${name}, your` : "Your"} digital trading card is live.
      </p>

      <div style="margin-bottom: 20px;">
        <a 
          href="${shareUrl}" 
          target="_blank"
          style="display: inline-block; padding: 12px 24px; background-color: #C9AD68; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;"
        >
          View Your Card
        </a>
      </div>

      <p style="font-size: 14px; color: #666; margin: 0; line-height: 1.2;">
  Know another athlete?
</p>

<p style="font-size: 14px; color: #000; font-weight: bold; margin: 4px 0 0 0; line-height: 1.2;">
  Share your card with them 👇
</p>

<p style="font-size: 13px; color: #888; margin: 4px 0 0 0; line-height: 1.2;">
  Forward this email or send them your link.
</p>

<p style="margin-top: 10px;">
  <a 
    href="https://jocdocs.com" 
    target="_blank"
    style="font-size: 15px; color: #C9AD68; text-decoration: none; font-weight: bold;"
  >
    Visit jocdocs.com →
  </a>
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