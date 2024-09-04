import { Locator } from '@playwright/test';

export async function waitAndClick(locator: Locator) {
    await locator.waitFor();
    await locator.click();
}

export async function fillWithChars(locator: Locator, chars: string) {
    const promises = chars.split('').map((char) => locator.press(char));
    await Promise.all(promises);
}

export async function waitForEnabled(locator: Locator) {
    const page = locator.page();
    const elementHandle = await locator.elementHandle();

    await page.waitForFunction((el) => el && !el.hasAttribute('disabled'), elementHandle);
}
