import { test as base, expect, Page } from '@playwright/test';
import { CalculatorPage, EstimationPreview } from '../pageObject';

const test = base.extend<{
    calculatorPage: CalculatorPage;
    estimationPreview: (page: Page) => EstimationPreview;
    projectName: string;
}>({
    calculatorPage: async ({ page, isMobile }, use) => {
        const calculatorPageInstance = new CalculatorPage(page, isMobile);
        await calculatorPageInstance.open();
        await use(calculatorPageInstance);
    },
    estimationPreview: async ({}, use) => {
        const estimationPreviewInstance = (newPage: Page) => new EstimationPreview(newPage);
        await use(estimationPreviewInstance);
    },
    projectName: async ({}, use, testInfo) => {
        await use(testInfo.project.name);
    },
});

export { test, expect };
