/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#1a202c",
          text: "#f7fafc",
        },
      },
    },
  },
  plugins: [],
};
