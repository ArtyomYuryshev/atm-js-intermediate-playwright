import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    test('Should be able to open "Add to this estimate" pop-up', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await expect(calculatorPage.addEstimatePopup.addEstimationModalWindow).toBeVisible();
    });

    test('Should be able to open "Compute Engine" screen', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await expect(calculatorPage.configurationComponent.configurationBlock).toBeVisible();
    });

    test('Should add Instance to Cost in Header after opening calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.costDetails.instanceCard.waitFor();
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();

        const oneInstancesCostUSD: string = '$138.70';
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText(
            oneInstancesCostUSD,
        );
    });

    test('Should be able to add two new instances', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.configurationComponent.numberOfInstancesIncrementButton.dblclick();

        const threeInstancesCostUSD: string = '$417.30';
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText(
            threeInstancesCostUSD,
        );
    });

    test('Should open "Share Estimate" pop-up', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.costDetails.shareButton.click();

        await expect(calculatorPage.costDetails.shareEstimatePopup).toBeVisible();
        await expect(calculatorPage.costDetails.openEstimationSummaryLink).toBeVisible();
    });

    test('Should open estimation summary in new tab', async ({
        calculatorPage,
        estimationPreview,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.costDetails.shareButton.click();

        const [newPage] = await Promise.all([
            calculatorPage.getPage().context().waitForEvent('page'),
            calculatorPage.costDetails.openEstimationSummaryLink.click(),
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
