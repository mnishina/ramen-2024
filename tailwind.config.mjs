import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Shippori Antique B1", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "vw-xs": "clamp(10px, calc(12 / 430 * 100vw), 24px)",
        "vw-xs-pc": "clamp(10px, calc(12 / 1440 * 100lvw), 24px)",
        "vw-s": "clamp(10px, calc(12 / 1440 * 100lvw), 24px)",
        "vw-10": "clamp(10px, calc(10 / 1440 * 100lvw), 14px)",
        "vw-12": "clamp(12px, calc(12 / 1440 * 100lvw), 24px)",
        "vw-14": "clamp(12px, calc(14 / 1440 * 100lvw), 28px)",
        "vw-15": "clamp(12px, calc(15 / 1440 * 100lvw), 30px)",
        "vw-24": "clamp(12px, calc(24 / 1440 * 100lvw), 48px)",
        "vw-36": "clamp(18px, calc(36 / 1440 * 100lvw), 72px)",
        "vw-40": "clamp(20px, calc(40 / 1440 * 100lvw), 80px)",
        "vw-80": "clamp(40px, calc(80 / 1440 * 100lvw), 160px)",
        "vw-96": "clamp(48px, calc(96 / 1440 * 100lvw), 192px)",
        "vw-104": "clamp(52px, calc(104 / 1440 * 100lvw), 208px)",
      },
      gridTemplateColumns: {
        detail: "repeat(31, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        detail: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
