/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#166563",
        darkGreenDark: "#166563",
        mediumGreen: " #88c2ac",
        mediumGreenDark: "#2a3a3a",
        lighterGreen: "#ebf1f0fa",
        lightGreen: "#e6ede9",
        lightGreenDark: "#122323",
        orange: "#f69d3e",
        orangeDark: "#d08214",
        darkGray: "#333333",
        darkGrayDark: "#7a7a7a",
        lightGray: "#dddddd",
        lightDrayDark: "#dddddd",
        redMedium: "#de7c7c",
        redLight: "#de8c8c",
        headerText: "#595959",
        headerTextDark: "#cacaca",
        midnightMoss: "#252927",
      },
      width: {
        "modal-width": "var(--modal-width)",
      },
    },
  },
  plugins: [],
};
