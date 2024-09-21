import { expect, test } from '@playwright/test';
import { ApplePage } from '../../pageObject/appleSitePO/main-page';
import { ProductPage } from '../../pageObject/appleSitePO/shop-page';

const regionsWithShop = [
    {
        name: 'UK',
        geoCookie: 'GB',
        currency: '£',
        buyNowText: 'Buy',
        productTitle: 'iPhone 16 Pro & iPhone 16 Pro Max ',
        productUrl: 'https://www.apple.com/uk/shop/buy-iphone',
    },
    {
        name: 'JP',
        geoCookie: 'JP',
        currency: '円',
        buyNowText: '購入',
        productTitle: 'iPhone 16 Proと iPhone 16 Pro Max ',
        productUrl: 'https://www.apple.com/jp/shop/buy-iphone',
    },
];

regionsWithShop.forEach(({ name, geoCookie, currency, buyNowText, productUrl, productTitle }) => {
    test.describe(`Product card for region ${name}`, () => {
        test.beforeEach(async ({ page }) => {
            const applePage = new ApplePage(page);
            await applePage.setGeoCookie(geoCookie);
        });

        test(`Product card should have correct content for ${name}`, async ({ page }) => {
            const productPage = new ProductPage(page);
            await productPage.goto(productUrl);
            await expect(productPage.price).toContainText(currency);
            await expect(productPage.productTitle).toContainText(productTitle);
            await expect(productPage.buyNowButton16Pro).toContainText(buyNowText);
        });
    });
});
