/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // primary: "#0C4064",
        primary: "#062338",
        secondary: "#E30713",
        tiers:'rgba(6,35,56,.05)',
        '--color-action':"blue"
      },
      fontSize: {
        'clamp': 'clamp(2rem, 7vw, 3rem)',
      },
      padding: {
        lg:'6rem',
        md: '5rem',
        xl:'3.6rem'
      }
    },
  },
  plugins: [],
}

