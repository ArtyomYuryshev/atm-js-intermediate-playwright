import { test, expect } from '../fixtures';
import { waitAndClick, fillWithChars } from '../../utils/helpers';

test.describe('Cloud Calculator. Compute Engine Regress', () => {
    test.beforeEach(async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();
    });

    test('Should add Instance to Estimated cost after opening calculator', async ({
        calculatorPage,
    }) => {
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$138.70');
    });

    test('Should to check Machine Family drill-down content', async ({ calculatorPage }) => {
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
            'vCPUs: 4, RAM: 16 GiB',
        );
    });

    test('Should be able to increase Instances', async ({ calculatorPage }) => {
        await calculatorPage.configurationComponent.numberOfInstancesIncrementButton.dblclick();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$417.30');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$417.30');
    });

    test('Should be able to change Boot disk size', async ({ calculatorPage }) => {
        await calculatorPage.configurationComponent.diskSizeInputField.fill('777');

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$168.58');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$168.58');
    });

    test('Should be able to change OS', async ({ calculatorPage }) => {
        await calculatorPage.configurationComponent.osDDL.click();
        await calculatorPage.configurationComponent.osDLLUbuntuPro.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$144.14');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$144.14');
    });

    test('Should be able to recalculate cost after editing of several fields', async ({
        calculatorPage,
    }) => {
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

    // flaky need to redo
    test('Should be able to calculate cost after adding all Service type (Compute Engine)', async ({
        calculatorPage,
    }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.configurationComponent.serviceTypeDDL.click();
        await calculatorPage.configurationComponent.soleTenantNodesServiceTypeDDLItem.click();
        await calculatorPage.costDetails.soleTenantNodeCard.waitFor();

        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);

        await calculatorPage.configurationComponent.serviceTypeDDL.click();
        await calculatorPage.configurationComponent.machineImagesServiceTypeDDLItem.click();
        await calculatorPage.costDetails.machineImagesCard.waitFor();

        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.soleTenantNodeCard).toBeVisible();
        await expect(calculatorPage.costDetails.machineImagesCard).toBeVisible();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$4,703.57');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$5.00');
    });

    test('Should be able to delete item from Cost Details', async ({ calculatorPage }) => {
        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await expect(calculatorPage.configurationComponent.costInHeader).toBeHidden();
        await expect(calculatorPage.costDetails.instanceCard).toBeHidden();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('--');
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).toBeVisible();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should be able to delete group of items from Cost Details', async ({
        calculatorPage,
    }) => {
        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.secondInstanceCard.waitFor();

        await calculatorPage.costDetails.deleteGroupButton.click();
        await calculatorPage.deleteGroupPopup.confirmDeleteGroupButton.click();

        await expect(calculatorPage.configurationComponent.costInHeader).toBeHidden();
        await expect(calculatorPage.costDetails.instanceCard).toBeHidden();
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('--');
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).toBeVisible();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).toHaveText(
            'Add items to your estimateStart adding products and services to configure your estimate.',
        );
    });

    test('Should be able to cancel of deleting group of items', async ({ calculatorPage }) => {
        await calculatorPage.addEstimatePopup.addEstimateButton.click();
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await calculatorPage.addEstimatePopup.computeEngineElement.click();
        await calculatorPage.costDetails.secondInstanceCard.waitFor();
        await calculatorPage.costDetails.deleteGroupButton.click();
        await calculatorPage.deleteGroupPopup.cancelDeleteGroupButton.click();

        await expect(calculatorPage.deleteGroupPopup.deleteGroupConfirmationPopUp).toBeHidden();
        await expect(calculatorPage.configurationComponent.costInHeader).toBeVisible();
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.costDetails.secondInstanceCard).toBeVisible();
    });

    test('Should display "Instances deleted" notification after deleting', async ({
        calculatorPage,
    }) => {
        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await expect(calculatorPage.deleteNotification.itemsDeletedNotification).toBeVisible();
    });

    test('Should be able to undo deleting', async ({ calculatorPage }) => {
        await calculatorPage.costDetails.threeDotsButton.click();
        await calculatorPage.costDetails.deleteItem3Dots.click();

        await calculatorPage.deleteNotification.undoDeleteButton.click();

        await expect(calculatorPage.deleteNotification.itemsDeletedNotification).toBeHidden();
        await expect(calculatorPage.costDetails.placeholderTextEmptyCostDetails).toBeHidden();
        await expect(calculatorPage.configurationComponent.addItemsTextBlock).toBeHidden();
        await expect(calculatorPage.costDetails.instanceCard).toBeVisible();
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('$138.70');
        await expect(calculatorPage.costDetails.costInDetails).toHaveText('$138.70');
    });

    test('Should to validate Number of Instances values', async ({ calculatorPage }) => {
        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('0');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeVisible();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('1');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeHidden();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('49999');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeHidden();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('50000');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeHidden();

        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('50001');
        await expect(
            calculatorPage.configurationComponent.numberOfInstancesValidationMessage,
        ).toBeVisible();
    });

    test('Should to be able type only numbers in Number of Instances values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.configurationComponent.numberOfInstancesInputField.fill('777');
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        await fillWithChars(
            calculatorPage.configurationComponent.numberOfInstancesInputField,
            'asd',
        );
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        await fillWithChars(
            calculatorPage.configurationComponent.numberOfInstancesInputField,
            'ASD',
        );
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        await fillWithChars(
            calculatorPage.configurationComponent.numberOfInstancesInputField,
            '/*-',
        );
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777',
        );

        await fillWithChars(
            calculatorPage.configurationComponent.numberOfInstancesInputField,
            '-777/*-ASD',
        );
        await expect(calculatorPage.configurationComponent.numberOfInstancesInputField).toHaveValue(
            '777777',
        );
    });

    test('Should to validate Boot Disk Size values', async ({ calculatorPage }) => {
        // bug in app. will fall here. 14.08.2024
        await calculatorPage.configurationComponent.diskSizeInputField.fill('0');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeVisible();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('1');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeHidden();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65535');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeHidden();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65536');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeHidden();

        await calculatorPage.configurationComponent.diskSizeInputField.fill('65537');
        await expect(calculatorPage.configurationComponent.diskSizeValidationMessage).toBeVisible();
    });

    test('Should to be able type only numbers in Boot Disk Size InputField values', async ({
        calculatorPage,
    }) => {
        await calculatorPage.configurationComponent.diskSizeInputField.fill('777');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        await fillWithChars(calculatorPage.configurationComponent.diskSizeInputField, 'asd');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        await fillWithChars(calculatorPage.configurationComponent.diskSizeInputField, 'ASD');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        await fillWithChars(calculatorPage.configurationComponent.diskSizeInputField, '/*-');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue('777');

        await fillWithChars(calculatorPage.configurationComponent.diskSizeInputField, '-777/*-ASD');
        await expect(calculatorPage.configurationComponent.diskSizeInputField).toHaveValue(
            '777777',
        );
    });

    test('Should to check info button for "Number of instances"', async ({ calculatorPage }) => {
        await calculatorPage.configurationComponent.numberOfInstancesInfoButton.click();

        await expect(
            calculatorPage.configurationComponent.numberOfInstancesInfoPopover,
        ).toBeVisible();
    });

    test('Should be able to change currency', async ({ calculatorPage }) => {
        await calculatorPage.costDetails.currencyDDLButton.click();
        await calculatorPage.costDetails.euroDDLitem.click();

        await expect(calculatorPage.costDetails.costInDetails).toHaveText('€124.77');
        await expect(calculatorPage.configurationComponent.costInHeader).toHaveText('€124.77');
    });
});
