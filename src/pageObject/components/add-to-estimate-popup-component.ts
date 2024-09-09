import { Page } from 'playwright';

export class AdEstimatePopupComponent {
    constructor(private page: Page, private isMobile: boolean) {}

    get addEstimateButton() {
        const locator = this.isMobile
            ? '//button[@data-idom-class="xhASFc" or @data-idom-class="ePqIy"]'
            : '//button[.//span[text()="Add to estimate"]]';
        return this.page.locator(locator).first();
    }

    get addEstimationModalWindow() {
        const locator = this.isMobile
            ? '//*[@aria-modal="true" and @role="dialog"]//div//span[text()="Add to this estimate"]'
            : '//div[@aria-modal="true" and @role="dialog" and @aria-label="Add to this estimate"]';
        return this.page.locator(locator);
    }

    // async getAddEstimateButton() {
    //     const mobileLocator = '//button[@data-idom-class="xhASFc" or @data-idom-class="ePqIy"]';
    //     const desktopLocator = '//button[.//span[text()="Add to estimate"]]';
    //     const tabletLocator = '//button[@aria-label="Open Add to Estimate Dialog"]';
    
    //     if (await this.page.locator(mobileLocator).count() > 0) {
    //         return this.page.locator(mobileLocator).first();
    //     } else if (await this.page.locator(tabletLocator).count() > 0) {
    //         return this.page.locator(tabletLocator).first();
    //     } else {
    //         return this.page.locator(desktopLocator).first();
    //     }
    // }

    // async getAddEstimationModalWindow() {
    //     const mobileLocator = '//*[@aria-modal="true" and @role="dialog"]//div//span[text()="Add to this estimate"]';
    //     const desktopLocator = '//div[@aria-modal="true" and @role="dialog" and @aria-label="Add to this estimate"]';

    //     if (await this.page.locator(mobileLocator).count() > 0) {
    //         return this.page.locator(mobileLocator).first();
    //     } else {
    //         return this.page.locator(desktopLocator).first();
    //     }
    // }

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
