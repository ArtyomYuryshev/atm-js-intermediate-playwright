import { CalculatorPage } from '../../pageObject/calculator_page';
import { expect } from '@wdio/globals';

const calculatorPage = new CalculatorPage();

describe('Cloud Calculator', () => {
  it('Should be able to open "Add to this estimate" pop-up', async () => {
    await calculatorPage.open();

    const addEstimateButton = await calculatorPage.addEstimateButton();
    await addEstimateButton.waitForDisplayed();
    await addEstimateButton.click();

    const addEstimationModalWindow = await calculatorPage.addEstimationModalWindow();
    await addEstimationModalWindow.waitForDisplayed();
    expect(addEstimationModalWindow).toBeDisplayed();
  });

  it('Should be able to open "Add to this estimate" pop-up', async () => {
    const computeEngineElement = await calculatorPage.computeEngineElement();
    await computeEngineElement.waitForDisplayed();
    await computeEngineElement.click();

    const configurationBlock = await calculatorPage.configurationBlock();
    await configurationBlock.waitForDisplayed();
    expect(configurationBlock).toBeDisplayed();
  });

  it('Should add Instance to Cost details after opening calculator', async () => {
    const firstInstances = await calculatorPage.firstInstances();
    await firstInstances.waitForDisplayed();
    expect(firstInstances).toBeDisplayed();

    const oneInstancesCostUSD = '$138.70';
    await expect(calculatorPage.costInHeader()).toHaveText(oneInstancesCostUSD);
  });

  it('Should be able to add two new instances', async () => {
    console.log('Second test');

    const addNewInstanceButton = await calculatorPage.incrementInstances();
    for (let i = 0; i <= 1; i++) {
      await addNewInstanceButton.click();
    }

    const threeInstancesCostUSD = '$417.30';
    await expect(calculatorPage.costInHeader()).toHaveText(threeInstancesCostUSD);
  });
});
