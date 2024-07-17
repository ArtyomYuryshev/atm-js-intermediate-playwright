import { calculatorPage } from '../../pageObject/calculatorPage';

const calculatorPageInstance = new calculatorPage();

describe('Cloud Calculator', () => {
    it('Should be able to open "Add to this estimate" pop-up', async () => {
        await calculatorPageInstance.open();

        const addEstimateButton = calculatorPageInstance.addEstimateButton;
        await addEstimateButton.waitForDisplayed();
        await addEstimateButton.click();

        const addEstimationModalWindow = calculatorPageInstance.addEstimationModalWindow;
        await addEstimationModalWindow.waitForDisplayed();
        expect(addEstimationModalWindow).toBeDisplayed();
    });

    it('Should be able to open "Compute Engine" screen', async () => {
        const computeEngineElement = calculatorPageInstance.computeEngineElement;
        await computeEngineElement.waitForDisplayed();
        await computeEngineElement.click();

        const configurationBlock = calculatorPageInstance.configurationBlock;
        await configurationBlock.waitForDisplayed();
        expect(configurationBlock).toBeDisplayed();
    });

    it('Should add Instance to Cost details after opening calculator', async () => {
        const firstInstances = calculatorPageInstance.firstInstances;
        await firstInstances.waitForDisplayed();
        expect(firstInstances).toBeDisplayed();

        const oneInstancesCostUSD: string = '$138.70';
        expect(calculatorPageInstance.costInHeader).toHaveText(oneInstancesCostUSD);
    });

    it('Should be able to add two new instances', async () => {
        const addNewInstanceButton = calculatorPageInstance.incrementInstances;
        for (let i = 0; i < 2; i++) {
            await addNewInstanceButton.click();
        }

        const threeInstancesCostUSD: string = '$417.30';
        expect(calculatorPageInstance.costInHeader).toHaveText(threeInstancesCostUSD);
    });
});
