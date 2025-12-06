// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";
import tailwindcss from "eslint-plugin-tailwindcss";

export default defineConfig([
  ...next(),

  {
    plugins: {
      tailwindcss,
    },
    rules: {
      "tailwindcss/no-arbitrary-value": "off", // TẮT WARNING "can be written as"
      "tailwindcss/classnames-order": "off", // Không bắt sắp xếp class
      "tailwindcss/no-custom-classname": "off", // Tắt luôn cảnh báo custom class
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
