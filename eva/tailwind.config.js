/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- NEW YOUTH-FRIENDLY BRAND COLORS ---
        'brand-primary': {
          50: '#e0f7fa',  // Lightest teal
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',  // Main primary teal
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',  // Darkest teal
        },
        'brand-accent': {
          50: '#fff3e0',  // Lightest amber
          100: '#ffe0b2',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa726',
          500: '#ff9800',  // Main accent orange
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',  // Darkest orange
        },
        'brand-secondary': {
          50: '#f3e5f5',  // Lightest purple
          100: '#e1bee7',
          200: '#ce93d8',
          300: '#ba68c8',
          400: '#ab47bc',
          500: '#9c27b0',  // Main secondary purple
          600: '#8e24aa',
          700: '#7b1fa2',
          800: '#6a1b9a',
          900: '#4a148c',  // Darkest purple
        },
        'brand-neutral': {
          50: '#fafafa',   // Lightest gray
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',   // Mid gray
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',   // Darkest gray
        },

        // --- Keep some of the old names if you prefer, mapped to new colors ---
        'brand-sky': {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', // Now teal
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        'brand-red': {
          500: '#ff9800', // Now orange
          600: '#fb8c00',
          700: '#f57c00',
          800: '#ef6c00',
          900: '#e65100',
        },
      },
      
      // Keep or update gradients if needed
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, theme("colors.brand-primary.500"), theme("colors.brand-primary.700"))',
        'accent-gradient': 'linear-gradient(135deg, theme("colors.brand-accent.500"), theme("colors.brand-accent.700"))',
        'secondary-gradient': 'linear-gradient(135deg, theme("colors.brand-secondary.500"), theme("colors.brand-secondary.700"))',
      },
      
      // Typography enhancements
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      // Animation enhancements
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}