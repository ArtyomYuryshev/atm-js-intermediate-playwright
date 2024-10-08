import { Page, Locator } from '@playwright/test';

class DesmosCalculatorPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.desmos.com/calculator');
    }

    get menuButton(): Locator {
        return this.page.locator('span[aria-label="Open Graph (cmd+o)"]');
    }

    get examplesListItem(): Locator {
        return this.page.locator('//*[@role="listitem"]');
    }

    get graphPreview(): Locator {
        return this.page.locator('div').filter({ hasText: /^Open Graph$/ });
    }

    get graph(): Locator {
        return this.page.locator('div:nth-child(3) > .dcg-graph-outer');
    }

    get openGraphButton(): Locator {
        return this.page.locator('//*[@role="button" and text()="Open Graph"]');
    }

    get hideExpressionButton(): Locator {
        return this.page.locator('//*[@aria-label="Hide Expression List"]');
    }

    get addItemButton(): Locator {
        return this.page.locator('//button[@aria-label="Add Item"]');
    }

    get addExpressionListItem(): Locator {
        return this.page.locator('//*[@aria-label="Add expression"]');
    }

    get graphSettingsButton(): Locator {
        return this.page.locator('//*[@aria-label="Graph Settings" and @role="button"]');
    }

    get contrastCheckbox(): Locator {
        return this.page.locator('//div[@role="checkbox"]//span[text()="Reverse contrast"]');
    }

    get xAxisNameInput(): Locator {
        return this.page.locator('//*[@placeholder="e.g. “x”"]');
    }

    get yAxisNameInput(): Locator {
        return this.page.locator('//*[@placeholder="e.g. “y”"]');
    }

    async addExpression(expression: string) {
        await this.addItemButton.click();
        await this.addExpressionListItem.click();
        await this.page.keyboard.type(expression);
        await this.page.keyboard.press('Enter');
    }

    async applyCustomStyle() {
        const style = `
            .dcg-toast-view.dcg-visible,
            [aria-label="Zoom"],
            [aria-label="Graph Settings"],
            [aria-label="Show List"] {
                display: none;
            }
        `;
        await this.page.addStyleTag({ content: style });
    }
}

export { DesmosCalculatorPage };
