import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.viabhron.maos',
  appName: 'Viabhron',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
