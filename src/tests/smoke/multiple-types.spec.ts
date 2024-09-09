import { test, expect } from '../fixtures';
import { waitAndClick } from '../../utils/helpers';

test.describe('Cloud Calculator. 4 types Smoke', () => {
    test('@mobile @tablet | Should be able to add Compute Engine, Cloud Storage, BigQuery and Kubernetes Engine to calculator', async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await waitAndClick(calculatorPage.addEstimatePopup.cloudStorageElement);
        await calculatorPage.costDetails.cloudStorageCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await waitAndClick(calculatorPage.addEstimatePopup.bigQueryElement);
        await calculatorPage.costDetails.bigQueryEditionsCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await waitAndClick(calculatorPage.addEstimatePopup.kubernetesEngineElement);
        await calculatorPage.costDetails.kubernetesEngineCard.waitFor();

        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.cloudStorageCard).toBeVisible();
        await expect(calculatorPage.costDetails.bigQueryEditionsCard).toBeVisible();
        await expect(calculatorPage.costDetails.kubernetesEngineCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$9,253.19');
    });
});
