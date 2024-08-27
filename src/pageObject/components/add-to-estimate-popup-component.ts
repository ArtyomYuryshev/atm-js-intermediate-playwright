import { Page } from 'playwright';

export class AdEstimatePopupComponent {
    constructor(private page: Page) {}

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
}
