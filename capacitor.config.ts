import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SkeletonAPP',
  webDir: 'www',
  plugins: {
 GoogleMaps: {
      apiKey: 'TU_API_KEY_DE_GOOGLE_MAPS'  // Reemplaza con tu API real
    }
  }
};

export default config;

