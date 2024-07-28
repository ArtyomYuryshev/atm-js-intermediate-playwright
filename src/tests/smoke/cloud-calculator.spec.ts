import { test, expect, Page } from '@playwright/test';
import { CalculatorPage, EstimationPreview } from '../../pageObject';

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    let page: Page;
    let calculatorPageInstance: CalculatorPage;
    let estimationPreview: EstimationPreview;

    test.beforeEach(async ({ page: newPage }) => {
        page = newPage;
        calculatorPageInstance = new CalculatorPage(page);
        await calculatorPageInstance.open();
    });

    test('Should be able to open "Add to this estimate" pop-up', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await expect(calculatorPageInstance.addEstimationModalWindow).toBeVisible();
    });

    test('Should be able to open "Compute Engine" screen', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await calculatorPageInstance.computeEngineElement.waitFor();
        await calculatorPageInstance.computeEngineElement.click();

        await expect(calculatorPageInstance.configurationBlock).toBeVisible();
    });

    test('Should add Instance to Cost details after opening calculator', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await calculatorPageInstance.computeEngineElement.waitFor();
        await calculatorPageInstance.computeEngineElement.click();

        await calculatorPageInstance.firstInstances.waitFor();
        await expect(calculatorPageInstance.firstInstances).toBeVisible();

        const oneInstancesCostUSD: string = '$138.70';
        await expect(calculatorPageInstance.costInHeader).toHaveText(oneInstancesCostUSD);
    });

    test('Should be able to add two new instances', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await calculatorPageInstance.computeEngineElement.waitFor();
        await calculatorPageInstance.computeEngineElement.click();

        for (let i = 0; i < 2; i++) {
            await calculatorPageInstance.incrementInstances.click();
        }

        const threeInstancesCostUSD: string = '$417.30';
        await expect(calculatorPageInstance.costInHeader).toHaveText(threeInstancesCostUSD);
    });

    test('Should open "Share Estimate" pop-up', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await calculatorPageInstance.computeEngineElement.waitFor();
        await calculatorPageInstance.computeEngineElement.click();

        await calculatorPageInstance.shareButton.click();

        await expect(calculatorPageInstance.shareEstimatePopup).toBeVisible();
        await expect(calculatorPageInstance.openEstimationSummaryLink).toBeVisible();
    });

    test('Should open estimation summary in new tab', async () => {
        await calculatorPageInstance.addEstimateButton.waitFor();
        await calculatorPageInstance.addEstimateButton.click();

        await calculatorPageInstance.computeEngineElement.waitFor();
        await calculatorPageInstance.computeEngineElement.click();

        await calculatorPageInstance.shareButton.click();

        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
            calculatorPageInstance.openEstimationSummaryLink.click(),
        ]);

        await newPage.waitForLoadState();
        estimationPreview = new EstimationPreview(newPage);

        const summary = estimationPreview.summarySection;
        await expect(summary).toBeVisible();
        await expect(estimationPreview.summaryCost).toHaveText('$138.70');
    });
});
