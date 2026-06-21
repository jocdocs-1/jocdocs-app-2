"use client";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="text-md font-bold underline"
        >
          ← Back to Home
        </button>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight">
          Terms of Use
        </h1>

        <p className="mt-3 text-sm text-black/60">
          Last updated: May 18, 2026
        </p>

        <div className="mt-8 space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            Welcome to jocdocs. By creating, publishing, viewing, or sharing a
            jocdocs athlete card, you agree to these Terms of Use.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">Use of jocdocs</h2>
            <p className="mt-2">
              jocdocs allows users to create and share digital athlete-style
              profile cards. You agree to use jocdocs responsibly and only submit
              accurate information, images, and content that you have permission
              to use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Image and content rights
            </h2>
            <p className="mt-2">
              By submitting images, names, stats, school/team information, links,
              or other content, you confirm that you have the right to use and
              share that content. Do not upload images or information that belong
              to someone else without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">Minors</h2>
            <p className="mt-2">
              If you are under 18, you should have permission from a parent or
              guardian before creating or publishing a card. Parents, guardians,
              athletes, or schools may contact jocdocs to request review or
              removal of content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Public sharing
            </h2>
            <p className="mt-2">
              Published jocdocs cards may be accessible through a shareable link.
              Only submit information and images that you are comfortable
              sharing with others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Removal requests
            </h2>
            <p className="mt-2">
              To request removal of a card or image, email hello.jocdocs@gmail.com
              with the card link and a brief explanation of the request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Changes to jocdocs
            </h2>
            <p className="mt-2">
              jocdocs is an early-stage product and may change over time. We may
              update features, pages, policies, or these Terms as the platform
              develops.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">Contact</h2>
            <p className="mt-2">
              Questions about these Terms can be sent to hello.jocdocs@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}