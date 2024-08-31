import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const rpConfig = {
    apiKey: process.env.RP_API_KEY,
    endpoint: 'https://reportportal.epam.com/api/v1',
    project: process.env.RP_PROJECT,
    launch: `ATM-INTERMEDIATE Test Run - ${new Date().toISOString()}`,
    attributes: [
        {
            key: 'browser',
            value: 'chrome',
        },
    ],
    description: 'ATM-INTERMEDIATE project',
    debug: false,
    restClientConfig: {
        timeout: 0,
    },
};

export default defineConfig({
    testDir: './src/tests/',
    timeout: 30000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'pw-reports/html', open: 'never' }],
        ['junit', { outputFile: 'pw-reports/junit/results.xml' }],
        ['@reportportal/agent-js-playwright', rpConfig],
    ],
    use: {
        baseURL: 'https://cloud.google.com/',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    expect: {
        toHaveScreenshot: {
            maxDiffPixels: 100,
        },
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
