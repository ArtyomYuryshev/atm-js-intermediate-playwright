import { test, expect } from '../fixtures';
import { waitAndClick } from '../../utils/helpers';
import { CalculatorPage } from '../../pageObject';

async function handleTabletSpecificSteps(calculatorPage: CalculatorPage, isTablet: boolean) {
    if (isTablet) {
        await waitAndClick(calculatorPage.addEstimatePopup.tabletGoBackButton);
        await calculatorPage.addEstimatePopup.addEstimateButton.waitFor();
    }
}

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

        await handleTabletSpecificSteps(calculatorPage, isTablet);

        // Add Cloud Storage
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.cloudStorageElement);
        await calculatorPage.costDetails.cloudStorageCard.waitFor();

        await handleTabletSpecificSteps(calculatorPage, isTablet);

        // Add BigQuery
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.bigQueryElement);
        await calculatorPage.costDetails.bigQueryEditionsCard.waitFor();

        await handleTabletSpecificSteps(calculatorPage, isTablet);

        // Add Kubernetes Engine
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.kubernetesEngineElement);
        await calculatorPage.costDetails.kubernetesEngineCard.waitFor();

        await handleTabletSpecificSteps(calculatorPage, isTablet);

        // Assertions
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.cloudStorageCard).toBeVisible();
        await expect(calculatorPage.costDetails.bigQueryEditionsCard).toBeVisible();
        await expect(calculatorPage.costDetails.kubernetesEngineCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$9,253.19');
    });
});
