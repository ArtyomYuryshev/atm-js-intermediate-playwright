import { Page } from 'playwright';

export class HeaderComponent {
    constructor(private page: Page) {}

    get header() {
        return this.page.locator('.TDbJKc .ZUAiPc');
    }

    async selectLanguage(language: string) {
        // Открываем меню выбора языка
        await this.page.click('//div[@class="M4Fi3d"]//div[@class="VfPpkd-aPP78e"]');
        
        // Используем evaluate для поиска элемента с текстом, содержащим невидимые символы
        await this.page.evaluate((language) => {
            const elements = document.querySelectorAll('span.VfPpkd-rymPhb-fpDzbe-fmcmS');
            for (const element of elements) {
                if (element.textContent?.includes(language)) {
                    (element as HTMLElement).click();
                    break;
                }
            }
        }, language);
    }
}
