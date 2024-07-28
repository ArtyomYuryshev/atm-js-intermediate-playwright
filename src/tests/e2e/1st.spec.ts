import { test, Page } from '@playwright/test';
import { CalculatorPage } from '../../pageObject';

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    let page: Page;
    let calculatorPageInstance: CalculatorPage;


    test.beforeEach(async ({ page: newPage }) => {
        page = newPage;
        calculatorPageInstance = new CalculatorPage(page);
        await calculatorPageInstance.open();
    });

    test('Should be able to open "Add to this estimate" pop-up', async () => {
    });

});
