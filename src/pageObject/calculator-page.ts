import { Page } from 'playwright';
import { BasePage } from './base-page';

export class CalculatorPage extends BasePage {
    constructor(page: Page) {
        super(page, '/products/calculator');
    }

    get addEstimateButton() {
        return this.page.locator(
            '//button[.//span[@class="AeBiU-RLmnJb"] and .//span[text()="Add to estimate"]]',
        );
    }

    get addEstimationModalWindow() {
        return this.page.locator('[aria-label="Add to this estimate"]');
    }

    get configurationBlock() {
        return this.page.locator('div.U4lDT');
    }

    get computeEngineElement() {
        return this.page.locator('//h2[text()="Compute Engine"]');
    }

    get incrementInstances() {
        return this.page.locator('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
    }

    get costInHeader() {
        return this.page.locator('.egBpsb .MyvX5d.D0aEmf');
    }

    get firstInstances() {
        return this.page.locator('div[aria-label="Edit Instances"]');
    }
}
