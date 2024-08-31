import { test, expect } from '../fixtures';
import { waitAndClick, waitForEnabled } from '../../utils/helpers';
import * as path from 'path';
import * as fs from 'fs';
import { validateCSVContent } from '../../utils/csv-utils';
import {
    TOTAL_PRICE_PATTERN,
    DATE_PATTERN,
    ESTIMATED_FEES_TEXT,
    URL_PATTERN,
} from '../../utils/csv-consts';

const downloadPath: string = './downloads/';
let downloadedFilePath: string;

test.describe('Calculation Download SMOKE', () => {
    test.beforeEach(async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();
    });

    // eslint-disable-next-line no-empty-pattern
    test.afterEach(async ({}, testInfo) => {
        if (testInfo.status === 'passed' && downloadedFilePath) {
            fs.unlinkSync(downloadedFilePath);
            console.log(`Deleted file: ${downloadedFilePath}`);
        }
    });

    test('Should verify that the file is downloaded', async ({ calculatorPage }) => {
        await waitForEnabled(calculatorPage.costDetails.downloadButton);
        await calculatorPage.costDetails.downloadButton.click();

        const download = await calculatorPage.waitForDownload();
        downloadedFilePath = path.join(downloadPath, download.suggestedFilename());
        await download.saveAs(downloadedFilePath);

        expect(fs.existsSync(downloadedFilePath)).toBe(true);
    });

    test('Should verify the downloaded file name', async ({ calculatorPage }) => {
        await waitForEnabled(calculatorPage.costDetails.downloadButton);
        await calculatorPage.costDetails.downloadButton.click();

        const download = await calculatorPage.waitForDownload();
        downloadedFilePath = path.join(downloadPath, download.suggestedFilename());
        await download.saveAs(downloadedFilePath);

        expect(path.extname(downloadedFilePath)).toBe('.csv');
    });

    test('Should verify the content of the downloaded file', async ({ calculatorPage }) => {
        await waitForEnabled(calculatorPage.costDetails.downloadButton);
        await calculatorPage.costDetails.downloadButton.click();

        const download = await calculatorPage.waitForDownload();
        downloadedFilePath = path.join(downloadPath, download.suggestedFilename());
        await download.saveAs(downloadedFilePath);

        const fileContent = fs.readFileSync(downloadedFilePath, 'utf-8');
        const { validationResult, additionalContentChecks } = await validateCSVContent(fileContent);

        console.log('Invalid Data:', validationResult.inValidData);

        expect(validationResult.inValidData.length).toBe(0);

        let totalPriceFound = false;
        let dateFound = false;
        let estimatedFeesFound = false;
        let urlFound = false;

        additionalContentChecks.forEach(({ index, cleanedContent }) => {
            const contentString = cleanedContent.join(',');
            console.log(`Additional content ${index + 1}:`, contentString);

            if (TOTAL_PRICE_PATTERN.test(contentString)) {
                totalPriceFound = true;
            }
            if (DATE_PATTERN.test(contentString)) {
                dateFound = true;
            }
            if (contentString.includes(ESTIMATED_FEES_TEXT)) {
                estimatedFeesFound = true;
            }
            if (URL_PATTERN.test(contentString)) {
                urlFound = true;
            }
        });

        expect(totalPriceFound).toBe(true);
        expect(dateFound).toBe(true);
        expect(estimatedFeesFound).toBe(true);
        expect(urlFound).toBe(true);
    });
});
