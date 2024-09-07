import { test, expect } from '../fixtures';
import { localizationData } from '../../data/localization-data';
import { getTextContent } from '../../utils/helpers';

test.describe('Localization Tests', () => {
    for (const [language, expectedTexts] of Object.entries(localizationData)) {
        test(`should display correct header and footer texts in ${language}`, async ({ calculatorPage }) => {
            await calculatorPage.headerComponent.selectLanguage(expectedTexts.value);

            const headerText = await getTextContent(calculatorPage.headerComponent.header);
            console.log(headerText);

            expect(headerText).toBe(expectedTexts.header);
        });
    }
});