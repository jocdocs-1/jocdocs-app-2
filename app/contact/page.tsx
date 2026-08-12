"use client";

import NavigationButton from "../components/navigation/NavigationButton";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-white px-6 pb-10 pt-20 text-black">
  <NavigationButton
    type="back"
    onClick={() => window.history.back()}
  />

  <div className="mx-auto max-w-3xl">

        <h1 className="mb-1 text-3xl font-bold uppercase">
  Contact & Removal Requests
</h1>

<p className="mb-8 text-sm leading-tight text-black/60">
  Last updated: June 27, 2026
</p>

<div className="space-y-6 text-[16px] leading-7 text-black/80">
  <p>
    Questions, feedback, partnership opportunities, or technical issues?
    We'd love to hear from you. Please contact us at
    {" "}
    <span className="font-medium">
      hello.jocdocs@gmail.com
    </span>.
  </p>

  <section>
    <h2 className="text-xl font-extrabold text-black">
      Removal and Account Management
    </h2>

    <p className="mt-2">
      Athletes may edit, manage, or delete their own cards at any time
      through the Manage My Cards page.
    </p>

    <p className="mt-4">
      If you believe content on jocdocs violates your rights,
      contains unauthorized images or information, or should
      otherwise be removed, please email us with the card link
      and a brief explanation of your request. We will review
      all legitimate requests promptly.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-extrabold text-black">
      Who May Request Removal?
    </h2>

    <p className="mt-2">
      Athletes, parents, guardians, schools, coaches,
      photographers, and other rights holders may request
      review or removal of content that they believe
      violates their rights or has been posted without
      proper authorization.
    </p>
  </section>

  <section>
    <h2 className="text-xl font-extrabold text-black">
      General Questions
    </h2>

    <p className="mt-2">
      For general questions, feedback, support, or partnership
      inquiries, please contact us at
      {" "}
      <span className="font-medium">
        hello.jocdocs@gmail.com
      </span>.
    </p>
  </section>
</div>
      </div>
    </main>
  );
}