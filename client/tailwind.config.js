/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container:{
      padding: {
        sm: "1rem",
        md: "3rem",
        lg: "8rem"
      }
    }
  },
  plugins: [],
};
