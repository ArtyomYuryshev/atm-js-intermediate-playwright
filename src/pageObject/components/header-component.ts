import { Page } from '@playwright/test';

export class HeaderComponent {
    constructor(private readonly page: Page) {}

    get header() {
        return this.page.locator('.TDbJKc .ZUAiPc');
    }

    async selectLanguage(languageValue: string) {
        const languageMenuButton = this.page.locator(
            '//div[@class="M4Fi3d"]//div[@class="VfPpkd-aPP78e"]',
        );
        await languageMenuButton.click();
        const languageOption = this.page.locator(
            `div.M4Fi3d ul.VfPpkd-rymPhb li[data-value="${languageValue}"]`,
        );
        await languageOption.waitFor({ state: 'visible', timeout: 10000 });
        await languageOption.click();
    }
}
