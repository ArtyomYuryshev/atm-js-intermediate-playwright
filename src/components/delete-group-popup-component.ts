import { Page } from 'playwright';

export class DeleteGroupPopupComponent {
    constructor(private page: Page) {}

    get deleteGroupConfirmationPopUp() {
        return this.page.locator(
            '//div[@class="bwApif-P5QLlc" and @aria-modal="true" and @role="dialog"]',
        );
    }

    get confirmDeleteGroupButton() {
        return this.page.locator('//button[@aria-label="Delete"]');
    }
}
