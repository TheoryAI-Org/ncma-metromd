import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-archivo)", "Archivo", "system-ui", "sans-serif"],
    },
  	extend: {
  		colors: {
  			ink: 'var(--color-text)',
  			surface: 'var(--color-surface)',
  			divider: 'var(--color-divider)',
  			navy: 'var(--navy)',
  			neutral: {
  				'100': 'var(--color-neutral-100)',
  				'200': 'var(--color-neutral-200)',
  				'300': 'var(--color-neutral-300)',
  				'400': 'var(--color-neutral-400)',
  				'500': 'var(--color-neutral-500)',
  				'600': 'var(--color-neutral-600)',
  				'700': 'var(--color-neutral-700)',
  				'800': 'var(--color-neutral-800)',
  				'900': 'var(--color-neutral-900)'
  			},
  			brand: {
  				DEFAULT: 'var(--color-accent)',
  				'100': 'var(--color-accent-100)',
  				'200': 'var(--color-accent-200)',
  				'300': 'var(--color-accent-300)',
  				'400': 'var(--color-accent-400)',
  				'500': 'var(--color-accent-500)',
  				'600': 'var(--color-accent-600)',
  				'700': 'var(--color-accent-700)',
  				'800': 'var(--color-accent-800)',
  				'900': 'var(--color-accent-900)'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		screens: {
  			'nav': '1000px',
  			'md2': '1040px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
