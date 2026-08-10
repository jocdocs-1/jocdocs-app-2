"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FanTicket from "../components/cards/FanTicket";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import NavigationButton from "../components/navigation/NavigationButton";

export default function CreateFanPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaveModalClosing, setIsSaveModalClosing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function resizeImage(
    file: File,
    maxWidth = 700,
    quality = 0.8
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          const scale = Math.min(1, maxWidth / image.width);

          const canvas = document.createElement("canvas");
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);

          const context = canvas.getContext("2d");

          if (!context) {
            reject(new Error("Could not prepare the image."));
            return;
          }

          context.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const compressedImage = canvas.toDataURL(
            "image/jpeg",
            quality
          );

          resolve(compressedImage);
        };

        image.onerror = () => {
          reject(new Error("Could not load the image."));
        };

        image.src = reader.result as string;
      };

      reader.onerror = () => {
        reject(new Error("Could not read the selected file."));
      };

      reader.readAsDataURL(file);
    });
  }

  async function handlePhotoUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSaveError("");

    try {
      const compressedPhoto = await resizeImage(file, 700, 0.8);
      setPhoto(compressedPhoto);
    } catch (error) {
      console.error("Fan photo upload failed:", error);

      setSaveError(
        "We could not prepare that photo. Please try another image."
      );
    }
  }

  function dataURLtoFile(dataUrl: string, filename: string) {
    const parts = dataUrl.split(",");
    const mime =
      parts[0].match(/:(.*?);/)?.[1] || "image/jpeg";

    const binaryString = atob(parts[1]);
    const byteArray = new Uint8Array(binaryString.length);

    for (
      let index = binaryString.length - 1;
      index >= 0;
      index -= 1
    ) {
      byteArray[index] = binaryString.charCodeAt(index);
    }

    return new File([byteArray], filename, {
      type: mime,
    });
  }

  function openSaveModal() {
    setSaveError("");

    if (!name.trim()) {
      setSaveError(
        "Please enter your name before publishing your Fan Ticket."
      );

      return;
    }

    setShowSaveModal(true);
  }

  function closeSaveModal() {
    if (isSaving) {
      return;
    }

    setIsSaveModalClosing(true);

    window.setTimeout(() => {
      setShowSaveModal(false);
      setIsSaveModalClosing(false);
      setSaveError("");
    }, 320);
  }

  async function saveFanTicket() {
    const cleanedName = name.trim();
    const cleanedEmail = contactInfo.email.trim().toLowerCase();
    const cleanedPhone = contactInfo.phone.trim();

    setSaveError("");

    if (!cleanedName) {
      setSaveError("Please enter your name.");
      return;
    }

    if (!cleanedEmail) {
      setSaveError("Please enter your email address.");
      return;
    }

    if (!cleanedEmail.includes("@")) {
      setSaveError("Please enter a valid email address.");
      return;
    }

    if (!agreedToTerms) {
      setSaveError(
        "Please confirm the image-rights agreement before publishing."
      );

      return;
    }

    setIsSaving(true);

    try {
      let photoUrl: string | null = null;

      if (photo.startsWith("data:")) {
        const photoFileName = `fan-tickets/${crypto.randomUUID()}-profile.jpg`;

        const photoFile = dataURLtoFile(
          photo,
          photoFileName
        );

        const { error: uploadError } = await supabase.storage
          .from("card-images")
          .upload(photoFileName, photoFile, {
            contentType: "image/jpeg",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("card-images")
          .getPublicUrl(photoFileName);

        photoUrl = publicUrlData.publicUrl;
      }

      const editToken = crypto.randomUUID();

      const { data: fan, error: fanError } = await supabase
        .from("fans")
        .insert([
          {
            name: cleanedName,
            email: cleanedEmail,
            phone: cleanedPhone || null,
            photo_url: photoUrl,
            edit_token: editToken,
          },
        ])
        .select()
        .single();

      if (fanError) {
        throw fanError;
      }

      const ticketUrl = `${window.location.origin}/fan/${fan.id}`;
      const editUrl = `${window.location.origin}/edit-fan/${editToken}`;

      /*
        We will create this dedicated email endpoint after the
        live Fan Ticket page is working.

        The save succeeds even if the email endpoint has not yet
        been added.
      */
      try {
        await fetch("/api/send-fan-ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanedEmail,
            name: cleanedName,
            shareUrl: ticketUrl,
            editUrl,
          }),
        });
      } catch (emailError) {
        console.error(
          "Fan Ticket email could not be sent:",
          emailError
        );
      }

      window.localStorage.setItem("jocdocsFanId", fan.id);
      
      router.push(`/fan/${fan.id}`);
    } catch (error) {
      console.error("Fan Ticket save error:", error);

      setSaveError(
        "Your Fan Ticket could not be published. Please try again."
      );

      setIsSaving(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      <NavigationButton
  type="back"
  href="/"
/>
      <main className="px-6 py-10">
        <div className="mx-auto max-w-5xl">

          <div className="mt-4 grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* FORM */}
            <section>
              <h1 className="text-3xl font-extrabold">
                Create Your Fan Ticket
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Watch your Fan Ticket come to life as you build it.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="fan-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Your Name
                  </label>

                  <input
                    id="fan-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fan-photo"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Upload Profile Photo
                  </label>

                  <input
                    id="fan-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="input"
                  />

                  <p className="mt-2 text-xs leading-relaxed text-white/40">
                    A clear, centered portrait will look best inside
                    the circular frame.
                  </p>
                </div>

                {saveError && !showSaveModal && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                  >
                    {saveError}
                  </p>
                )}

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={openSaveModal}
                    className="w-full rounded-2xl bg-[#C5A96A] px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(197,169,106,0.35)] transition active:scale-[0.98]"
                  >
                    Publish Fan Ticket
                  </button>
                </div>
              </div>
            </section>

            {/* LIVE PREVIEW */}
            <section className="flex justify-center md:justify-end">
              <FanTicket
                name={name.trim() || "Your Name"}
                photo={photo}
                collectedCount={0}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer theme="dark" />

      {/* PUBLISH MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4">
          <div
            className="w-full max-w-[520px] rounded-t-[28px] border border-white/10 bg-neutral-950 p-5 pb-7 shadow-2xl transition-all duration-300 ease-out"
            style={{
              animation: isSaveModalClosing
                ? "slideDown .38s ease-in-out forwards"
                : "slideUp .38s ease-in-out forwards",

              boxShadow: `
                0 0 0 1px rgba(255,255,255,.20),
                0 -10px 38px rgba(197,169,106,.30),
                0 0 54px rgba(197,169,106,.22),
                0 0 34px rgba(255,255,255,.10)
              `,
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#C5A96A]/40" />

            <div className="text-center">
              <h2 className="text-[34px] font-extrabold leading-[1] tracking-[-0.03em] text-white">
                Claim Your Fan Ticket
              </h2>

              <p className="mt-3 text-[16px] leading-[1.35] text-white/70">
                Enter your email so you can access and manage your
                Fan Ticket anytime.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="fan-email"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Email *
                </label>

                <input
                  id="fan-email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(event) =>
                    setContactInfo((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="input"
                />
              </div>

              <div>
                <label
                  htmlFor="fan-phone"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Mobile number{" "}
                  <span className="text-white/40">
                    (optional)
                  </span>
                </label>

                <input
                  id="fan-phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(event) =>
                    setContactInfo((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="(555) 555-5555"
                  autoComplete="tel"
                  className="input"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-[1.4] text-white/75">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(event) =>
                    setAgreedToTerms(event.target.checked)
                  }
                  className="mt-1"
                />

                <span>
                  I confirm that I have the right to use the image
                  and information submitted to jocdocs.

                  <span className="mt-2 block text-xs text-white/45">
                    By publishing, you agree to the{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="underline hover:text-white"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </span>
              </label>

              {saveError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                >
                  {saveError}
                </p>
              )}

              <button
                type="button"
                onClick={saveFanTicket}
                disabled={!agreedToTerms || isSaving}
                className={`w-full rounded-2xl px-6 py-4 text-[21px] font-extrabold uppercase tracking-[0.08em] transition active:scale-[0.98] ${
                  agreedToTerms && !isSaving
                    ? "bg-[#C5A96A] text-black"
                    : "cursor-not-allowed bg-white/10 text-white/30"
                }`}
              >
                {isSaving
                  ? "Creating Ticket..."
                  : "Go To My Fan Ticket"}
              </button>

              <button
                type="button"
                onClick={closeSaveModal}
                disabled={isSaving}
                className="w-full py-2 text-sm font-semibold text-white/50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}