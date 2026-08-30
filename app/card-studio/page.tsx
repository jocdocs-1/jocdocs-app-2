"use client";

import { useRef, useState } from "react";
import AthleteCard from "../components/cards/AthleteCard";
import type { Athlete } from "../data/athletes";
import { supabase } from "../lib/supabaseClient";
import { toPng } from "html-to-image";

export default function CardStudioPage() {
  const [cardId, setCardId] = useState("");
  const [studioAthlete, setStudioAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const frontExportRef = useRef<HTMLDivElement>(null);
const backExportRef = useRef<HTMLDivElement>(null);
const [isExporting, setIsExporting] = useState(false);
const [exportFace, setExportFace] = useState<"front" | "back">("front");
const [isHeroAnimating, setIsHeroAnimating] = useState(false);
const [showHeroShimmer, setShowHeroShimmer] = useState(false);
const [isRecordingVideo, setIsRecordingVideo] = useState(false);
const videoCanvasRef = useRef<HTMLCanvasElement>(null);

const loadCard = async () => {
  const enteredValue = cardId.trim();

  if (!enteredValue) {
    setError("Enter an Athlete Card ID or URL.");
    return;
  }

  const uuidMatch = enteredValue.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
  );

  if (!uuidMatch) {
    setError("Could not find a valid Athlete Card ID.");
    return;
  }

  const id = uuidMatch[0];

    setLoading(true);
    setError("");

    try {
const { data, error: supabaseError } = await supabase
  .from("cards")
  .select(
    "id, name, school, sport, action_image_url, portrait_image_url, card_data"
  )
  .eq("id", id)
  .maybeSingle();

if (supabaseError) {
  console.error("SUPABASE CARD ERROR:", supabaseError);
  throw supabaseError;
}

if (!data) {
  throw new Error("Card not found.");
}

const loadedAthlete: Athlete = {
  ...(data.card_data ?? {}),
  id: data.id,

  name:
    data.card_data?.name ??
    data.name ??
    "",

  school:
    data.card_data?.school ??
    data.school ??
    "",

  primarySport:
    data.card_data?.primarySport ??
    data.sport ??
    "",

  theme:
    data.card_data?.theme ??
    "gold",

actionImage:
  data.card_data?.actionImage ||
  data.action_image_url ||
  "",

portraitImage:
  data.card_data?.portraitImage ||
  data.card_data?.profileImage ||
  data.portrait_image_url ||
  "",

profileImage:
  data.card_data?.profileImage ||
  data.card_data?.portraitImage ||
  data.portrait_image_url ||
  "",
};

      setStudioAthlete(loadedAthlete);
    } catch (err) {
      console.error("CARD STUDIO LOAD ERROR:", err);
      setStudioAthlete(null);
      setError("Could not load that Athlete Card.");
    } finally {
      setLoading(false);
    }
  };

const waitForImages = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll("img"));

  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        });
      }

      try {
        await img.decode();
      } catch {
        // Image may already be decoded or browser may not support decode cleanly.
      }
    })
  );

  const elements = [element, ...Array.from(element.querySelectorAll("*"))];

  const backgroundUrls = elements
    .map((el) => window.getComputedStyle(el).backgroundImage)
    .filter((backgroundImage) => backgroundImage && backgroundImage !== "none")
    .flatMap((backgroundImage) => {
      return Array.from(
        backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)
      ).map((match) => match[1]);
    });

  await Promise.all(
    backgroundUrls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image();

          image.onload = () => resolve();
          image.onerror = () => resolve();

          image.src = url;

          if (image.complete) {
            resolve();
          }
        })
    )
  );

  // Give loaded images and CSS backgrounds time to paint before capture.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
};

  const exportFrontPng = async () => {
  if (!studioAthlete?.id) return;

  setIsExporting(true);
  setError("");
  setExportFace("front");

  try {
    const response = await fetch(
      `/api/card-studio-export?id=${encodeURIComponent(
        studioAthlete.id
      )}&face=front`
    );

    if (!response.ok) {
      throw new Error("Front PNG capture failed.");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const safeName =
      studioAthlete.name
        ?.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "athlete";

    const link = document.createElement("a");

    link.download = `${safeName}-jocdocs-front.png`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("CARD STUDIO FRONT EXPORT ERROR:", err);
    setError("Could not export the Athlete Card.");
  } finally {
    setIsExporting(false);
  }
};

const exportBackPng = async () => {
  if (!studioAthlete?.id) return;

  setIsExporting(true);
  setError("");
  setExportFace("back");

  try {
    const response = await fetch(
      `/api/card-studio-export?id=${encodeURIComponent(
        studioAthlete.id
      )}&face=back`
    );

    if (!response.ok) {
      throw new Error("Back PNG capture failed.");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const safeName =
      studioAthlete.name
        ?.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "athlete";

    const link = document.createElement("a");

    link.download = `${safeName}-jocdocs-back.png`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("CARD STUDIO BACK EXPORT ERROR:", err);
    setError("Could not export the back of the Athlete Card.");
  } finally {
    setIsExporting(false);
  }
};

const replayHeroAnimation = async () => {
  if (!studioAthlete || isHeroAnimating) return;

  setIsHeroAnimating(true);
  setError("");
  setExportFace("front");
  setShowHeroShimmer(false);

  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    setShowHeroShimmer(true);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    setShowHeroShimmer(false);
    setExportFace("back");

    await new Promise((resolve) => setTimeout(resolve, 1900));

    setExportFace("front");

    await new Promise((resolve) => setTimeout(resolve, 900));
  } finally {
    setShowHeroShimmer(false);
    setExportFace("front");
    setIsHeroAnimating(false);
  }
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load recording frame."));
    img.src = src;
  });

  const downloadHeroVideo = async () => {
  if (
    !frontExportRef.current ||
    !backExportRef.current ||
    !videoCanvasRef.current ||
    !studioAthlete ||
    isRecordingVideo
  ) {
    return;
  }

  setIsRecordingVideo(true);
  setError("");

  try {
    const frontPng = await toPng(frontExportRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      width: 310,
      height: 530,
    });

    const backPng = await toPng(backExportRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      width: 310,
      height: 530,
    });

    const frontImage = await loadImage(frontPng);
    const backImage = await loadImage(backPng);

    const canvas = videoCanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not prepare video canvas.");
    }

    const stream = canvas.captureStream(60);

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
      videoBitsPerSecond: 12_000_000,
    });

    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const safeName =
      studioAthlete.name
        ?.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "athlete";

    const drawFrame = (
      image: HTMLImageElement,
      scaleX = 1,
      shimmerProgress: number | null = null
    ) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(scaleX, 1);

const overscan = 1.03;

const drawWidth = canvas.width * overscan;
const drawHeight = canvas.height * overscan;

ctx.drawImage(
  image,
  -canvas.width / 2,
  -canvas.height / 2,
  canvas.width,
  canvas.height
);

      ctx.restore();

if (shimmerProgress !== null) {
  const width = canvas.width;
  const height = canvas.height;

  // Match the Card Studio CSS preview exactly.
  const shimmerWidth = width * 0.16;
  const shimmerHeight = height * 2.4;

  const baseLeft = -width * 0.70;
  const baseTop = -height * 0.55;

  // CSS translate percentages are relative to the shimmer element itself.
  const translateX =
    (-1.2 * shimmerWidth) +
    ((11 * shimmerWidth) - (-1.2 * shimmerWidth)) *
      shimmerProgress;

  const translateY =
    (-0.30 * shimmerHeight) +
    ((0.45 * shimmerHeight) - (-0.30 * shimmerHeight)) *
      shimmerProgress;

  const centerX =
    baseLeft +
    shimmerWidth / 2 +
    translateX;

  const centerY =
    baseTop +
    shimmerHeight / 2 +
    translateY;

  const gradient = ctx.createLinearGradient(
    -shimmerWidth / 2,
    0,
    shimmerWidth / 2,
    0
  );

  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.35)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.save();

  ctx.translate(centerX, centerY);
  ctx.rotate((18 * Math.PI) / 180);

  // 3px preview blur, doubled because video canvas is 2× card size.
  ctx.filter = "blur(6px)";
  ctx.fillStyle = gradient;

  ctx.fillRect(
    -shimmerWidth / 2,
    -shimmerHeight / 2,
    shimmerWidth,
    shimmerHeight
  );

  ctx.restore();
}
    };

    const animate = (
      duration: number,
      render: (progress: number) => void
    ) =>
      new Promise<void>((resolve) => {
        const start = performance.now();

        const frame = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);

          render(progress);

          if (progress < 1) {
            requestAnimationFrame(frame);
          } else {
            resolve();
          }
        };

        requestAnimationFrame(frame);
      });

    recorder.start();

    drawFrame(frontImage);

    await new Promise((resolve) => setTimeout(resolve, 350));

drawFrame(frontImage);

await new Promise((resolve) => setTimeout(resolve, 800));

    await animate(800, (progress) => {
      const scaleX = Math.cos(progress * Math.PI);

      if (progress < 0.5) {
        drawFrame(frontImage, Math.abs(scaleX));
      } else {
        drawFrame(backImage, Math.abs(scaleX));
      }
    });

    drawFrame(backImage);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    await animate(900, (progress) => {
      const scaleX = Math.cos(progress * Math.PI);

      if (progress < 0.5) {
        drawFrame(backImage, Math.abs(scaleX));
      } else {
        drawFrame(frontImage, Math.abs(scaleX));
      }
    });

    drawFrame(frontImage);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    recorder.stop();

    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    const videoBlob = new Blob(chunks, {
      type: "video/webm",
    });

    const videoUrl = URL.createObjectURL(videoBlob);

    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `${safeName}-jocdocs-hero.webm`;
    link.click();

    URL.revokeObjectURL(videoUrl);
  } catch (err) {
    console.error("CARD STUDIO VIDEO ERROR:", err);
    setError("Could not create the Hero video.");
  } finally {
    setIsRecordingVideo(false);
  }
};

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-black uppercase tracking-[0.08em]">
            Card Studio
          </h1>

          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#C5A96A]">
            jocdocs marketing asset studio
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-[520px]">
          <div className="flex gap-2">
            <input
              type="text"
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  loadCard();
                }
              }}
              placeholder="Paste Athlete Card ID"
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#C5A96A]"
            />

            <button
              type="button"
              onClick={loadCard}
              disabled={loading}
              className="rounded-xl bg-[#C5A96A] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-black transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load Card"}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-center text-sm text-red-400">{error}</p>
          )}
        </div>

{studioAthlete ? (
  <div>
    <div className="flex justify-center">
      <div className="relative w-full max-w-[520px]">
<AthleteCard
  athlete={studioAthlete}
  isOwnCard={true}
  collectionCount={0}
  fansCount={0}
  frontExportRef={frontExportRef}
backExportRef={backExportRef}
  exportMode={true}
  forceFace={exportFace}
/>
{showHeroShimmer && (
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
<div
  className="absolute -left-[70%] -top-[55%] h-[240%] w-[16%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent blur-[3px] animate-[cardStudioShimmer_0.8s_linear_forwards]"
/>
  </div>
)}
      </div>
    </div>

<div className="mt-7 flex flex-wrap justify-center gap-3">
  <button
    type="button"
    onClick={exportFrontPng}
    disabled={isExporting}
    className="rounded-xl bg-[#C5A96A] px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-black transition active:scale-[0.98] disabled:opacity-50"
  >
    {isExporting && exportFace === "front"
      ? "Exporting..."
      : "Download Front PNG"}
  </button>

  <button
    type="button"
    onClick={exportBackPng}
    disabled={isExporting}
    className="rounded-xl border border-[#C5A96A] bg-black px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#C5A96A] transition active:scale-[0.98] disabled:opacity-50"
  >
    {isExporting && exportFace === "back"
      ? "Exporting..."
      : "Download Back PNG"}
  </button>
</div>
<div className="mt-3 flex justify-center">
  <button
    type="button"
    onClick={replayHeroAnimation}
    disabled={isHeroAnimating || isExporting}
    className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-white/10 active:scale-[0.98] disabled:opacity-50"
  >
    {isHeroAnimating
      ? "Playing Hero Animation..."
      : "Replay Hero Animation"}
  </button>
</div>

<div className="mt-3 flex justify-center">
  <button
    type="button"
    onClick={downloadHeroVideo}
    disabled={isRecordingVideo || isHeroAnimating || isExporting}
    className="rounded-xl bg-white px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-black transition active:scale-[0.98] disabled:opacity-50"
  >
    {isRecordingVideo
      ? "Creating Hero Video..."
      : "Download Hero Video"}
  </button>
</div>
  </div>
) : (
          <div className="mx-auto flex min-h-[530px] max-w-[520px] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02]">
            <p className="text-center text-sm uppercase tracking-[0.16em] text-white/35">
              Load an Athlete Card to begin
            </p>
          </div>
        )}

<canvas
  ref={videoCanvasRef}
  width={620}
  height={1060}
  className="hidden"
/>

<p className="mt-6 text-center text-xs uppercase tracking-[0.16em] text-white/40">
  Card Studio — Development Tool
</p>

<style jsx>{`
@keyframes cardStudioShimmer {
  0% {
    transform: translate(-120%, -30%) rotate(18deg);
    opacity: 0;
  }

  6% {
    opacity: 1;
  }

  94% {
    opacity: 1;
  }

  100% {
    transform: translate(1100%, 45%) rotate(18deg);
    opacity: 0;
  }
}
`}</style>

</div>
</main>
  );
}