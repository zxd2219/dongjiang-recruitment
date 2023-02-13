require("@rushstack/eslint-patch/modern-module-resolution");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["node_modules/", "dist/", "types/"],
};
