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
          Last updated: September 7, 2026
        </p>

        <div className="space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            Questions, feedback, partnership opportunities, or technical
            issues? We&apos;d love to hear from you. Please contact us at{" "}
            <span className="font-medium">
              hello.jocdocs@gmail.com
            </span>.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Managing Your Own Content
            </h2>

            <p className="mt-2">
              Users may edit, manage, or delete their own Athlete Cards or Fan
              Tickets through the management tools provided by jocdocs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Removal Requests
            </h2>

            <p className="mt-2">
              If you believe content on jocdocs should be reviewed or removed,
              please email us with the Athlete Card or Fan Ticket link and a
              brief explanation of your request.
            </p>

            <p className="mt-4">
              Removal requests may involve an unauthorized photograph, name,
              or other content; inaccurate information; an alleged violation
              of intellectual property or other rights; a privacy or safety
              concern; content involving a minor without appropriate
              permission; or another legitimate reason for review.
            </p>

            <p className="mt-4">
              We will review legitimate requests and may request additional
              information when reasonably necessary to evaluate the request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Parents and Legal Guardians
            </h2>

            <p className="mt-2">
              Parents and legal guardians may request review, correction, or
              removal of content involving their child. Please include the
              relevant Athlete Card or Fan Ticket link and a brief explanation
              of the request.
            </p>

            <p className="mt-4">
              jocdocs may request reasonable information to confirm that the
              person making the request is authorized to act on behalf of the
              minor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Schools, Coaches, Photographers, and Rights Holders
            </h2>

            <p className="mt-2">
              Schools, coaches, photographers, and other appropriate rights
              holders may contact jocdocs to request review or removal of
              content they believe violates their rights, uses material
              without appropriate permission, or creates a legitimate privacy
              or safety concern.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              General Questions
            </h2>

            <p className="mt-2">
              For general questions, feedback, support, partnership inquiries,
              or removal requests, please contact us at{" "}
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