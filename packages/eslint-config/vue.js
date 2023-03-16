/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve("./ts"), "plugin:vue/vue3-recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "typescript-eslint-parser-for-extra-files",
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      parser: "@typescript-eslint/parser",
    },
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
  },
};
