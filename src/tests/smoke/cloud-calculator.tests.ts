import { CalculatorPage } from '../../pageObject/calculator_page';
import chai from 'chai';

const calculatorPage = new CalculatorPage();

describe('Cloud Calculator', () => {

  it('Should be able to open calculator', async () => {
    console.log('First test');
    
    // @ts-ignore
    await calculatorPage.open();

    const addEstimateButton = await calculatorPage.addEstimateButton();
    await addEstimateButton.waitForDisplayed();
    addEstimateButton.click();

    const addEstimationModalWindow = await calculatorPage.addEstimationModalWindow();
    await addEstimationModalWindow.waitForDisplayed();
    chai.expect(await addEstimationModalWindow.isDisplayed()).to.be.true;

    const computeEngineElement = await calculatorPage.computeEngineElement();
    await computeEngineElement.waitForDisplayed();
    computeEngineElement.click();

    const configurationBlock = await calculatorPage.configurationBlock();
    await configurationBlock.waitForDisplayed();
    chai.expect(await configurationBlock.isDisplayed()).to.be.true;
  });

  it('Should add Instance to Cost details after opening calculator', async () => {
    const firstInstances = await calculatorPage.firstInstances();
    await firstInstances.waitForDisplayed();
    chai.expect(await firstInstances.isDisplayed()).to.be.true;

    const oneInstancesCostUSD = '$138.70';
    await expect(calculatorPage.costInHeader()).toHaveText(oneInstancesCostUSD);
  });

  it('Should be able to add two new instances', async () => {
    console.log(`Second test`);

    const addNewInstanceButton = await calculatorPage.incrementInstances();
    for (let i = 0; i <= 1; i++) {
      addNewInstanceButton.click();
    }

    const threeInstancesCostUSD = '$417.30';
    await expect(calculatorPage.costInHeader()).toHaveText(threeInstancesCostUSD);
  });
});
