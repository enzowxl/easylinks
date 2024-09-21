import type { Config } from 'tailwindcss'

// @ts-ignore
// eslint-disable-next-line import/no-named-default
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purplePrimary: '#7C7AFF',
        washedPrimary: '#B5B2FF',
        dark: '#09090B',
        'purple-primary-50': '#f2f2ff',
        'purple-primary-100': '#d6d6ff',
        'purple-primary-200': '#c3c2ff',
        'purple-primary-300': '#a7a6ff',
        'purple-primary-400': '#9695ff',
        'purple-primary-500': '#7c7aff',
        'purple-primary-600': '#716fe8',
        'purple-primary-700': '#5857b5',
        'purple-primary-800': '#44438c',
        'purple-primary-900': '#34336b',
        'washed-primary-50': '#f8f7ff',
        'washed-primary-100': '#e8e7ff',
        'washed-primary-200': '#dddcff',
        'washed-primary-300': '#cdcbff',
        'washed-primary-400': '#c4c1ff',
        'washed-primary-500': '#b5b2ff',
        'washed-primary-600': '#a5a2e8',
        'washed-primary-700': '#817eb5',
        'washed-primary-800': '#64628c',
        'washed-primary-900': '#4c4b6b',
        'neutrals-1': '#fdfdfd',
        'neutrals-2': '#f5f5f5',
        'neutrals-3': '#f0f0f0',
        'neutrals-4': '#dadada',
        'neutrals-5': '#c2c2c2',
        'neutrals-6': '#909091',
        'neutrals-7': '#5f5f60',
        'neutrals-8': '#4b4b4d',
        'neutrals-9': '#2e2e30',
        'neutrals-10': '#272728',
        'neutrals-11': '#1d1d1f',
        'neutrals-12': '#131315',
        'neutrals-13': '#09090b',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors],
}

// @ts-ignore
function addVariablesForColors({ addBase, theme }: unknown) {
  const allColors = flattenColorPalette(theme('colors'))
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

export default config
