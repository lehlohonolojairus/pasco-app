/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        pasco: {
          purple: {
            DEFAULT: "#6B2FA0",   // main PASCO purple
            dark: "#4B1F75",      // sidebar purple
            light: "#8F4CC7",     // lighter accents
            soft: "#EDE7F6",      // backgrounds
          },
          orange: {
            DEFAULT: "#FF8A00",   // main accent
            light: "#FFB74D",
          },
          gray: {
            text: "#4A4A4A",
            light: "#F5F5F5",
            border: "#E0E0E0",
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Arial", "sans-serif"],
      },
      boxShadow: {
        pasco: "0 4px 20px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
