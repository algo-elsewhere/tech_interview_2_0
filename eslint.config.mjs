import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**/*",
      "next-env.d.ts",
      "node_modules/**/*",
      "*.tsbuildinfo",
      "*.config.js",
      "*.config.ts",
      "docs/_site/**/*",
      "docs/.jekyll-cache/**/*",
      "coverage/**/*",
      ".nyc_output/**/*"
    ]
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "prefer-const": "error",
    }
  }
];

export default eslintConfig;