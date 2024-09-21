import { expect, Page } from '@playwright/test';

class ApplePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get notification() {
        return this.page.getByText('Choose another country or');
    }

    get storeOption() {
        return this.page.getByLabel('Store', { exact: true });
    }

    get cartOption() {
        return this.page.getByLabel('Shopping Bag');
    }

    get continueButton() {
        return this.page.getByRole('button', { name: 'Continue' });
    }

    async setGeoCookie(geoCookie: string) {
        await this.page
            .context()
            .addCookies([{ name: 'geo', value: geoCookie, domain: '.apple.com', path: '/' }]);
    }

    async goto() {
        await this.page.goto('https://www.apple.com');
    }

    async handleNotification(expectNotification: boolean) {
        if (expectNotification) {
            await expect(this.notification).toBeVisible();
            await this.continueButton.click();
        } else {
            await expect(this.notification).toBeHidden();
        }
    }

    async checkStoreAndCartVisibility(expectStoreAndCart: boolean) {
        if (expectStoreAndCart) {
            await expect(this.storeOption).toBeVisible();
            await expect(this.cartOption).toBeVisible();
        } else {
            await expect(this.storeOption).toBeHidden();
            await expect(this.cartOption).toBeHidden();
        }
    }
}

export { ApplePage };
