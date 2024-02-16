/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232429",
        grayLight: "#F4F5F6",
      },
      textColor: {
        primary: "#121316",
        secondary: "#525560",
      },
      borderColor: {
        primary: "#BABCC4",
        form: "#D6D7DC",
        info: "#B7DDFF",
      },
      placeholderColor: {
        primary: "#838795",
      },
      fontSize: {
        lg: ["16px", "28px"],
        xl: ["20px", "30px"],
      },
    },
  },
  plugins: [],
};
