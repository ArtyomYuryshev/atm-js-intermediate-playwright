import { test, expect } from '../fixtures';
import { waitAndClick } from '../../utils/helpers';

test.describe('Cloud Calculator. 4 types Smoke', () => {
    test('@mobile @tablet | Should be able to add Compute Engine, Cloud Storage, BigQuery and Kubernetes Engine to calculator', async ({
        calculatorPage,
        projectName,
    }) => {
        const isTablet = projectName.includes('Tablet');

        // Add Compute Engine
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        // Check if it's a tablet and click the go back button
        if (isTablet) {
            await waitAndClick(calculatorPage.addEstimatePopup.tabletGoBackButton);
            await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
        }

        // Add Cloud Storage
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.cloudStorageElement);
        await calculatorPage.costDetails.cloudStorageCard.waitFor();

        // Check if it's a tablet and click the go back button
        if (isTablet) {
            await waitAndClick(calculatorPage.addEstimatePopup.tabletGoBackButton);
            await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
        }

        // Add BigQuery
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.bigQueryElement);
        await calculatorPage.costDetails.bigQueryEditionsCard.waitFor();

        // Check if it's a tablet and click the go back button
        if (isTablet) {
            await waitAndClick(calculatorPage.addEstimatePopup.tabletGoBackButton);
            await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
        }

        // Add Kubernetes Engine
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.kubernetesEngineElement);
        await calculatorPage.costDetails.kubernetesEngineCard.waitFor();

        // Check if it's a tablet and click the go back button
        if (isTablet) {
            await waitAndClick(calculatorPage.addEstimatePopup.tabletGoBackButton);
            await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
        }

        // Assertions
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.cloudStorageCard).toBeVisible();
        await expect(calculatorPage.costDetails.bigQueryEditionsCard).toBeVisible();
        await expect(calculatorPage.costDetails.kubernetesEngineCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$9,253.19');
    });
});
