/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'iPad': '1024px',
        // => @media (min-width: 1024px) { ... }
        'SmallLaptop': '1280px',
        // => @media (min-width: 1280px) { ... }
        'Laptop': '1366px',
        // => @media (min-width: 1366px) { ... }
        'Desktop': '1920px',
        // => @media (min-width: 1920px) { ... }
        '2K': '2560px',
        // => @media (min-width: 2560px) { ... }
        '4K': '3840px',
        // => @media (min-width: 3840px) { ... }
      },
    },
  },
  plugins: [],
}
