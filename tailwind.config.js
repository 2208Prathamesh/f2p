/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#070A13",
        charcoal: "#0E111B",
        panel: "#121826",
        steel: "#1B2233",
        highlight: "#8B5CF6",
        accent: "#22D3EE",
        gold: "#FBBF24"
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.35)",
        card: "0 18px 40px rgba(8, 12, 22, 0.65)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top, rgba(139, 92, 246, 0.35), rgba(7, 10, 19, 0.9) 55%), linear-gradient(130deg, rgba(7, 10, 19, 0.95), rgba(18, 24, 38, 0.95))",
      }
    },
  },
  plugins: [],
};
