/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      //   // primary: "#0C4064",
      //   // primary: "#062338",
      //   primary:"#072e4a",
      //   // secondary: "#E30713",
      //   secondary:"#f62929",
      //   tiers:'rgba(6,35,56,.05)',
      //   '--color-action':"blue"
      // },
      colors: {
        primary: {
          DEFAULT: '#1d3557',
          light: '#457b9d',
          dark: '#0b223d'
        },
        secondary: {
          DEFAULT: '#e63946',
          light: '#ffccd1',
          dark: '#b52a35'
        },
        accent: '#06d6a0',
        background: '#f8f9fa',
        surface: '#ffffff',
        text: {
          primary: '#0b304a',
          secondary: '#6c757d'
        },
        success: '#38b000',
        warning: '#ffb703',
        error: '#e63946'
      },

      fontSize: {
        clamp: 'clamp(2rem, 7vw, 3rem)'
      },
      padding: {
        lg: '6rem',
        md: '5rem',
        xl: '3.6rem'
      },
      borderColor: {
        DEFAULT: '#8383852b'
      },
      backgroundImage: {
        'soft-gradient':
          ' radial-gradient(rgb(210, 241, 223, 0.2), rgb(211, 215, 250, 0.2), rgb(186, 216, 244, 0.2))'
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'fade-out': { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
        'fade-slide-down': {
          '0%': { opacity: 0, transform: 'translate(-50%, -60%)' }, // départ plus haut
          '100%': { opacity: 1, transform: 'translate(-50%, -50%)' } // centre exact
        },
        'fade-slide-up': {
          '0%': { opacity: 1, transform: 'translate(-50%, -50%)' },
          '100%': { opacity: 0, transform: 'translate(-50%, -60%)' } // remonte en fade
        }
      },
      animation: {
        'fade-slide-down':
          'fade-slide-down 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-slide-up':
          'fade-slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 300ms ease-out forwards',
        'fade-out': 'fade-out 300ms ease-in forwards',
        'gradient-move': 'gradientMove 15s ease infinite'
      }
    }
  },
  plugins: []
}
