module.exports = {
  "src/**/*.{js,css,md,ts,tsx,json}": "prettier --write",
  "**/*.ts?(x)": () => "tsc",
};
