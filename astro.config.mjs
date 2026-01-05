// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});

// module.exports = {
//   darkMode: 'class', // o 'media', pero 'class' te da más control
//   content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }