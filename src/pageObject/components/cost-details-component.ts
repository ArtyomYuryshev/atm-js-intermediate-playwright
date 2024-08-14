import { Page } from 'playwright';

export class CostDetailsComponent {
    constructor(private page: Page) {}

    get currencyDDLButton() {
        return this.page.locator('//button[@data-tooltip-id="currency-selector-button"]');
    }

    get euroDDLitem() {
        return this.page.locator(
            '//ul[@class="W7g1Rb-rymPhb O68mGe-hqgu2c"]/li/ul/li[@data-value="EUR"]',
        );
    }

    get soleTenantNodeCard() {
        return this.page.locator('div[aria-label="Edit Sole-Tenant Nodes"]');
    }

    get instanceCard() {
        return this.page.locator('div[aria-label="Edit Instances"]');
    }

    get secondInstanceCard() {
        return this.page.locator('div[aria-label="Edit Instances 2"]');
    }

    get machineImagesCard() {
        return this.page.locator('div[aria-label="Edit Machine Images"]');
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

    get threeDotsButton() {
        return this.page.locator('button.pYTkkf-Bz112c-LgbsSe[data-idom-class="yY29zb"]');
    }

    get deleteItem3Dots() {
        return this.page.locator('//li[@jsname="UPE4nb" and .//span[text()="Delete item"]]');
    }

    get deleteGroupButton() {
        return this.page.locator('//button[@aria-label="Delete group"]');
    }

    get placeholderTextEmptyCostDetails() {
        return this.page.locator('//div[@class="nUZvhc"]');
    }
}
