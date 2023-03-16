/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: "postcss-html",
  extends: [
    require.resolve("./sass"),
    require.resolve("stylelint-config-recommended-vue"),
  ],
};
