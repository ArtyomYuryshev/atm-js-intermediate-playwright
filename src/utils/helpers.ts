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

export async function getTextContent(locator: Locator): Promise<string> {
    const textContent = await locator.textContent();
    if (textContent === null) {
        throw new Error(`Element not found or has no text content`);
    }
    return textContent;
}
