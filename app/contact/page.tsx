"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl">
        <button
  type="button"
  onClick={() => window.history.back()}
  className="text-sm font-bold underline"
>
  ← Back
</button>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          Contact & Removal Requests
        </h1>

        <p className="mt-3 text-sm text-black/60">
          Last updated: May 18, 2026
        </p>

        <div className="mt-8 space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            If you have a question about jocdocs or need to request removal of a
            card, image, or information, please contact us.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Removal requests
            </h2>

            <p className="mt-2">
              To request removal of a card or image, email:
            </p>

            <p className="mt-3 text-xl font-extrabold text-black">
              hello.jocdocs@gmail.com
            </p>

            <p className="mt-3">
              Please include the card link and a brief explanation of the
              request so we can review it quickly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Who may request removal?
            </h2>

            <p className="mt-2">
              Athletes, parents, guardians, schools, coaches, photographers, or
              other rights holders may request review or removal of content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              General questions
            </h2>

            <p className="mt-2">
              For general questions, feedback, or support, email
              hello.jocdocs@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}