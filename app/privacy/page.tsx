"use client";

import NavigationButton from "../components/navigation/NavigationButton";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-white px-6 pb-10 pt-20 text-black">
  <NavigationButton
    type="back"
    onClick={() => window.history.back()}
  />

  <div className="mx-auto max-w-3xl">

        <h1 className="mb-1 text-3xl font-bold uppercase">
  Privacy Policy
</h1>

<p className="mb-8 text-sm leading-tight text-black/60">
  Last updated: June 27, 2026
</p>

<div className="space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            jocdocs respects your privacy. This page explains what information
            may be collected when using the platform.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Information you provide
            </h2>
            <p className="mt-2">
              When creating a card, users may provide names, sports information,
              statistics, images, email addresses, social links, and other
              optional content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Public card sharing
            </h2>
            <p className="mt-2">
              Published cards may be accessible through public share links.
              Users should only upload information and images they are
              comfortable sharing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              How information is used
            </h2>
            <p className="mt-2">
              Information may be used to create and display cards, send card
              links, respond to support requests, improve jocdocs, and maintain
              the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Minors
            </h2>
            <p className="mt-2">
              If you are under 18, you should have permission from a parent or
              guardian before creating or publishing a card. Parents, guardians,
              athletes, or schools may request review or removal of content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Third-party services
            </h2>
            <p className="mt-2">
              jocdocs may use trusted third-party services for hosting, storage,
              email delivery, analytics, or other platform functions.
            </p>
          </section>

          <section>
  <h2 className="text-xl font-extrabold text-black">
    Removal and Account Management
  </h2>

  <p className="mt-2">
    Users may edit, manage, or delete their own cards at any time
    through the Manage My Cards page.
  </p>

  <p className="mt-4">
    If you believe content on jocdocs violates your rights,
    contains unauthorized material, or should otherwise be
    removed, please email hello.jocdocs@gmail.com with the
    card link and a brief explanation of your request.
  </p>
</section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Contact
            </h2>
            <p className="mt-2">
              Questions about this Privacy Policy may be sent to
              hello.jocdocs@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}