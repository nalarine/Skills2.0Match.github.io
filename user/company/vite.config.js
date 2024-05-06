import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

// const backendUrl =
//   import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8800'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        // ...
      },

      // esbuild options, to transform jsx to js
      esbuildOptions: {
        // ...
      },

      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include. By default all svg files will be included.
      include: '**/*.svg?react',

      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
      exclude: '',
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: backendUrl,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, 'api-v1'),
  //     },
  //   },
  // },
})
