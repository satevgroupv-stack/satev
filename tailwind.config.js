export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0E1A40",
          deep: "#0A1330",
          light: "#16255A",
        },
        neon: {
          DEFAULT: "#FF7101",
        },
        silver: {
          DEFAULT: "#D9D9D9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 113, 1, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 113, 1, 0.6)" },
        },
        "gradient-drift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        "gradient-drift": "gradient-drift 18s ease infinite",
      },
    },
  },
  plugins: [],
};
