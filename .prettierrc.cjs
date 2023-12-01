module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSameLine: true,
  semi: true,
  endOfLine: "auto",

  tailwindConfig: "./tailwind.config.cjs",
  tailwindFunctions: ["clsx", "tw"],

  plugins: ["prettier-plugin-tailwindcss"],
};
