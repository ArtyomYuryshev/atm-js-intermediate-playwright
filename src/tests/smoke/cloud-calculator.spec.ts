import { test, expect, Locator, BrowserContext, Page } from '@playwright/test';
import { CalculatorPage, EstimationPreview } from '../../pageObject';

test.describe('Cloud Calculator. Compute Engine Smoke', () => {
    let context: BrowserContext;
    let page: Page;

    let calculatorPageInstance: CalculatorPage;
    let estimationPreview: EstimationPreview;

    let addEstimateButton: Locator;
    let addEstimationModalWindow: Locator;
    let computeEngineElement: Locator;
    let configurationBlock: Locator;
    let firstInstances: Locator;
    let addNewInstanceButton: Locator;
    let shareButton: Locator;
    let shareEstimatePopup: Locator;
    let openEstimationSummaryLink: Locator;
    let costInHeader: Locator;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        calculatorPageInstance = new CalculatorPage(page);
        await calculatorPageInstance.open();

        addEstimateButton = calculatorPageInstance.addEstimateButton;
        addEstimationModalWindow = calculatorPageInstance.addEstimationModalWindow;
        computeEngineElement = calculatorPageInstance.computeEngineElement;
        configurationBlock = calculatorPageInstance.configurationBlock;
        firstInstances = calculatorPageInstance.firstInstances;
        addNewInstanceButton = calculatorPageInstance.incrementInstances;
        shareButton = calculatorPageInstance.shareButton;
        shareEstimatePopup = calculatorPageInstance.shareEstimatePopup;
        openEstimationSummaryLink = calculatorPageInstance.openEstimationSummaryLink;
        costInHeader = calculatorPageInstance.costInHeader;
    });

    test.afterEach(async () => {
        await context.close();
    });

    test('Should be able to open "Add to this estimate" pop-up', async () => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await expect(addEstimationModalWindow).toBeVisible();
    });

    test('Should be able to open "Compute Engine" screen', async () => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        await expect(configurationBlock).toBeVisible();
    });

    test('Should add Instance to Cost details after opening calculator', async () => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        await firstInstances.waitFor();
        await expect(firstInstances).toBeVisible();

        const oneInstancesCostUSD: string = '$138.70';
        await expect(costInHeader).toHaveText(oneInstancesCostUSD);
    });

    test('Should be able to add two new instances', async () => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        for (let i = 0; i < 2; i++) {
            await addNewInstanceButton.click();
        }

        const threeInstancesCostUSD: string = '$417.30';
        await expect(costInHeader).toHaveText(threeInstancesCostUSD);
    });

    test('Should open "Share Estimate" pop-up', async () => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        await shareButton.click();

        await expect(shareEstimatePopup).toBeVisible();
        await expect(openEstimationSummaryLink).toBeVisible();
    });

    test('Should open estimation summary in new tab', async ({ browser }) => {
        await addEstimateButton.waitFor();
        await addEstimateButton.click();

        await computeEngineElement.waitFor();
        await computeEngineElement.click();

        await shareButton.click();

        const [newPage] = await Promise.all([
            browser.contexts()[0].waitForEvent('page'),
            openEstimationSummaryLink.click(),
        ]);

        await newPage.waitForLoadState();
        estimationPreview = new EstimationPreview(newPage);

        const summary = estimationPreview.summarySection;
        await expect(summary).toBeVisible();
        await expect(estimationPreview.summaryCost).toHaveText('$138.70');
    });
});
