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

    get cloudStorageElement() {
        return this.page.locator('//h2[text()="Cloud Storage"]');
    }

    get bigQueryElement() {
        return this.page.locator('//h2[text()="BigQuery"]');
    }

    get kubernetesEngineElement() {
        return this.page.locator('//h2[text()="Google Kubernetes Engine"]');
    }

    get incrementInstances() {
        return this.page.locator('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
    }

    get costInHeader() {
        return this.page.locator('.egBpsb .MyvX5d.D0aEmf');
    }

    get costInDetails() {
        return this.page.locator('.fbc2ib label.gt0C8e.MyvX5d.D0aEmf');
    }

    get instanceCard() {
        return this.page.locator('div[aria-label="Edit Instances"]');
    }

    get cloudStorageCard() {
        return this.page.locator('div[aria-label="Edit Cloud Storage"]');
    }

    get bigQueryEditionsCard() {
        return this.page.locator('div[aria-label="Edit Editions"]');
    }

    get kubernetesEngineCard() {
        return this.page.locator('div[aria-label="Edit GKE"]');
    }

    get shareButton() {
        return this.page.locator('button[aria-label="Open Share Estimate dialog"]');
    }

    get shareEstimatePopup() {
        return this.page.locator('div[jsname="rZHESd"]');
    }

    get openEstimationSummaryLink() {
        return this.page.locator('a[track-name="open estimate summary"]');
    }

    get machineFamilyDDL() {
        return this.page.locator(
            '//span[@id="c27" and text()="General Purpose"]/ancestor::div[@jsname="oYxtQd"]/ancestor::div[@jsname="wSASue"]',
        );
    }

    get generalPurposeDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="general-purpose"]',
        );
    }

    get computeOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="compute-optimized"]',
        );
    }

    // Локаторы для содержимого внутри элемента VVW32d
    get machineTypeValue() {
        return this.page.locator('div.VVW32d > div.D3Zlgc.MyvX5d.D0aEmf');
    }

    get vcpusAndRamText() {
        return this.page.locator('#ow5 .U4lDT .HY0Uh:nth-of-type(4)');
    }

    get memoryOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="memory-optimized"]',
        );
    }

    get acceleratorOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="accelerator-optimized"]',
        );
    }

    get storageOptimizedDDLItem() {
        return this.page.locator(
            'div[jsname="xl07Ob"] ul.VfPpkd-rymPhb li[data-value="storage-optimized"]',
        );
    }
}
