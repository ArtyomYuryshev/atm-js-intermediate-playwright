import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. 4 types Smoke', () => {
    test('Should be able to add Compute Engine, Cloud Storage, BigQuery and Kubernetes Engine to calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.addEstimatePopup.computeEngineElement.waitFor();
        await calculatorPage.addEstimatePopup.computeEngineElement.click();
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.addEstimatePopup.cloudStorageElement.waitFor();
        await calculatorPage.addEstimatePopup.cloudStorageElement.click();
        await calculatorPage.costDetails.cloudStorageCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.addEstimatePopup.bigQueryElement.waitFor();
        await calculatorPage.addEstimatePopup.bigQueryElement.click();
        await calculatorPage.costDetails.bigQueryEditionsCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.addEstimatePopup.kubernetesEngineElement.waitFor();
        await calculatorPage.addEstimatePopup.kubernetesEngineElement.click();
        await calculatorPage.costDetails.kubernetesEngineCard.waitFor();

        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.cloudStorageCard).toBeVisible();
        await expect(calculatorPage.costDetails.bigQueryEditionsCard).toBeVisible();
        await expect(calculatorPage.costDetails.kubernetesEngineCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$9,253.19');
    });
});
