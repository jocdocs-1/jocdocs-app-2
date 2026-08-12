"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import FanTicket from "../../components/cards/FanTicket";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";
import NavigationButton from "../../components/navigation/NavigationButton";

type FanRecord = {
  id: string;
  name: string;
  photo_url: string | null;
};

export default function EditFanPage() {
  const router = useRouter();
  const params = useParams();

  const tokenParam = params?.token;
  const editToken = Array.isArray(tokenParam)
    ? tokenParam[0]
    : tokenParam;

  const [fanId, setFanId] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (!editToken) {
      return;
    }

    async function loadFanTicket() {
      setIsLoading(true);
      setLoadError("");

      try {
        const { data, error } = await supabase
          .from("fans")
          .select("id, name, photo_url")
          .eq("edit_token", editToken)
          .single();

        if (error) {
          throw error;
        }

        const fan = data as FanRecord;

        setFanId(fan.id);
        setName(fan.name || "");
        setPhoto(fan.photo_url || "");
        setOriginalPhotoUrl(fan.photo_url || null);
      } catch (error) {
        console.error("Fan Ticket load error:", error);

        setLoadError(
          "We could not find this Fan Ticket. The edit link may be invalid."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadFanTicket();
  }, [editToken]);

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
    event: ChangeEvent<HTMLInputElement>
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

  async function updateFanTicket() {
    const cleanedName = name.trim();

    setSaveError("");

    if (!cleanedName) {
      setSaveError(
        "Please enter your name before updating your Fan Ticket."
      );

      return;
    }

    if (!fanId || !editToken) {
      setSaveError(
        "This Fan Ticket could not be identified. Please reopen your edit link."
      );

      return;
    }

    setIsSaving(true);

    try {
      let photoUrl = originalPhotoUrl;

      /*
        A data URL means the fan selected a new photo.

        A normal https URL means the existing Supabase photo
        is still being used and should not be uploaded again.
      */
      if (photo.startsWith("data:")) {
        const photoFileName =
          `fan-tickets/${crypto.randomUUID()}-profile.jpg`;

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

      const { error: updateError } = await supabase
        .from("fans")
        .update({
          name: cleanedName,
          photo_url: photoUrl,
        })
        .eq("id", fanId)
        .eq("edit_token", editToken);

      if (updateError) {
        throw updateError;
      }

      router.push(`/fan/${fanId}`);
    } catch (error) {
      console.error("Fan Ticket update error:", error);

      setSaveError(
        "Your Fan Ticket could not be updated. Please try again."
      );

      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <p className="text-sm font-semibold text-white/60">
          Loading your Fan Ticket...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-black text-white">
        <main className="flex min-h-[75vh] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg text-center">
            <h1 className="text-3xl font-extrabold">
              Edit Link Not Found
            </h1>

            <p className="mt-4 leading-relaxed text-white/60">
              {loadError}
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-8 rounded-2xl bg-[#C5A96A] px-7 py-4 text-base font-extrabold uppercase tracking-[0.08em] text-black"
            >
              Back to jocdocs
            </button>
          </div>
        </main>

        <Footer theme="dark" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
  <main className="relative px-6 pb-10 pt-20">
        <div className="mx-auto max-w-5xl">
          <NavigationButton
  type="back"
  onClick={() => window.history.back()}
/>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* EDIT FORM */}
            <section>
              <h1 className="mb-1 text-3xl font-bold">
  Edit Your Fan Ticket
</h1>

<p className="mb-8 text-sm leading-tight text-white/70">
  Update your name or profile photo and watch your Fan Ticket change instantly.
</p>

<div className="space-y-5">
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
                    Replace Profile Photo
                  </label>

                  <input
                    id="fan-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="input"
                  />

                  <p className="mt-2 text-xs leading-relaxed text-white/40">
                    Leave this unchanged to keep your current photo.
                    A clear, centered portrait will look best.
                  </p>
                </div>

                {saveError && (
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
                    onClick={updateFanTicket}
                    disabled={isSaving}
                    className={`w-full rounded-2xl px-6 py-4 text-[18px] font-extrabold uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(197,169,106,0.35)] transition active:scale-[0.98] ${
                      isSaving
                        ? "cursor-not-allowed bg-[#C5A96A]/50"
                        : "bg-[#C5A96A]"
                    }`}
                  >
                    {isSaving
                      ? "Updating Fan Ticket..."
                      : "Update Fan Ticket"}
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
    </div>
  );
}