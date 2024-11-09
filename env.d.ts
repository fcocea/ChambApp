export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly EXPO_PUBLIC_API_URL: string;
    }
  }
}
