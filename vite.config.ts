
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
      // Polyfill buffer if needed by web3.js, though usually handled by the browser via Vite's internals or explicit polyfill packages
      // For simple implementations, letting Vite handle module resolution is safest.
    }
  }
});
