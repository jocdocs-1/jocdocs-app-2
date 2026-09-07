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
          Last updated: September 7, 2026
        </p>

        <div className="space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            jocdocs respects your privacy. This Privacy Policy explains what
            information may be collected when you use jocdocs and how that
            information may be used.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Information You Provide
            </h2>
            <p className="mt-2">
              When creating or managing an Athlete Card or Fan Ticket, users
              may provide information such as names, email addresses, photos,
              school or team information, sport and position, statistics,
              accomplishments, graduation year, social media or highlight
              links, and other optional information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Public Information
            </h2>
            <p className="mt-2">
              Athlete Cards and Fan Tickets are designed to be shared.
              Published content may be publicly accessible through jocdocs or
              through shareable links and may be viewed or shared by other
              people.
            </p>
            <p className="mt-4">
              Users should avoid publishing sensitive personal information
              such as home addresses, personal phone numbers, financial
              information, government identification numbers, or other
              information that could create a privacy or safety risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              How Information Is Used
            </h2>
            <p className="mt-2">
              Information may be used to create, publish, display, and manage
              Athlete Cards and Fan Tickets; support collections and other
              platform features; send, recover, or manage card and ticket
              links; respond to support or removal requests; operate and
              secure jocdocs; improve the platform; and communicate important
              information related to the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Age Requirements and Minors
            </h2>
            <p className="mt-2">
              Users must be at least 13 years old to create or publish a
              jocdocs Athlete Card or Fan Ticket.
            </p>
            <p className="mt-4">
              Users between 13 and 17 years old must have permission from a
              parent or legal guardian before creating or publishing content
              on jocdocs.
            </p>
            <p className="mt-4">
              jocdocs is not intended for children under 13 to create or
              publish Athlete Cards or Fan Tickets. If we learn that a child
              under 13 has submitted personal information through these
              features, we may take steps to review and remove that
              information.
            </p>
            <p className="mt-4">
              Parents and legal guardians may contact jocdocs to request
              review, correction, or removal of content involving their child.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Email Addresses
            </h2>
            <p className="mt-2">
              Email addresses may be used to publish, deliver, recover, or
              manage Athlete Cards and Fan Tickets, respond to support
              requests, and communicate information related to the service.
            </p>
            <p className="mt-4">
              An email address provided for these purposes is not displayed
              publicly unless the user independently chooses to include it in
              content intended for public display.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Third-Party Services
            </h2>
            <p className="mt-2">
              jocdocs may use trusted third-party service providers for
              functions such as hosting, database services, image and file
              storage, email delivery, analytics, security, and other
              technical services necessary to operate the platform. These
              providers may process information as needed to provide those
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Data Retention and Removal
            </h2>
            <p className="mt-2">
              Information may be retained for as long as reasonably necessary
              to provide and operate jocdocs, maintain the platform, respond
              to support or disputes, protect users and the service, and meet
              applicable legal obligations.
            </p>
            <p className="mt-4">
              Users may edit, manage, or delete their own Athlete Cards or Fan
              Tickets through the management tools provided by jocdocs.
              Parents, legal guardians, schools, photographers, and other
              appropriate rights holders may also contact jocdocs to request
              review or removal of content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Security
            </h2>
            <p className="mt-2">
              jocdocs takes reasonable measures to protect information used
              by the platform. However, no website, online service, or method
              of electronic storage can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Changes to This Privacy Policy
            </h2>
            <p className="mt-2">
              We may update this Privacy Policy as jocdocs develops or as our
              practices, services, or legal obligations change. The date at
              the top of this page indicates when the policy was most recently
              updated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Contact
            </h2>
            <p className="mt-2">
              Questions about this Privacy Policy or requests concerning
              personal information may be sent to hello.jocdocs@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}