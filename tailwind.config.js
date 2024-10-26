/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2F80ED",
        borderGray: "rgba(0, 0, 0, 0.15)"
      }
    }
  },
  plugins: []
};
