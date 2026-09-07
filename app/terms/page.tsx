"use client";

import NavigationButton from "../components/navigation/NavigationButton";

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-white px-6 pb-10 pt-20 text-black">
      <NavigationButton
        type="back"
        onClick={() => window.history.back()}
      />

      <div className="mx-auto max-w-3xl">
        <h1 className="mb-1 text-3xl font-bold uppercase">
          Terms of Use
        </h1>

        <p className="mb-8 text-sm leading-tight text-black/60">
          Last updated: September 7, 2026
        </p>

        <div className="space-y-6 text-[16px] leading-7 text-black/80">
          <p>
            Welcome to jocdocs. By accessing or using jocdocs, including
            creating, publishing, viewing, collecting, or sharing a jocdocs
            Athlete Card or Fan Ticket, you agree to these Terms of Use.
          </p>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Use of jocdocs
            </h2>
            <p className="mt-2">
              jocdocs is a digital sports platform that allows athletes to
              create and share personalized Athlete Cards and allows fans and
              other members of the sports community to discover, collect, and
              share content.
            </p>
            <p className="mt-4">
              You agree to use jocdocs responsibly and to provide accurate
              information. You may only submit images, names, statistics,
              school or team information, links, and other content that you
              have the right or permission to use.
            </p>
            <p className="mt-4">
              You may not use jocdocs to impersonate another person, post
              false or misleading information, harass others, violate another
              person&apos;s rights, or use the platform for unlawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Age Requirements and Minors
            </h2>
            <p className="mt-2">
              You must be at least 13 years old to create or publish a jocdocs
              Athlete Card or Fan Ticket.
            </p>
            <p className="mt-4">
              If you are between 13 and 17 years old, you must have permission
              from a parent or legal guardian before creating or publishing
              content on jocdocs. By creating or publishing content, a user
              under 18 represents that they have obtained this permission.
            </p>
            <p className="mt-4">
              Parents and legal guardians may contact jocdocs at any time to
              request review or removal of content involving their child.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Image and Content Rights
            </h2>
            <p className="mt-2">
              By submitting images, names, statistics, school or team
              information, links, or other content, you confirm that you have
              the right or appropriate permission to use and share that
              content.
            </p>
            <p className="mt-4">
              Do not upload photographs, copyrighted material, personal
              information, or other content belonging to another person
              without appropriate permission.
            </p>
            <p className="mt-4">
              You retain ownership of the content you submit. By publishing
              content on jocdocs, you give jocdocs permission to host,
              display, reproduce, and make that content available as necessary
              to operate and provide the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Public Sharing
            </h2>
            <p className="mt-2">
              Published jocdocs Athlete Cards and Fan Tickets may be publicly
              accessible through jocdocs and through shareable links.
              Information placed on published content may therefore be viewed
              or shared by other people.
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
              Collections and Sharing
            </h2>
            <p className="mt-2">
              jocdocs may allow users to collect Athlete Cards, view
              collections, share cards or tickets, and use other public
              features of the platform.
            </p>
            <p className="mt-4">
              Being collected, viewed, or shared by another user does not
              imply endorsement, sponsorship, recruiting interest, or any
              official relationship between users, schools, teams, coaches,
              recruiters, or jocdocs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Removal and Account Management
            </h2>
            <p className="mt-2">
              Users may edit, manage, or delete their own cards or tickets
              through the management tools provided by jocdocs.
            </p>
            <p className="mt-4">
              jocdocs may review, restrict, or remove content that violates
              these Terms, infringes another person&apos;s rights, creates a
              safety or privacy concern, or is otherwise inappropriate for
              the platform.
            </p>
            <p className="mt-4">
              If you believe content on jocdocs violates your rights, contains
              unauthorized material, or should otherwise be removed, please
              email hello.jocdocs@gmail.com with the card or ticket link and a
              brief explanation of your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              No Guarantee of Recruiting or Athletic Opportunities
            </h2>
            <p className="mt-2">
              jocdocs provides tools for athletes to present and share their
              athletic stories. jocdocs does not guarantee recruiting
              interest, scholarships, roster opportunities, endorsements, NIL
              opportunities, employment, or any other athletic or
              professional outcome.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Changes to jocdocs
            </h2>
            <p className="mt-2">
              jocdocs is an evolving platform and its features and services
              may change over time. We may update these Terms as the platform
              develops or as legal, safety, or operational requirements
              change.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold text-black">
              Contact
            </h2>
            <p className="mt-2">
              Questions about these Terms may be sent to
              hello.jocdocs@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}