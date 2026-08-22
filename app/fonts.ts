import localFont from "next/font/local";
import { Roboto_Condensed, Allison } from "next/font/google";


export const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});


export const allison = Allison({
  subsets: ["latin"],
  weight: "400",
});


export const frederickSans = localFont({
  src: "./fonts/FrederickSans.otf",
  display: "swap",
});


export const barlowCondensed = localFont({
  src: [
    {
      path: "./fonts/BarlowCondensed-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/BarlowCondensed-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/BarlowCondensed-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BarlowCondensed-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
});