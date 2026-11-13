import js from "@eslint/js";
import globals from "globals";
import config from "eslint-config-prettier";
import plugin from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
    config,
    plugin,
  },
]);
