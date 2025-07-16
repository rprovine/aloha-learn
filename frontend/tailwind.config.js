/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hawaiian-inspired color palette
        ocean: {
          light: '#5EEAD4',
          DEFAULT: '#14B8A6',
          dark: '#0F766E',
          deep: '#115E59'
        },
        sunset: {
          light: '#FED7AA',
          DEFAULT: '#FB923C',
          dark: '#EA580C',
          vibrant: '#DC2626'
        },
        tropical: {
          light: '#BBF7D0',
          DEFAULT: '#4ADE80',
          dark: '#16A34A',
          forest: '#15803D'
        },
        sand: {
          light: '#FEF3C7',
          DEFAULT: '#FDE047',
          warm: '#FACC15'
        },
        hawaiian: {
          purple: '#8B5CF6',
          pink: '#EC4899'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hawaiian-gradient': 'linear-gradient(135deg, #14B8A6 0%, #FB923C 100%)',
        'ocean-gradient': 'linear-gradient(to bottom, #5EEAD4 0%, #0F766E 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #FED7AA 0%, #DC2626 100%)',
      },
      animation: {
        'wave': 'wave 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}