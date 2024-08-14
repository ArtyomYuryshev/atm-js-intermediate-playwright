import { Page } from 'playwright';

export class DeleteNotificationComponent {
    constructor(private page: Page) {}

    get itemsDeletedNotification() {
        return this.page.locator('div.VfPpkd-YAxtVc[jsname="XxIAqe"]');
    }

    get undoDeleteButton() {
        return this.page.locator('button[jsname="XTYNyb"][aria-label="Undo"]');
    }
}
