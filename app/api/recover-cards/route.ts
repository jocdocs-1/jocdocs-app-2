import { Resend } from "resend";

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

    const data = await resend.emails.send({
      from: "jocdocs <hello@jocdocs.com>",
      to: email,
      subject: "Your jocdocs card links",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h1>Your recovery request worked.</h1>

          <p>
            If you received this email, the Recover My Cards
            system is successfully connected.
          </p>

          <p>
            Next we will add your actual card links.
          </p>
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