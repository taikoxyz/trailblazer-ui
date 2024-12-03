import daisyuiPlugin from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing: {
        // Custom spacing values
        7.5: '1.875rem', // 30px
        8.75: '2.1875rem', // 35px
        12.5: '3.125rem', // 50px
        32.5: '8.125rem', // 130px
      },
      fontSize: {
        // Custom font sizes
        '50px': '50px',
        '34.695px': '34.695px',
      },
      letterSpacing: {
        // Custom letter-spacing
        '7.817px': '7.817px',
        '1.735px': '1.735px',
      },
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1362px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1512px',
        // => @media (min-width: 1512px) { ... }
      },
      keyframes: {
        'slide-right': {
          '0%': { transform: 'translateX(-14px)' },
          '100%': { transform: 'translateX(14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            opacity: '1',
          },
          '20%, 24%, 55%': {
            opacity: '0.5',
          },
        },
        'flip-y': {
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'slide-right': 'slide-right 0.3s ease-in-out',
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        'flip-card': 'flip-y 1s ease-in-out infinite',
        flicker: 'flicker 2.5s infinite alternate',
      },
      colors: {
        'partner-light': '#FFE7F6',
        'partner-dark': '#310e2f',

        /***************
         * Base colors *
         ***************/

        blue: {
          0: '#FFFFFF',
          5: '#F3F8FF',
          10: '#E7F1FF',
          50: '#C1DFFF',
          100: '#8DC4FF',
          200: '#5AAAFF',
          300: '#2C8FFF',
          400: '#006AFF',
          500: '#0052CC',
          600: '#003E99',
          700: '#002966',
          800: '#001833',
          900: '#000C0D',
          1000: '#050912',
        },

        grey: {
          0: '#FFFFFF',
          5: '#FAFAFA',
          10: '#F3F3F3',
          50: '#E3E3E3',
          100: '#CACBCE',
          200: '#ADB1B8',
          300: '#91969F',
          400: '#767C89',
          500: '#5D636F',
          600: '#444A55',
          700: '#2B303B',
          800: '#191E28',
          900: '#0B101B',
          1000: '#050912',
        },

        pink: {
          0: '#FFFFFF',
          5: '#FFF8FC',
          10: '#FFE7F6',
          50: '#FFC6E9',
          100: '#FF98D8',
          200: '#FF6FC8',
          300: '#FF40B6',
          400: '#E81899',
          500: '#C8047D',
          600: '#9A0060',
          700: '#7D004E',
          800: '#4B002F',
          900: '#240017',
          1000: '#050912',
        },

        purple: {
          1000: 'rgb(27 14 62)',
          900: '#1B0E3E',
          600: '#5D08C8',
        },

        red: {
          0: '#FFFFFF',
          5: '#FEF5F5',
          10: '#FFE7E7',
          50: '#FFC5C5',
          100: '#FF9B9C',
          200: '#FD7576',
          300: '#F15C5D',
          400: '#DB4546',
          500: '#CE2C2D',
          600: '#BB1A1B',
          700: '#790102',
          800: '#440000',
          900: '#250000',
          1000: '#050912',
        },

        green: {
          0: '#FFFFFF',
          5: '#F2FFFA',
          10: '#E4FFF4',
          50: '#BFFFE4',
          100: '#89FFCD',
          200: '#65F0B6',
          300: '#47E0A0',
          400: '#2DCA88',
          500: '#19BA76',
          600: '#059458',
          700: '#005E36',
          800: '#00321D',
          900: '#001C10',
          1000: '#050912',
        },

        yellow: {
          0: '#FFFFFF',
          5: '#FFFCF3',
          10: '#FFF6DE',
          50: '#FFEAB5',
          100: '#FFDC85',
          200: '#FFCF55',
          300: '#F8C23B',
          400: '#EBB222',
          500: '#DBA00D',
          600: '#C28B00',
          700: '#775602',
          800: '#382800',
          900: '#201700',
          1000: '#050912',
        },

        /*******************
         * Semantic colors *
         *******************/

        primary: {
          DEFAULT: 'var(--primary-brand)',
          brand: 'var(--primary-brand)',
          content: 'var(--primary-content)',
          link: {
            DEFAULT: 'var(--primary-link)',
            hover: 'var(--primary-link-hover)',
          },
          icon: 'var(--primary-icon)',
          background: 'var(--primary-background)',

          interactive: {
            DEFAULT: 'var(--primary-interactive)',
            accent: 'var(--primary-interactive-accent)',
            hover: 'var(--primary-interactive-hover)',
          },
          border: {
            DEFAULT: 'var(--primary-border)',
            dark: 'var(--primary-border-dark)',
            hover: 'var(--primary-border-hover)',
            accent: 'var(--primary-border-accent)',
          },

          base: {
            content: 'var(--primary-base-content)',
            background: 'var(--primary-base-background)',
          },
        },

        secondary: {
          DEFAULT: 'var(--secondary-brand)',
          'warm-yellow': 'var(--secondary-warm-yellow)',
          brand: 'var(--secondary-brand)',
          content: 'var(--secondary-content)',
          icon: 'var(--secondary-icon)',
          interactive: {
            accent: 'var(--primary-interactive-accent)',
            hover: 'var(--secondary-interactive-hover)',
          },
        },

        tertiary: {
          content: 'var(--tertiary-content)',
          interactive: {
            accent: 'var(--tertiary-interactive-accent)',
          },
        },

        positive: {
          sentiment: 'var(--positive-sentiment)',
          background: 'var(--positive-background)',
        },

        negative: {
          sentiment: 'var(--negative-sentiment)',
          background: 'var(--negative-background)',
        },

        warning: {
          sentiment: 'var(--warning-sentiment)',
          background: 'var(--warning-background)',
        },

        dialog: {
          background: 'var(--dialog-background)',
          interactive: {
            disabled: 'var(--dialog-dialog-interactive-disabled)',
          },
        },

        neutral: {
          DEFAULT: 'var(--neutral-background)',
          background: 'var(--neutral-background)',
          content: 'var(--neutral-content)',
        },

        'gradient-pink': 'var(--gradient-pink)',
        'elevated-background': 'var(--elevated-background)',
        'neutral-background': 'var(--neutral-background)',
        'overlay-background': 'var(--overlay-background)',

        'divider-border': 'var(--divider-border)',
      },
      maxWidth: {
        section: '1362px',
      },
    },
  },

  extend: {
    backgroundColor: ['aria-selected'],
    textColor: ['aria-selected'],
  },
  plugins: [
    daisyuiPlugin,
    function ({ addUtilities }) {
      const newUtilities = {
        '.stroke-1': {
          '-webkit-text-stroke-width': '1px',
        },
        '.stroke-2': {
          '-webkit-text-stroke-width': '2px',
        },
        '.stroke-3': {
          '-webkit-text-stroke-width': '3px',
        },
        '.stroke-4': {
          '-webkit-text-stroke-width': '4px',
        },
        /* Neon Green Text Stroke */
        '.text-stroke-neon-green': {
          '-webkit-text-stroke-color': 'var(--neon-green-color)',
          'text-stroke-color': 'var(--neon-green-color)',
        },

        /* Neon Red Text Stroke */
        '.text-stroke-neon-red': {
          '-webkit-text-stroke-color': 'var(--neon-red-color)',
          'text-stroke-color': 'var(--neon-red-color)',
        },

        /* Neon Blue Text Stroke */
        '.text-stroke-neon-blue': {
          '-webkit-text-stroke-color': 'var(--neon-blue-color)',
          'text-stroke-color': 'var(--neon-blue-color)',
        },

        /* Neon Green Drop Shadow */
        '.drop-shadow-neon-green': {
          filter: `
            drop-shadow(0 0 3px rgba(93, 222, 181, 0.4))
            drop-shadow(0 0 6px rgba(93, 222, 181, 0.4))
            drop-shadow(0 0 9px rgba(93, 222, 181, 0.1))
          `,
        },
        /* Neon Blue Drop Shadow */
        '.drop-shadow-neon-blue': {
          filter: `
            drop-shadow(0 0 3px rgba(30, 184, 255, 0.8))
            drop-shadow(0 0 6px rgba(30, 184, 255, 0.4))
            drop-shadow(0 0 9px rgba(30, 184, 255, 0.1))
          `,
        },
        /* Neon Red Drop Shadow */
        '.drop-shadow-neon-red': {
          filter: `
            drop-shadow(0 0 3px rgba(255, 90, 30, 0.8))
            drop-shadow(0 0 6px rgba(255, 113, 91, 0.4))
            drop-shadow(0 0 9px rgba(255, 113, 91, 0.1))
          `,
        },
        '.fancy-background': {
          background:
            'var(--influence-button, linear-gradient(177deg, #5D08C8 -59.85%, #9F00B8 36.97%, #CA00A8 133.8%, #E81899 230.62%))',
        },
        '.multiplier-background': {
          background:
            'var(--Gradient-Pink-purple, linear-gradient(236deg, #5D08C8 -23.1%, #9F00B8 20.64%, #CA00A8 64.38%, #E81899 108.12%))',
        },
      };
      addUtilities(newUtilities);
    },
  ],

  // https://daisyui.com/docs/config/
  daisyui: {
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themes: [
      {
        dark: {
          'color-scheme': 'dark',
          '--btn-text-case': 'capitalize',
          // '--rounded-box': '0.625rem', // 10px

          '--primary-brand': '#C8047D', // pink-500
          '--primary-content': '#F3F3F3', // grey-10
          '--primary-link': '#FF6FC8', // pink-200
          '--primary-link-hover': '#FFC6E9', // pink-50
          '--primary-icon': '#CACBCE', // grey-100
          '--primary-background': '#0B101B', // grey-900
          '--primary-interactive': '#C8047D', // pink-500
          '--primary-interactive-accent': '#E81899', // pink-400
          '--primary-interactive-hover': '#E81899', // pink-400
          '--primary-border-hover': '#FF6FC8', // pink-200
          '--primary-border-dark': '#5D636F', // grey-500
          '--primary-border-accent': '#E81899', // pink-400
          '--primary-base-background': '#FFFFFF', // grey-0
          '--primary-base-content': '#191E28', // grey-800

          '--secondary-brand': '#E81899', // pink-400
          '--secondary-content': '#ADB1B8', // grey-200
          '--secondary-icon': '#2B303B', // grey-700
          '--secondary-warm-yellow': '#FFE2A0', // grey-700

          '--secondary-interactive-accent': '#2B303B', // grey-700
          '--secondary-interactive-hover': '#ADB1B8', // grey-200

          '--tertiary-content': '#5D636F', // grey-500
          '--tertiary-interactive-accent': '#5D636F', // grey-500
          '--tertiary-interactive-hover': '#444A55', // grey-600

          '--positive-sentiment': '#47E0A0', // green-300
          '--positive-background': '#00321D', // green-800

          '--negative-sentiment': '#F15C5D', // red-300
          '--negative-background': '#440000', // red-800

          '--warning-sentiment': '#EBB222', // yellow-400
          '--warning-background': '#382800', // yellow-800

          '--elevated-background': '#191E28', // grey-800
          '--neutral-background': '#2B303B', // grey-700
          '--neutral-content': '#2B303B', // grey-800
          '--neutral-accent': '#2B303B', // grey-700
          '--overlay-background': 'rgba(12, 17, 28, 0.5)', // grey-900|50%
          '--overlay-dialog': 'rgba(12, 17, 28, 0.90)', // grey-900|90%
          '--divider-border': '#444A55', // grey-600

          '--dialog-background': '#2B303B', // grey-700
          '--dialog-dialog-interactive-disabled': '#444A55', // grey-600
          '--gradient-pink': 'linear-gradient(to right, #EA36A4 0%, #F997D0 100%)',

          '--neon-green-color': '#5DDEB5',
          '--neon-red-color': '#FF715B',
          '--neon-blue-color': '#5AAAFF',

          // ================================ //

          primary: '#C8047D', // pink-500,
          'primary-focus': '#E81899', // pink-400
          'primary-content': '#F3F3F3', // grey-10

          secondary: '#E81899', // pink-400
          // 'secondary-focus': '',
          'secondary-content': '#ADB1B8', // grey-200

          neutral: '#2B303B', // grey-700
          'neutral-focus': '#444A55', // grey-600
          'neutral-content': '#F3F3F3', // grey-10

          'base-100': '#0B101B', // grey-900
          'base-200': '#F8F8F8',
          // 'base-300': '',
          'base-content': '#F3F3F3', // grey-10

          success: '#00321D', // green-800
          'success-content': '#47E0A0', // green-300
          error: '#440000', // red-800
          'error-content': '#F15C5D', // red-300
          warning: '#382800', // yellow-800
          'warning-content': '#EBB222', // yellow-400
        },
      },
    ],
  },
};
