import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

export default defineConfig({
  root: __dirname,
  build: {
    outDir: '../../dist/main',
    emptyOutDir: true,
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    minify: process.env./* from mode option */ NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      external: ['electron', ...builtinModules, ...Object.keys(pkg.dependencies || {})],
    },
  },
})
