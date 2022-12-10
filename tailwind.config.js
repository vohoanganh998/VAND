const { colors: defaultColors } = require("tailwindcss/defaultTheme");
const colors = {
  ...defaultColors,
  ...{
    neutrals: {
      900: "#141417",
      800: "#2a2a30",
      700: "#3f3f49",
      600: "#555562",
      500: "#6b6b7b",
      400: "#828292",
      300: "#9b9ba8",
      200: "#b4b4be",
      100: "#E9E9EC",
      50: "#f6f6f8",
    },
  },
};

const padding = {
  '12p': '12px',
  '14p': '14px',
  '16p': '16px', 
  '24p': '24px',
};

const borderWidth = {
  DEFAULT: "1px",
  3: "3px",
  5: "5px",
};

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.vue"],
  },
  darkMode: false, // or 'media' or 'class'

  theme: {
    colors: colors,
    extend: { borderWidth, padding },
  },

  plugins: [],
};
