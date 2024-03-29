import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vanthe.smartapp',
  appName: 'tsh',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
