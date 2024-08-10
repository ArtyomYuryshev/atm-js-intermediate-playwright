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

        await expect(calculatorPage.machineTypeBannerText).toBeVisible();
        await expect(calculatorPage.machineTypeBannerText).toHaveText('c2-standard-4');

        await expect(calculatorPage.vCPUsAndRamText).toBeVisible();
        await expect(calculatorPage.vCPUsAndRamText).toHaveText('vCPUs: 4, RAM: 16 GB');
    });

    test('Should be able to increase Instances', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.numberOfInstancesIncrementButton.dblclick();

        await expect(calculatorPage.costInDetails).toHaveText('$417.30');
        await expect(calculatorPage.costInHeader).toHaveText('$417.30');
    });

    test('Should be able to change Boot disk size', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.diskSizeInputField.fill('777');

        await expect(calculatorPage.costInDetails).toHaveText('$168.58');
        await expect(calculatorPage.costInHeader).toHaveText('$168.58');
    });

    test('Should be able to change OS', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.osDDL.click();
        await calculatorPage.osDLLUbuntuPro.click();

        await expect(calculatorPage.costInDetails).toHaveText('$144.14');
        await expect(calculatorPage.costInHeader).toHaveText('$144.14');
    });

    test('Should be able to recalculate cost after editing of several fields', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.machineTypeDDL.click();
        await calculatorPage.n1Standard1machineTypeItem.click();

        await calculatorPage.numberOfInstancesIncrementButton.click();

        await calculatorPage.diskSizeInputField.fill('100');

        await calculatorPage.osDDL.click();
        await calculatorPage.osDLLUbuntuPro.click();

        await expect(calculatorPage.costInDetails).toHaveText('$78.92');
        await expect(calculatorPage.costInHeader).toHaveText('$78.92');
    });

    test('Should be able to recalculate cost after multiple editing', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.machineTypeDDL.click();
        await calculatorPage.n1Standard1machineTypeItem.click();
        await calculatorPage.numberOfInstancesIncrementButton.click();
        await calculatorPage.diskSizeInputField.fill('100');
        await calculatorPage.osDDL.click();
        await calculatorPage.osDLLUbuntuPro.click();

        await calculatorPage.machineTypeDDL.click();
        await calculatorPage.n1Standard2machineTypeItem.click();

        await expect(calculatorPage.costInDetails).toHaveText('$150.53');
        await expect(calculatorPage.costInHeader).toHaveText('$150.53');
    });

    test('Should be able to calculate cost after adding all Service type (Compute Engine)', async ({
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
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.secondInstanceCard.waitFor();

        await calculatorPage.serviceTypeDDL.click();
        await calculatorPage.soleTenantNodesServiceTypeDDLItem.click();
        await calculatorPage.soleTenantNodeCard.waitFor();

        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.secondInstanceCard.waitFor();

        await calculatorPage.serviceTypeDDL.click();
        await calculatorPage.machineImagesServiceTypeDDLItem.click();
        await calculatorPage.machineImagesCard.waitFor();

        await expect(calculatorPage.instanceCard).toBeVisible();
        await expect(calculatorPage.soleTenantNodeCard).toBeVisible();
        await expect(calculatorPage.machineImagesCard).toBeVisible();
        await expect(calculatorPage.costInDetails).toHaveText('$282.40');
        await expect(calculatorPage.costInHeader).toHaveText('$5.00');
    });

    test('Should be able to delete item from Cost Details', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.threeDotsButton.click();
        await calculatorPage.deleteItem3Dots.click();

        await expect(calculatorPage.costInHeader).not.toBeVisible();
        await expect(calculatorPage.instanceCard).not.toBeVisible();
        await expect(calculatorPage.costInDetails).toHaveText('--');
        await expect(calculatorPage.placeholderText).toBeVisible();
        await expect(calculatorPage.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should be able to delete group of items from Cost Details', async ({
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
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.secondInstanceCard.waitFor();

        await calculatorPage.deleteGroupButton.click();
        await calculatorPage.confirmDeleteGroupButton.click();

        await expect(calculatorPage.costInHeader).not.toBeVisible();
        await expect(calculatorPage.instanceCard).not.toBeVisible();
        await expect(calculatorPage.costInDetails).toHaveText('--');
        await expect(calculatorPage.placeholderText).toBeVisible();
        await expect(calculatorPage.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should display "Instances deleted" notification after deleting', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.threeDotsButton.click();
        await calculatorPage.deleteItem3Dots.click();

        await expect(calculatorPage.itemsDeletedNotification).toBeVisible();
    });

    test('Should to validate Number of Instances values', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.numberOfInstancesInputField.fill('0');
        await expect(calculatorPage.numberOfInstancesValidationMessage).toBeVisible();

        await calculatorPage.numberOfInstancesInputField.fill('1');
        await expect(calculatorPage.numberOfInstancesValidationMessage).not.toBeVisible();

        await calculatorPage.numberOfInstancesInputField.fill('49999');
        await expect(calculatorPage.numberOfInstancesValidationMessage).not.toBeVisible();

        await calculatorPage.numberOfInstancesInputField.fill('50000');
        await expect(calculatorPage.numberOfInstancesValidationMessage).not.toBeVisible();

        await calculatorPage.numberOfInstancesInputField.fill('50001');
        await expect(calculatorPage.numberOfInstancesValidationMessage).toBeVisible();
    });

    test('Should to be able type only numbers in Number of Instances values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();
    
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();
    
        await calculatorPage.numberOfInstancesInputField.fill('777');
        await expect(calculatorPage.numberOfInstancesInputField).toHaveValue('777');
    
        const chars = 'asdASD/*-';
        const promises = chars.split('').map(char => 
            calculatorPage.numberOfInstancesInputField.press(char)
        );
        await Promise.all(promises);
        await expect(calculatorPage.numberOfInstancesInputField).toHaveValue('777');
    
        const mixedChars = '-777/*-ASD';
        const mixedPromises = mixedChars.split('').map(char => 
            calculatorPage.numberOfInstancesInputField.press(char)
        );
        await Promise.all(mixedPromises);
        await expect(calculatorPage.numberOfInstancesInputField).toHaveValue('777777');
    });

    test('Should to validate Boot Disk Size values', async ({ calculatorPage }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();

        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();

        await calculatorPage.diskSizeInputField.fill('0');
        await expect(calculatorPage.diskSizeValidationMessage).not.toBeVisible();

        await calculatorPage.diskSizeInputField.fill('1');
        await expect(calculatorPage.diskSizeValidationMessage).not.toBeVisible();

        await calculatorPage.diskSizeInputField.fill('65535');
        await expect(calculatorPage.diskSizeValidationMessage).not.toBeVisible();

        await calculatorPage.diskSizeInputField.fill('65536');
        await expect(calculatorPage.diskSizeValidationMessage).not.toBeVisible();

        await calculatorPage.diskSizeInputField.fill('65537');
        await expect(calculatorPage.diskSizeValidationMessage).toBeVisible();
    });

    test('Should to be able type only numbers in Boot Disk Size InputField values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimateButton.waitFor();
        await calculatorPage.addEstimateButton.click();
        await calculatorPage.addEstimationModalWindow.waitFor();
    
        await calculatorPage.computeEngineElement.waitFor();
        await calculatorPage.computeEngineElement.click();
        await calculatorPage.instanceCard.waitFor();
    
        await calculatorPage.diskSizeInputField.fill('777');
        await expect(calculatorPage.diskSizeInputField).toHaveValue('777');
    
        const chars1 = 'asd';
        const promises1 = chars1.split('').map(char => 
            calculatorPage.diskSizeInputField.press(char)
        );
        await Promise.all(promises1);
        await expect(calculatorPage.diskSizeInputField).toHaveValue('777');
    
        const chars2 = 'ASD';
        const promises2 = chars2.split('').map(char => 
            calculatorPage.diskSizeInputField.press(char)
        );
        await Promise.all(promises2);
        await expect(calculatorPage.diskSizeInputField).toHaveValue('777');
    
        const chars3 = '/*-';
        const promises3 = chars3.split('').map(char => 
            calculatorPage.diskSizeInputField.press(char)
        );
        await Promise.all(promises3);
        await expect(calculatorPage.diskSizeInputField).toHaveValue('777');
    
        const mixedChars = '-777/*-ASD';
        const mixedPromises = mixedChars.split('').map(char => 
            calculatorPage.diskSizeInputField.press(char)
        );
        await Promise.all(mixedPromises);
        await expect(calculatorPage.diskSizeInputField).toHaveValue('777777');
    });
});
