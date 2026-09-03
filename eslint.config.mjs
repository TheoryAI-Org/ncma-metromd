import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  // `next lint` only ever linted the app source directories; keep that scope so
  // the vendored design-handoff bundles under local-files/ stay out of the report.
  globalIgnores([
    ".next/**",
    "local-files/**",
    "public/**",
    "image-slot.js",
    "support.js",
  ]),
  {
    files: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}", "types/**/*.{ts,tsx}", "data/**/*.{ts,tsx}"],
    extends: [...nextCoreWebVitals, ...nextTypescript],
  },
]);
