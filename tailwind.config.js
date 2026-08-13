/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nitro: {
          bg: '#070709',
          card: '#101116',
          border: '#1f212a',
          red: '#ff3b00',
          redGlow: 'rgba(255, 59, 0, 0.4)',
          accent: '#ff5522',
          blue: '#3b82f6',
          purple: '#6366f1',
          text: '#f8fafc',
          muted: '#94a3b8',
          subtle: '#475569',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
    },
  },
  plugins: [],
};
