import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. 4 instance Smoke', () => {
    test('Should be able to add Compute Engine, Cloud Storage, BigQuery and Kubernetes Engine to calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.cloudStorageElement.waitFor();
        await calculatorPage.cloudStorageElement.click();
        await calculatorPage.cloudStorageCard.waitFor();

        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.bigQueryElement.waitFor();
        await calculatorPage.bigQueryElement.click();
        await calculatorPage.bigQueryEditionsCard.waitFor();

        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.kubernetesEngineElement.waitFor();
        await calculatorPage.kubernetesEngineElement.click();
        await calculatorPage.kubernetesEngineCard.waitFor();

        await expect(calculatorPage.instanceCard).toBeVisible();
        await expect(calculatorPage.cloudStorageCard).toBeVisible();
        await expect(calculatorPage.bigQueryEditionsCard).toBeVisible();
        await expect(calculatorPage.kubernetesEngineCard).toBeVisible();
        await expect(calculatorPage.costInDetails).toHaveText('$9,253.19');
    });
});
