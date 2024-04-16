/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {

      },
      colors: {
        main: '#5fcf86',
      },
      boxShadow: {
        'custom': '0 8px 24px 12px rgba(0,0,0,.08), 0 20px 24px -4px rgba(0,0,0,.08)',
      },
      fontFamily: {
        parfumerie: ['"Parfumerie Script Pro"', 'cursive'],
        copperlove: ['Copperlove', 'cursive'],
        greatvibes: ["Great Vibes", 'cursive'],
        dancingscript: ["Dancing Script", 'cursive'],
        opensans: ["Open Sans", 'sans-serif'],
      },
    },
  },
  plugins: [],
}