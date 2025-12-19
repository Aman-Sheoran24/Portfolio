/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C18",
        card: "#12142a",
        primary: "#be4bff",
        secondary: "#ff63c3",
        accent: "#00ced1",
        muted: "#b0b0c0",
      },
  boxShadow: {
    neon: "0 0 40px rgba(190,75,255,0.45)",
  },
  borderRadius: {
    xl: "18px",
  },

    }
  },
  plugins: []
};
