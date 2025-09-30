import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Support both GEMINI_API_KEY (preferred) and legacy API_KEY
    const gemini = env.GEMINI_API_KEY || env.API_KEY || '';
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(gemini),
        'process.env.GEMINI_API_KEY': JSON.stringify(gemini)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
