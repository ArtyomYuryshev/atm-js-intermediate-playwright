import { Page } from 'playwright';

export class BasePage {
    constructor(
        protected readonly page: Page,
        private readonly url: string,
    ) {}

    async open() {
        await this.page.goto(this.url);
    }

    async close() {
        await this.page.close();
    }
}
