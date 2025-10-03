import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        coverage: {
            reporter: ['text', 'html']
        },
        browser: {
            name: "chromium",
            enabled: true,
            provider: "playwright",
            instances: [
                { browser: "chromium" }
            ]
        }
    }
})
