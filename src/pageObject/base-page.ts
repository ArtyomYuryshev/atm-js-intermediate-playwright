import { Page, Locator } from 'playwright';

export class BasePage {
    protected readonly page: Page;
    private readonly url: string;

    constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
    }

    async open() {
        await this.page.goto(this.url);
    }

    async close() {
        await this.page.close();
    }

    public getPage(): Page {
        return this.page;
    }

    async waitAndClick(locator: Locator) {
        await locator.waitFor();
        await locator.click();
    }
}
