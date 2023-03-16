/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    require.resolve("stylelint-config-standard"),
    require.resolve("stylelint-config-recess-order"),
    require.resolve("stylelint-config-tailwindcss"),
  ],
};
