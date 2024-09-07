import { test, expect } from '../fixtures';
import { localizationData } from '../../data/localization-data';
import { getTextContent } from '../../utils/helpers';

test.describe('Localization Tests', () => {
    Object.entries(localizationData).forEach(([language, expectedTexts]) => {
        test(`Should display correct header and footer texts in ${language}`, async ({ calculatorPage }) => {
            await calculatorPage.headerComponent.selectLanguage(expectedTexts.value);

            const headerText = await getTextContent(calculatorPage.headerComponent.header);
            console.log(headerText);

            expect(headerText).toBe(expectedTexts.header);
        });
    });
});