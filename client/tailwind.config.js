/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      // => @media (min-width: 400px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
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
      backgroundImage: {
        "my-gradient":
          "linear-gradient(270deg, rgba(255, 211, 211, 0.3) 0%, rgba(215, 240, 255, 0.3) 100%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
