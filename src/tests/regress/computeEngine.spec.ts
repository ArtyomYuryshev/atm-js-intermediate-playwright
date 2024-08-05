import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. Compute Engine Regress', () => {
    test('Should add Instance to Estimated cost after opening calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await expect(calculatorPage.instanceCard).toBeVisible();
        await expect(calculatorPage.costInDetails).toHaveText('$138.70');
    });

    test('Should to check Machine Family drill-down content', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.machineFamilyDDL.click();

        await expect(calculatorPage.generalPurposeDDLItem).toBeVisible();
        await expect(calculatorPage.computeOptimizedDDLItem).toBeVisible();
        await expect(calculatorPage.memoryOptimizedDDLItem).toBeVisible();
        await expect(calculatorPage.acceleratorOptimizedDDLItem).toBeVisible();
        await expect(calculatorPage.storageOptimizedDDLItem).toBeVisible();
    });

    test('Should be able to change Machine Family', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.machineFamilyDDL.click();
        await calculatorPage.computeOptimizedDDLItem.waitFor();
        await calculatorPage.computeOptimizedDDLItem.click();

        await expect(calculatorPage.costInDetails).toHaveText('$152.43');
        await expect(calculatorPage.costInHeader).toHaveText('$152.43');

        await expect(calculatorPage.machineTypeValue).toBeVisible();
        await expect(calculatorPage.machineTypeValue).toHaveText('c2-standard-4');

        await expect(calculatorPage.vcpusAndRamText).toBeVisible();
        await expect(calculatorPage.vcpusAndRamText).toHaveText('vCPUs: 4, RAM: 16 GB');
    });
});
