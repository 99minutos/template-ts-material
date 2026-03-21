import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import oxlintPlugin from 'vite-plugin-oxlint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [oxlintPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            },
            {
              name: 'mui-vendor',
              test: /[\\/]node_modules[\\/](@mui[\\/]material|@mui[\\/]icons-material|@emotion[\\/]react|@emotion[\\/]styled)[\\/]/,
            },
            {
              name: 'form-vendor',
              test: /[\\/]node_modules[\\/](react-hook-form|@hookform[\\/]resolvers|zod)[\\/]/,
            },
            {
              name: 'utils-vendor',
              test: /[\\/]node_modules[\\/](lodash|date-fns|axios|classnames)[\\/]/,
            },
          ],
        },
      },
    },
    sourcemap: true,
  },
});
