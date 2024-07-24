import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../../pageObject/calculator-page';
import { EstimationPreview } from '../../pageObject/estimation-preview';

let calculatorPageInstance: CalculatorPage;
let estimationPreview: EstimationPreview;

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        calculatorPageInstance = new CalculatorPage(page);
        await calculatorPageInstance.open();
    });

    test.afterAll(async ({ browser }) => {
        await calculatorPageInstance.close();
        await browser.close();
    });

    test('Should be able to open "Add to this estimate" pop-up', async () => {
        const addEstimateButton = calculatorPageInstance.addEstimateButton;
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        const addEstimationModalWindow = calculatorPageInstance.addEstimationModalWindow;
        await expect(addEstimationModalWindow).toBeVisible();
    });

    test('Should be able to open "Compute Engine" screen', async () => {
        const computeEngineElement = calculatorPageInstance.computeEngineElement;
        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        const configurationBlock = calculatorPageInstance.configurationBlock;
        await expect(configurationBlock).toBeVisible();
    });

    test('Should add Instance to Cost details after opening calculator', async () => {
        const firstInstances = calculatorPageInstance.firstInstances;
        await firstInstances.waitFor();
        await expect(firstInstances).toBeVisible();

        const oneInstancesCostUSD: string = '$138.70';
        await expect(calculatorPageInstance.costInHeader).toHaveText(oneInstancesCostUSD);
    });

    test('Should be able to add two new instances', async () => {
        const addNewInstanceButton = calculatorPageInstance.incrementInstances;
        for (let i = 0; i < 2; i++) {
            await addNewInstanceButton.click();
        }

        const threeInstancesCostUSD: string = '$417.30';
        await expect(calculatorPageInstance.costInHeader).toHaveText(threeInstancesCostUSD);
    });

    test('Should open "Share Estimate" pop-up', async () => {
        await calculatorPageInstance.shareButton.click();

        await expect(calculatorPageInstance.shareEstimatePopup).toBeVisible();
        await expect(calculatorPageInstance.openEstimationSummaryLink).toBeVisible();
    });

    test('Should open estimation summary in new tab', async ({ browser }) => {
        const [newPage] = await Promise.all([
            browser.contexts()[0].waitForEvent('page'),
            calculatorPageInstance.openEstimationSummaryLink.click(),
        ]);

        await newPage.waitForLoadState();
        estimationPreview = new EstimationPreview(newPage);

        const summary = estimationPreview.summarySection;
        await expect(summary).toBeVisible();
        await expect(estimationPreview.summaryCost).toHaveText('$417.30');
    });
});
