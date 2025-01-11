import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        icterine: '#fbfd5d',
        cinder: '#25292f',
        telemagenta: '#da3675',
        fountainBlue: '#61c2bc',
        stormDust: '#636363',
      },
      maxWidth: {
        'pageWidth': '1440px'
      }
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
      wide: ['var(--font-krona)'],
      condensed: ['var(--font-bebas)'],
    },
  },
  plugins: [],
}
export default config
