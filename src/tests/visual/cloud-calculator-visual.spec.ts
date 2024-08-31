import { test, expect } from '../fixtures';
import { waitAndClick } from '../../utils/helpers';

test.describe('Cloud Calculator Visual Tests', () => {
    
    test.beforeEach(async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
    });

    test('Visual test for "Add to this estimate" pop-up', async ({ calculatorPage }) => {
        await expect(calculatorPage.addEstimatePopup.addEstimationModalWindow).toBeVisible();
    
        await expect(calculatorPage.getPage()).toHaveScreenshot('add-estimate-popup.png', { maxDiffPixelRatio: 0.03 });
    });

    test('Visual test for "Compute Engine" screen', async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await expect(calculatorPage.configurationComponent.configurationBlock).toBeVisible();
        await expect(calculatorPage.getPage()).toHaveScreenshot('compute-engine-screen.png', { maxDiffPixelRatio: 0.03 });
    });

    test('Visual test for cost in header', async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.getPage()).toHaveScreenshot('cost-in-header.png', { maxDiffPixelRatio: 0.03 });
    });
});