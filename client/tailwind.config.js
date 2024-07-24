/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "5rem",
      },
    },

    extend: {
      colors: {
        primary: "#9A0000",
        secondary: "#005e99",
        btnhoverP: "#c60000",
        btnactiveP: "#670000",
        btnhoverBg: "#ffa6a6",
        primaryTxt: "#383434",
        readmore: "#005E99",
      },
      boxShadow: {
        "dark-sm": "0 1px 2px 0 rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [require("daisyui")],
};
