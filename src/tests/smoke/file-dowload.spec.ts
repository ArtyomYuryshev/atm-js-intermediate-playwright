import { test, expect } from '../fixtures';
import { waitAndClick, waitForEnabled } from '../../utils/helpers';
import configCSV from '../../utils/csv-config-base-compute-instance';
import * as path from 'path';
import * as fs from 'fs';
import csvFileValidator from 'csv-file-validator';

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
        const validationResult = await csvFileValidator(fileContent, configCSV);

        expect(validationResult.inValidData.length).toBe(0);
    });
});