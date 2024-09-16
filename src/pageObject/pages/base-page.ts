import { Download } from '@playwright/test';
import { Page } from 'playwright';
import { HeaderComponent } from '../components/header-component';

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

    public async waitForDownload(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent('download');
        return downloadPromise;
    }

    get headerComponent(): HeaderComponent {
        return new HeaderComponent(this.page);
    }
}
