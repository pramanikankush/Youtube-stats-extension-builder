// Environment configuration
export const env = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'YouTube Stats Tracker Builder',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

// Type-safe environment variable access
export const getEnvVar = (key: keyof typeof env): string => {
  const value = env[key];
  if (!value && import.meta.env.PROD) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value as string;
};