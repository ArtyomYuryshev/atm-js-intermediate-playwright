import { test as base, expect, Page } from '@playwright/test';
import { CalculatorPage, EstimationPreview } from '../pageObject';

const test = base.extend<{
    calculatorPage: CalculatorPage;
    estimationPreview: (page: Page) => EstimationPreview;
}>({
    calculatorPage: async ({ page }, use) => {
        const calculatorPageInstance = new CalculatorPage(page);
        await calculatorPageInstance.open();
        await use(calculatorPageInstance);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    estimationPreview: async ({ page }, use) => {
        const estimationPreviewInstance = (newPage: Page) => new EstimationPreview(newPage);
        await use(estimationPreviewInstance);
    },
});

export { test, expect };
