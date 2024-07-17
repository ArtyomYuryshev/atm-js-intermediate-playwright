import { BasePage } from './base-page';

export class CalculatorPage extends BasePage {
    constructor() {
        super('/products/calculator');
    }

    get addEstimateButton() {
        return $('//button[.//span[@class="AeBiU-RLmnJb"] and .//span[text()="Add to estimate"]]');
    }

    get addEstimationModalWindow() {
        return $('[aria-label="Add to this estimate"]');
    }

    get configurationBlock() {
        return $('div.U4lDT');
    }

    get computeEngineElement() {
        return $('//h2[text()="Compute Engine"]');
    }

    get incrementInstances() {
        return $('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
    }

    get costInHeader() {
        return $('.egBpsb .MyvX5d.D0aEmf');
    }

    get firstInstances() {
        return $('div[aria-label="Edit Instances"]');
    }
}
