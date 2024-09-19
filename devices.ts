import { devices } from '@playwright/test';

const desktopDevices = [
    {
        name: 'chromium',
        use: {
            ...devices['Desktop Chrome'],
            viewport: { width: 1280, height: 720 },
            launchOptions: {
                args: ['--window-position=0,0', '--window-size=1280,720'],
            },
            isMobile: false,
        },
    },
];

const mobileDevices = [
    {
        name: 'iOS Mobile 17.5',
        use: {
            ...devices['iPhone 12'],
            viewport: { width: 390, height: 844 },
            userAgent:
                'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
            isMobile: true,
        },
    },
    {
        name: 'Android Mobile 14.0',
        use: {
            ...devices['Pixel 5'],
            viewport: { width: 1080, height: 2340 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 14.0; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36',
            isMobile: true,
        },
    },
    {
        name: 'Android Mobile 13.0',
        use: {
            ...devices['Pixel 5'],
            viewport: { width: 1080, height: 2340 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 13.0; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36',
            isMobile: true,
        },
    },
    {
        name: 'Android Mobile 12.0',
        use: {
            ...devices['Pixel 5'],
            viewport: { width: 1080, height: 2340 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 12.0; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36',
            isMobile: true,
        },
    },
    {
        name: 'Android Mobile 11.0',
        use: {
            ...devices['Pixel 5'],
            viewport: { width: 1080, height: 2340 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 11.0; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36',
            isMobile: true,
        },
    },
];

const tabletDevices = [
    {
        name: 'iOS Tablet 17.5',
        use: {
            ...devices['iPad (gen 7)'],
            viewport: { width: 810, height: 1080 },
            userAgent:
                'Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
            isMobile: false,
        },
    },
    {
        name: 'Android Tablet 14.0',
        use: {
            ...devices['Galaxy Tab S4'],
            viewport: { width: 2560, height: 1600 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 14.0; SM-T830) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            isMobile: false,
        },
    },
    {
        name: 'Android Tablet 13.0',
        use: {
            ...devices['Galaxy Tab S4'],
            viewport: { width: 2560, height: 1600 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 13.0; SM-T830) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            isMobile: false,
        },
    },
    {
        name: 'Android Tablet 12.0',
        use: {
            ...devices['Galaxy Tab S4'],
            viewport: { width: 2560, height: 1600 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 12.0; SM-T830) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            isMobile: false,
        },
    },
    {
        name: 'Android Tablet 11.0',
        use: {
            ...devices['Galaxy Tab S4'],
            viewport: { width: 2560, height: 1600 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 11.0; SM-T830) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            isMobile: false,
        },
    },
    {
        name: 'Android Tablet 9.0 Pie',
        use: {
            ...devices['Galaxy Tab S4'],
            viewport: { width: 2560, height: 1600 },
            userAgent:
                'Mozilla/5.0 (Linux; Android 9.0; SM-T830) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
            isMobile: false,
        },
    },
];

export { desktopDevices, mobileDevices, tabletDevices };
