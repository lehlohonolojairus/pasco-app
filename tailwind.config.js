/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {    
      fontFamily: {
        sans: ["Inter", "Roboto", "SF Pro", "Arial", "sans-serif"],
      },
    
      borderRadius: {
        card: "12px",
        btn: "8px",
        bubble: "16px",
        avatar: "9999px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
