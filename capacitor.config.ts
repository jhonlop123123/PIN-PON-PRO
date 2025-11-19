
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pinpon.app',
  appName: 'PinPon',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
