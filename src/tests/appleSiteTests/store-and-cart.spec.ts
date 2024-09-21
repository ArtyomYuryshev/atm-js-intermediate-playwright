import { test, expect } from '@playwright/test';
import { ApplePage } from '../../pageObject/appleSitePO/main-page';

const regions = [
    { name: 'UK', geoCookie: 'GB', expectNotification: true, expectStoreAndCart: true },
    { name: 'BY', geoCookie: 'BY', expectNotification: true, expectStoreAndCart: false },
    { name: 'GE', geoCookie: 'GE', expectNotification: true, expectStoreAndCart: false },
    { name: 'SG', geoCookie: 'SG', expectNotification: true, expectStoreAndCart: true },
    { name: 'US', geoCookie: 'US', expectNotification: false, expectStoreAndCart: true },
];

regions.forEach(({ name, geoCookie, expectNotification, expectStoreAndCart }) => {
    test.describe(`Service availability for region ${name}`, () => {
        test.beforeEach(async ({ page }) => {
            const applePage = new ApplePage(page);
            await applePage.setGeoCookie(geoCookie);
            await applePage.goto();
        });

        if (expectStoreAndCart) {
            test(`Store and cart options should be visible for ${name}`, async ({ page }) => {
                const applePage = new ApplePage(page);
                await applePage.handleNotification(expectNotification);
                await expect(applePage.storeOption).toBeVisible();
                await expect(applePage.cartOption).toBeVisible();
            });
        } else {
            test(`Store and cart options should be hidden for ${name}`, async ({ page }) => {
                const applePage = new ApplePage(page);
                await applePage.handleNotification(expectNotification);
                await expect(applePage.storeOption).toBeHidden();
                await expect(applePage.cartOption).toBeHidden();
            });
        }
    });
});
