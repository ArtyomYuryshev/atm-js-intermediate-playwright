import 'dotenv/config';
import { CalculatorPage } from '../../pageObject/calculator_page';
const chai = require('chai');

const calculatorPage = new CalculatorPage();

const okCookieButton = process.env['LOCALE'] === 'en' ? 'OK, got it' : 'OK';

describe('Cloud Calculator', () => {
  before(async () => {
    // @ts-ignore
    await calculatorPage.open();

    // checking the existence of the popup before clicking the button
    const okButton = await $(`//*[text()="${okCookieButton}"]`);
    const isDisplayed = await okButton.isDisplayed().catch(() => false);

    if (isDisplayed) {
      await okButton.click();
    }
  });

  it('Should be able to add new instances into the calculator', async () => {
    console.log('First test');

    const url = await browser.getUrl();
    chai.expect(url).to.be.equal(browser.config.baseUrl + '/products/calculator');

    const addEstimateButton = await calculatorPage.addEstimateButton();
    await addEstimateButton.waitForDisplayed();
    addEstimateButton.click();

    const addEstimationModalWindow = await calculatorPage.addEstimationModalWindow();

    await addEstimationModalWindow.waitForDisplayed();
    chai.expect(await addEstimationModalWindow.isDisplayed()).to.be.true;

    const computeEngineElement = await calculatorPage.computeEngineElement();
    await computeEngineElement.waitForDisplayed();
    computeEngineElement.click();

    // to check that configuration form is displayed
    const configurationBlock = await calculatorPage.configurationBlock();
    await configurationBlock.waitForDisplayed();
    chai.expect(await configurationBlock.isDisplayed()).to.be.true;

    const firstInstances = await calculatorPage.firstInstances();
    await firstInstances.waitForDisplayed();
    chai.expect(await firstInstances.isDisplayed()).to.be.true;
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
