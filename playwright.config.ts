import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests/',
    timeout: 10000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: [['html', { outputFolder: 'pw-report', open: 'on-failure'}], ['list']],
    use: {
        baseURL: 'https://cloud.google.com/',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure', 
    },
    outputDir: 'pw-tests-results',
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1280, height: 720 },
                launchOptions: {
                    args: ['--window-position=0,0'],
                },
            },
        },
    ],
});
