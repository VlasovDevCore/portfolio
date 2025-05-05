/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "dark-cast": "#0d0f12",
        "white-cast": "#dae9ff",
      },
      animation: {
        // Плавное появление + небольшой "подскок"
        modalEnter: "modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // Затемнение фона
        fadeIn: "fadeIn 0.3s ease-out",
        // Эффект "поп" при появлении
        popIn: "popIn 0.35s ease-out",
      },
      keyframes: {
        modalEnter: {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "80%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
