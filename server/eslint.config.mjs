import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        process: "readonly", // Adding process as a global
      },
    },
    ignores: [
      'node_modules/',
      "dist",
      // Add any other paths you want ESLint to ignore
    ],
    rules: {
      // Customize rules as needed
      'no-console': 'warn', // Change no-console to warn level
      // 'indent': ['error', 2], // Example: enforce 2-space indentation
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-undef': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];