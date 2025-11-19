import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Polyfills for Node.js globals required by Solana/Gemini libraries
  define: {
    'process.env': {},
    'global': 'window',
  },
  resolve: {
    alias: {
      // Polyfill buffer if needed by web3.js
    }
  }
});