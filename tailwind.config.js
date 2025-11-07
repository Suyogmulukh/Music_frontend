/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    // Add paths to your template files
  ],
  theme: {
    extend: {
      // Extend the default theme here
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...other plugins
  ],
};
