import { Page } from 'playwright';
import { BasePage } from './base-page';

export class CalculatorPage extends BasePage {
    constructor(page: Page) {
        super(page, '/products/calculator');
    }

    // Add to this estimate pop-up
    get addEstimateButton() {
        return this.page.locator(
            '//button[.//span[@class="AeBiU-RLmnJb"] and .//span[text()="Add to estimate"]]',
        );
    }

    get addEstimationModalWindow() {
        return this.page.locator('[aria-label="Add to this estimate"]');
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

    // Config block
    get configurationBlock() {
        return this.page.locator('div.U4lDT');
    }

    get costInHeader() {
        return this.page.locator('.egBpsb .MyvX5d.D0aEmf');
    }

    get serviceTypeDDL() {
        return this.page.locator('//span[@id="c2585" and text()="Service type"]/following-sibling::div[@class="VfPpkd-aPP78e"]')
    }

    get numberOfInstancesIncrementButton() {
        return this.page.locator('.QiFlid [aria-label="Increment"] .wX4xVc-Bz112c-RLmnJb');
    }

    get osDDL() {
        return this.page.locator('//span[text()="Operating System / Software"]/ancestor::div[contains(@class, "VfPpkd-O1htCb")]//div[contains(@class, "VfPpkd-aPP78e")]')
    }

    get osDLLUbuntuPro() {
        return this.page.locator('div.VfPpkd-xl07Ob-XxIAqe ul.VfPpkd-rymPhb > li[data-value="paid-ubuntu-pro"]')
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

    get machineTypeDDL() {
        return this.page.locator('//div[@jsname="kgDJk"]//div[@jsname="oYxtQd"]//div[@class="VfPpkd-aPP78e"]'
        )
    }

    get n1Standard1machineTypeItem() {
        return this.page.locator('ul.VfPpkd-rymPhb.r6B9Fd.bwNLcf.P2Hi5d.VfPpkd-OJnkse > li[data-value="n1-standard-1"]'
        )
    }

    get n1Standard2machineTypeItem() {
        return this.page.locator('ul.VfPpkd-rymPhb.r6B9Fd.bwNLcf.P2Hi5d.VfPpkd-OJnkse > li[data-value="n1-standard-2"]'
        )
    }

    get machineTypeBanerText() {
        return this.page.locator('div.VVW32d > div.D3Zlgc.MyvX5d.D0aEmf');
    }

    get vCPUsAndRamText() {
        return this.page.locator('#ow5 .U4lDT .HY0Uh:nth-of-type(4)');
    }

    get diskSizeInputField() {
        return this.page.locator('//input[@id="c40" and @class="qdOxv-fmcmS-wGMbrd"]')
    }

    // Cost details
    get soleTenantNodeCard() {
        return this.page.locator('div[aria-label="Edit Sole-Tenant Nodes"]')
    }

    get instanceCard() {
        return this.page.locator('div[aria-label="Edit Instances"]');
    }

    get machineImagesCard() {
        return this.page.locator('div[aria-label="Edit Machine Images"]')
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

    get costInDetails() {
        return this.page.locator('.fbc2ib label.gt0C8e.MyvX5d.D0aEmf');
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
}
