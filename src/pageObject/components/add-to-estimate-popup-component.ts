import { Page } from 'playwright';

export class AdEstimatePopupComponent {
    constructor(private page: Page, private isMobile: boolean) {}

    get addEstimateButton() {
        const locator = this.isMobile
            ? '//button[@data-idom-class="xhASFc" or @data-idom-class="ePqIy"]'
            : '//button[.//span[@class="AeBiU-RLmnJb"] and .//span[text()="Add to estimate"]]';
        return this.page.locator(locator).first();
    }

    get addEstimationModalWindow() {
        const locator = this.isMobile
            ? '//div[@aria-modal="true" and @role="dialog"]//span[text()="Add to this estimate"]/ancestor::div[@aria-modal="true" and @role="dialog"]'
            : '[aria-label="Add to this estimate"]';
        return this.page.locator(locator);
    }

    get computeEngineElement() {
        return this.page.locator('//h2[text()="Compute Engine"]/..');
    }

    get cloudStorageElement() {
        return this.page.locator('//h2[text()="Cloud Storage"]/..');
    }

    get bigQueryElement() {
        return this.page.locator('//h2[text()="BigQuery"]/..');
    }

    get kubernetesEngineElement() {
        return this.page.locator('//h2[text()="Google Kubernetes Engine"]/..');
    }
}
