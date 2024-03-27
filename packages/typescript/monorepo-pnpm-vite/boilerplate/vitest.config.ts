import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    clearMocks: true,
    restoreMocks: true,
    environment: 'node',
    // setupFiles: ['./vitest.setup.ts'],
    include: ['packages/**/*.{test,spec}.ts'],
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      reporter: ['text', 'lcov'],
    },
  },
})
