/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tall': {'raw': '(min-height: 800px)'},
        'very-tall': {'raw': '(min-height: 1000px)'},
      },
      fontSize: {
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '32px'],
      },      
      height: {
        'real-screen': 'calc(var(--vh,1vh) * 100)',
      },
      minHeight: {
        'real-screen': 'calc(var(--vh,1vh) * 100)',
      },
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

