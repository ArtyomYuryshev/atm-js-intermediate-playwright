import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests/',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html', { outputFolder: 'pw-report' }], ['list']],
    use: {
        baseURL: 'https://cloud.google.com/',
        trace: 'retain-on-failure',
    },
    outputDir: 'pw-tests-results',
    projects: [
        {
            name: 'chromium',
            use: { 
                ...devices['Desktop Chrome'],
                viewport: { width: 1280, height: 720 },
                launchOptions: {
                    args:[
                        '--window-position=0,0'
                    ]
                }
            },
        },
    ],
});
