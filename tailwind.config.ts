import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#1E4A40",
          700: "#2F6B5E",
          400: "#6FA394",
          100: "#E4EFEB",
        },
        accent: {
          600: "#D97540",
          400: "#E98A4E",
          100: "#FBE4D2",
        },
        cream: "#FBF7F0",
        ink: {
          900: "#2A2A2A",
          600: "#6B6B6B",
          300: "#D8D2C8",
        },
        success: { DEFAULT: "#5C9271", bg: "#E7F0EA" },
        warning: "#D9A441",
        error: "#C1594A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        label: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 32px -12px rgba(30, 74, 64, 0.18)",
      },
      borderRadius: {
        card: "20px",
        input: "12px",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
