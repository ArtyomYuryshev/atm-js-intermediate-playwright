import { basePage } from './basePage';

export class calculatorPage extends basePage {
    constructor() {
        super('/products/calculator');
    }

    addEstimateButton() {
        return $('//button[.//span[@class="AeBiU-RLmnJb"] and .//span[text()="Add to estimate"]]');
    }

    addEstimationModalWindow() {
        return $('[aria-label="Add to this estimate"]');
    }

    configurationBlock() {
        return $('div.U4lDT');
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
