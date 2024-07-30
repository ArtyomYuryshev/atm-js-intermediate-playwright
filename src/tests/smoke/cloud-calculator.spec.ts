import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    test('Should be able to open "Add to this estimate" pop-up', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await expect(calculatorPage.addEstimationModalWindow).toBeVisible();
    });

    test('Should be able to open "Compute Engine" screen', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();

        await expect(calculatorPage.configurationBlock).toBeVisible();
    });

    test('Should add Instance to Cost details after opening calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();

        await calculatorPage.firstInstances.waitFor();
        await expect(calculatorPage.firstInstances).toBeVisible();

        const oneInstancesCostUSD: string = '$138.70';
        await expect(calculatorPage.costInHeader).toHaveText(oneInstancesCostUSD);
    });

    test('Should be able to add two new instances', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();

        for (let i = 0; i < 2; i++) {
            await calculatorPage.incrementInstances.click();
        }

        const threeInstancesCostUSD: string = '$417.30';
        await expect(calculatorPage.costInHeader).toHaveText(threeInstancesCostUSD);
    });

    test('Should open "Share Estimate" pop-up', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();

        await calculatorPage.shareButton.click();

        await expect(calculatorPage.shareEstimatePopup).toBeVisible();
        await expect(calculatorPage.openEstimationSummaryLink).toBeVisible();
    });

    test('Should open estimation summary in new tab', async ({
        calculatorPage,
        estimationPreview,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();

        await calculatorPage.shareButton.click();

        const [newPage] = await Promise.all([
            calculatorPage.getPage().context().waitForEvent('page'),
            calculatorPage.openEstimationSummaryLink.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');

        const estimationPreviewInstance = estimationPreview(newPage);
        const summary = estimationPreviewInstance.summarySection;

        await summary.waitFor({ state: 'visible' });
        await expect(summary).toBeVisible();

        const summaryCost = estimationPreviewInstance.summaryCost;
        await summaryCost.waitFor({ state: 'visible' });
        await expect(summaryCost).toHaveText('$138.70');
    });
});
