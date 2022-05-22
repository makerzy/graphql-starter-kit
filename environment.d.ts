declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      DB_URI: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
