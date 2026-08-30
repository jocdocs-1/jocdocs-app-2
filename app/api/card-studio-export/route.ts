import { chromium } from "playwright";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const id = searchParams.get("id");
  const face = searchParams.get("face") === "back" ? "back" : "front";

  if (!id) {
    return new Response("Missing card ID.", { status: 400 });
  }

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage({
      viewport: {
        width: 334,
        height: 554,
      },
      deviceScaleFactor: 4,
    });

    const captureUrl =
      `${origin}/card-studio/capture` +
      `?id=${encodeURIComponent(id)}` +
      `&face=${face}`;

    await page.goto(captureUrl, {
      waitUntil: "networkidle",
    });

    await page.waitForSelector(
      '[data-capture-ready="true"]',
      { state: "visible" }
    );

    await page.evaluate(async () => {
      await document.fonts.ready;

      const images = Array.from(document.images);

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
            // Image is already decoded or browser handled it.
          }
        })
      );
    });

    // Force the capture document to be transparent
    // and remove Next.js development UI from local screenshots.
    await page.evaluate(() => {
      document.documentElement.style.background = "transparent";
      document.body.style.background = "transparent";

      const captureCard = document.getElementById("capture-card");

      if (captureCard) {
        captureCard.style.background = "transparent";
      }

      document.querySelectorAll("nextjs-portal").forEach((el) => {
        el.remove();
      });
    });

    // Allow one final browser paint before taking the real screenshot.
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
          });
        })
    );

    const card = page.locator("#capture-card");

    const png = await card.screenshot({
      type: "png",
      omitBackground: true,
    });

    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await browser.close();
  }
}
