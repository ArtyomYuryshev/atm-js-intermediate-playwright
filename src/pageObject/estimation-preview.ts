import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class EstimationPreview extends BasePage {
    constructor(page: Page) {
        super(page, '');
    }

    get summarySection() {
        return this.page.locator('//div[@class="qBohdf AlLELb"]');
    }

    get summaryCost() {
        return this.page.locator('//h4[@class="n8xu5 Nh2Phe D0aEmf"]');
    }
}