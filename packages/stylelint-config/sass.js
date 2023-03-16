/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    require.resolve("./css"),
    require.resolve("stylelint-config-standard-scss"),
    require.resolve("stylelint-config-tailwindcss/scss"),
  ],
};
