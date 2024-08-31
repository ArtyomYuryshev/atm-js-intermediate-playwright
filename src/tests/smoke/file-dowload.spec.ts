import { test, expect } from '../fixtures';
import { waitAndClick, waitForEnabled } from '../../utils/helpers';
import * as path from 'path';
import * as fs from 'fs';
import { validateAndExtractCSVContent, performContentChecks } from '../../utils/csv-utils';

const downloadPath: string = './downloads/';
let downloadedFilePath: string;

test.describe('Calculation Download SMOKE', () => {
    test.beforeEach(async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();
    });


    test.afterEach(async (_, testInfo) => {
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
        const { validationResult, additionalContentChecks } =
            await validateAndExtractCSVContent(fileContent);

        console.log('Invalid Data:', validationResult.inValidData);
        expect(validationResult.inValidData.length).toBe(0);

        const results = performContentChecks(additionalContentChecks);

        results.forEach((result) => {
            if (!result.found) {
                throw new Error(`${result.description} was not found`);
            }
        });
    });
});
