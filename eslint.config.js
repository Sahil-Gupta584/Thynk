import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import unusedImports from "eslint-plugin-unused-imports";
import reactRefresh from "eslint-plugin-react-refresh";
import autoImport from "eslint-plugin-auto-import";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "unused-imports": unusedImports,
      "react-refresh": reactRefresh,
      "auto-import": autoImport,
    },
    settings: {
      "import/resolver": {
        node: {
          exportsFields: ["exports", "require"],
        },
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "semi": ["warn", "always"],
      "quotes": ["warn", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "eqeqeq": ["warn", "smart"],
      "no-alert": "error",
      "semi-spacing": ["warn", { before: false, after: true }],
      "default-case": "warn",
      "wrap-regex": "warn",
      "no-useless-rename": ["error", { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": ["warn", { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }]
    },
    env: {
      browser: true,
      node: true,
    },
  }
];
