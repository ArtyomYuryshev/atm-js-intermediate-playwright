import { test, expect } from '@playwright/test';
import { DesmosCalculatorPage } from '../../pageObject/desmosCalculatorPO/desmos-calculator-page';

let desmosCalculator: DesmosCalculatorPage;

test.beforeEach(async ({ page }) => {
    desmosCalculator = new DesmosCalculatorPage(page);
    await desmosCalculator.goto();
});

test.describe('Desmos Calculator. Test Case 1: Opening a Graph from Templates', () => {
    test('Should to check Graph preview in menu', async ({}) => {
        await desmosCalculator.menuButton.click();
        await desmosCalculator.examplesListItem.first().click();

        await expect(desmosCalculator.graphPreview).toBeVisible();
        await expect(desmosCalculator.graphPreview).toHaveScreenshot('template-graph-preview.png');
    });

    test('Should to check Graph', async ({}) => {
        await desmosCalculator.menuButton.click();
        await desmosCalculator.examplesListItem.first().click();
        await desmosCalculator.openGraphButton.click();
        await desmosCalculator.hideExpressionButton.click();

        await expect(desmosCalculator.graph).toBeVisible();
        await expect(desmosCalculator.graph).toHaveScreenshot('template-graph.png');
    });
});

test.describe('Desmos Calculator. Check manually created Graph', () => {
    test('Should create a Graph manually', async ({}) => {
        await desmosCalculator.addExpression('y=x^2');
        await desmosCalculator.hideExpressionButton.click();
        await expect(desmosCalculator.graph).toHaveScreenshot('manual-graph.png');
    });
});
