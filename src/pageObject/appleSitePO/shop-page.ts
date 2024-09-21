import { Page } from '@playwright/test';

class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get price() {
        return this.page.locator('[data-autom="tile1_price"]');
    }

    get buyNowButton16Pro() {
        return this.page.locator('[data-autom="IPHONE16PRO_MAIN"]');
    }

    get productTitle() {
        return this.page.locator(
            '//h3[@class="rf-hcard-content-title" and contains(text(),"Pro")]',
        );
    }

    async goto(productUrl: string) {
        await this.page.goto(productUrl);
    }
}

export { ProductPage };
