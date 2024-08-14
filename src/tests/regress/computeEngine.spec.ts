import { test, expect } from '../fixtures';

test.describe('Cloud Calculator. Compute Engine Regress', () => {
    test('Should add Instance to Estimated cost after opening calculator', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$138.70');
    });

    test('Should to check Machine Family drill-down content', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.machineFamilyDDL.click();

        await expect(calculatorPage.configurationComponent.generalPurposeDDLItem).toBeVisible();
        await expect(calculatorPage.configurationComponent.computeOptimizedDDLItem).toBeVisible();
        await expect(calculatorPage.configurationComponent.memoryOptimizedDDLItem).toBeVisible();
        await expect(
            calculatorPage.configurationComponent.acceleratorOptimizedDDLItem,
        ).toBeVisible();
        await expect(calculatorPage.configurationComponent.storageOptimizedDDLItem).toBeVisible();
    });

    test('Should be able to change Machine Family', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.machineFamilyDDL.click();
        await calculatorPage.configurationComponent.computeOptimizedDDLItem.waitFor();
        await calculatorPage.configurationComponent.computeOptimizedDDLItem.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$152.43');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$152.43');

        await expect(calculatorPage.configurationComponent.machineTypeBannerText).toBeVisible();
        await expect(calculatorPage.configurationComponent.machineTypeBannerText).toHaveText(
            'c2-standard-4',
        );

        await expect(calculatorPage.configurationComponent.vCPUsAndRamText).toBeVisible();
        await expect(calculatorPage.configurationComponent.vCPUsAndRamText).toHaveText(
            'vCPUs: 4, RAM: 16 GB',
        );
    });

    test('Should be able to increase Instances', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.numberOfInstancesIncrementButton.dblclick();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$417.30');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$417.30');
    });

    test('Should be able to change Boot disk size', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('777');

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$168.58');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$168.58');
    });

    test('Should be able to change OS', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.osDDL.click();
        await calculatorPage.configurationComponent.osDLLUbuntuPro.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$144.14');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$144.14');
    });

    test('Should be able to recalculate cost after editing of several fields', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.machineTypeDDL.click();
        await calculatorPage.configurationComponent.n1Standard1machineTypeItem.click();

        await calculatorPage.configurationComponent.numberOfInstancesIncrementButton.click();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('100');

        await calculatorPage.configurationComponent.osDDL.click();
        await calculatorPage.configurationComponent.osDLLUbuntuPro.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$78.92');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$78.92');
    });

    test('Should be able to recalculate cost after multiple editing', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.machineTypeDDL.click();
        await calculatorPage.configurationComponent.n1Standard1machineTypeItem.click();
        await calculatorPage.configurationComponent.numberOfInstancesIncrementButton.click();
        await calculatorPage.configurationComponent.diskSizeInputField.fill('100');
        await calculatorPage.configurationComponent.osDDL.click();
        await calculatorPage.configurationComponent.osDLLUbuntuPro.click();

        await calculatorPage.configurationComponent.machineTypeDDL.click();
        await calculatorPage.configurationComponent.n1Standard2machineTypeItem.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$150.53');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$150.53');
    });

    test('Should be able to calculate cost after adding all Service type (Compute Engine)', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.secondInstanceCard.waitFor();

        await calculatorPage.configurationComponent.serviceTypeDDL.click();
        await calculatorPage.configurationComponent.soleTenantNodesServiceTypeDDLItem.click();
        await calculatorPage.costDetails.soleTenantNodeCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.secondInstanceCard.waitFor();

        await calculatorPage.configurationComponent.serviceTypeDDL.click();
        await calculatorPage.configurationComponent.machineImagesServiceTypeDDLItem.click();
        await calculatorPage.costDetails.machineImagesCard.waitFor();

        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.soleTenantNodeCard).toBeVisible();
        await expect(calculatorPage.costDetails.machineImagesCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$282.40');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$5.00');
    });

    test('Should be able to delete item from Cost Details', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await expect(calculatorPage.configurationComponent.costInHeader).not.toBeVisible();
        await expect(calculatorPage.costDetails.instanceCard).not.toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('--');
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).toBeVisible();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should be able to delete group of items from Cost Details', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.secondInstanceCard.waitFor();

        await calculatorPage.costDetails.deleteGroupButton.click();
        await calculatorPage.deleteGroupPopup.confirmDeleteGroupButton.click();

        await expect(calculatorPage.configurationComponent.costInHeader).not.toBeVisible();
        await expect(calculatorPage.costDetails.instanceCard).not.toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('--');
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).toBeVisible();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should be able to cancel of deleting group of items', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.secondInstanceCard.waitFor();
        await calculatorPage.costDetails.deleteGroupButton.click();

        await expect(calculatorPage.deleteGroupPopup.deleteGroupConfirmationPopUp).toBeVisible();
    });

    test('Should display "Instances deleted" notification after deleting', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await expect(calculatorPage.deleteNotification.itemsDeletedNotification).toBeVisible();
    });

    test('Should be able to undo deleting', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await calculatorPage.deleteNotification.undoDeleteButton.click();

        await expect(calculatorPage.deleteNotification.itemsDeletedNotification).not.toBeVisible();
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).not.toBeVisible();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).not.toBeVisible();
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$138.70');
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$138.70');
    });

    test('Should to validate Number of Instances values', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('0');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeVisible();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('1');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('49999');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('50000');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('50001');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeVisible();
    });

    test('Should to be able type only numbers in Number of Instances values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('777');
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        const chars = 'asdASD/*-';
        const promises = chars
            .split('')
            .map((char) =>
                calculatorPage.configurationComponent.numberOfInstancesInputField.press(char),
            );
        await Promise.all(promises);
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        const mixedChars = '-777/*-ASD';
        const mixedPromises = mixedChars
            .split('')
            .map((char) =>
                calculatorPage.configurationComponent.numberOfInstancesInputField.press(char),
            );
        await Promise.all(mixedPromises);
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777777',
        );
    });

    test('Should to validate Boot Disk Size values', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        // bug in app. will fall here. 14.08.2024
        await calculatorPage.configurationComponent.diskSizeInputField.fill('0');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeVisible();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('1');
        await expect(
            calculatorPage.configurationComponent.diskSizeValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65535');
        await expect(
            calculatorPage.configurationComponent.diskSizeValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65536');
        await expect(
            calculatorPage.configurationComponent.diskSizeValidationMessage,
        ).not.toBeVisible();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65537');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeVisible();
    });

    test('Should to be able type only numbers in Boot Disk Size InputField values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('777');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        const chars1 = 'asd';
        const promises1 = chars1
            .split('')
            .map((char) => calculatorPage.configurationComponent.diskSizeInputField.press(char));
        await Promise.all(promises1);
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        const chars2 = 'ASD';
        const promises2 = chars2
            .split('')
            .map((char) => calculatorPage.configurationComponent.diskSizeInputField.press(char));
        await Promise.all(promises2);
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        const chars3 = '/*-';
        const promises3 = chars3
            .split('')
            .map((char) => calculatorPage.configurationComponent.diskSizeInputField.press(char));
        await Promise.all(promises3);
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        const mixedChars = '-777/*-ASD';
        const mixedPromises = mixedChars
            .split('')
            .map((char) => calculatorPage.configurationComponent.diskSizeInputField.press(char));
        await Promise.all(mixedPromises);
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue(
            '777777',
        );
    });

    test('Should to check info button for "Number of instances"', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.configurationComponent.numberOfInstancesInfoButton.click();

        await expect(
            calculatorPage.configurationComponent.numberOfInstancesInfoPopover,
        ).toBeVisible();
    });

    test('Should be able to change currency', async ({ calculatorPage }) => {
        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();

        await calculatorPage.waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();

        await calculatorPage.costDetails.currencyDDLButton.click();
        await calculatorPage.costDetails.euroDDLitem.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('€128.28');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('€128.28');
    });
});
