// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: '#5F6FFF',
          },
          gridTemplateColums:{
            'auto':'repeat(auto-fill,minmax(200px,1fr))'
          }
        },
      },
    }),
  ],
  server:{port:5173}
});





