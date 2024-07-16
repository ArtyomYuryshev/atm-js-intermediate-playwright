import { CalculatorPage } from '../../pageObject/calculatorPage';

const calculatorPage = new CalculatorPage();

describe('Cloud Calculator', () => {
  it('Should be able to open "Add to this estimate" pop-up', async () => {
    await calculatorPage.open();

    const addEstimateButton = calculatorPage.addEstimateButton();
    await addEstimateButton.waitForDisplayed();
    await addEstimateButton.click();

    const addEstimationModalWindow = calculatorPage.addEstimationModalWindow();
    await addEstimationModalWindow.waitForDisplayed();
    expect(addEstimationModalWindow).toBeDisplayed();
  });

  it('Should be able to open "Compute Engine" screen', async () => {
    const computeEngineElement = calculatorPage.computeEngineElement();
    await computeEngineElement.waitForDisplayed();
    await computeEngineElement.click();

    const configurationBlock = calculatorPage.configurationBlock();
    await configurationBlock.waitForDisplayed();
    expect(configurationBlock).toBeDisplayed();
  });

  it('Should add Instance to Cost details after opening calculator', async () => {
    const firstInstances = calculatorPage.firstInstances();
    await firstInstances.waitForDisplayed();
    expect(firstInstances).toBeDisplayed();

    const oneInstancesCostUSD: string = '$138.70';
    expect(calculatorPage.costInHeader()).toHaveText(oneInstancesCostUSD);
  });

  it('Should be able to add two new instances', async () => {
    const addNewInstanceButton = calculatorPage.incrementInstances();
    for (let i = 0; i < 2; i++) {
      await addNewInstanceButton.click();
    }

    const threeInstancesCostUSD: string = '$417.30';
    expect(calculatorPage.costInHeader()).toHaveText(threeInstancesCostUSD);
  });
});
