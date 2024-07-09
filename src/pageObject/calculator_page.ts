import { BasePage } from './BasePage';

// TODO: Add more selectors

export class CalculatorPage extends BasePage {
  constructor() {
    super('/products/calculator');
  }

  welcomeElement() {
    return $$('.Gxwdcd');
  }

  async addEstimateButton() {
    const welcomeElement = await this.welcomeElement();
    return welcomeElement[0]!.$('//span[text()="Add to estimate"]');
  }

  addEstimationModalWindow() {
    return $('[aria-label="Add to this estimate"]');
  }

  configurationBlock() {
    return $('div.vHartc');
  }

  computeEngineElement() {
    return $('//h2[text()="Compute Engine"]');
  }

  incrementInstances() {
    return $('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
  }

  costInHeader() {
    return $('.egBpsb .MyvX5d.D0aEmf');
  }

  firstInstances() {
    return $('div[aria-label="Edit Instances"]');
  }
}
