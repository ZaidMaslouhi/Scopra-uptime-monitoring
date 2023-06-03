interface ImportMetaEnv {
  readonly NODE_ENV: "development" | "production";
  readonly VITE_TOKEN: string;
  readonly VITE_CLIENT_ID: number;

  readonly VITE_WEBSOCKET_URI: string;

  readonly VITE_BACKEND_API_USER: string;
  readonly VITE_BACKEND_API_PROJECT: string;
  readonly VITE_BACKEND_API_MONITOR: string;

  readonly VITE_GITHUB_API_KEY: string;

  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
