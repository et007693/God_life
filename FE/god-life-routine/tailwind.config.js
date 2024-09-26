/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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

