import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "worker-web-2026",
    "compatibilityDate": "2026-09-25",
    "observability": {
      "enabled": true
    }
  }
});
