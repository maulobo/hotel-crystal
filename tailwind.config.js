/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cyan:     { 300: 'var(--cyan-300)', 500: 'var(--cyan-500)' },
        brand:    { 500: 'var(--blue-500)', 600: 'var(--blue-600)', 700: 'var(--blue-700)' },
        graphite: 'var(--graphite)',
        ink:      { 800: 'var(--ink-800)', 900: 'var(--ink-900)' },
        paper:    { DEFAULT: 'var(--paper)', 2: 'var(--paper-2)' },
        slate:    { 300: 'var(--slate-300)', 400: 'var(--slate-400)', 600: 'var(--slate-600)' },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        ctl:  'var(--radius-ctl)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}