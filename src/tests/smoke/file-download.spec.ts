import { test, expect } from '../fixtures';
import { waitAndClick, waitForEnabled } from '../../utils/helpers';
import * as path from 'path';
import * as fs from 'fs';
import {
    validateAndExtractCSVContent,
    performContentChecks,
    compareData,
} from '../../utils/csv-utils';
import { expectedData } from '../../data/csv-consts';
import { CalculatorPage } from '../../pageObject';

const downloadPath: string = './downloads/';
let downloadedFilePath: string;

const downloadFile = async (calculatorPage: CalculatorPage) => {
    await waitForEnabled(calculatorPage.costDetails.downloadButton);
    await calculatorPage.costDetails.downloadButton.click();
    const download = await calculatorPage.waitForDownload();
    downloadedFilePath = path.join(downloadPath, download.suggestedFilename());
    await download.saveAs(downloadedFilePath);
    return downloadedFilePath;
};

test.describe('Calculation Download SMOKE', () => {
    test.beforeEach(async ({ calculatorPage }) => {
        await waitAndClick(calculatorPage.addEstimatePopup.addEstimateButton);
        await calculatorPage.addEstimatePopup.addEstimationModalWindow.waitFor();
        await waitAndClick(calculatorPage.addEstimatePopup.computeEngineElement);
        await calculatorPage.costDetails.instanceCard.waitFor();
    });

    test.afterEach(async ({}, testInfo) => {
        if (testInfo.status === 'passed' && downloadedFilePath) {
            fs.unlinkSync(downloadedFilePath);
        }
    });

    test('Should verify that the file is downloaded', async ({ calculatorPage }) => {
        const filePath = await downloadFile(calculatorPage);
        expect(fs.existsSync(filePath)).toBe(true);
    });

    test('Should verify the downloaded file name', async ({ calculatorPage }) => {
        const filePath = await downloadFile(calculatorPage);
        expect(path.extname(filePath)).toBe('.csv');
    });

    test('Should verify the content of the downloaded file', async ({ calculatorPage }) => {
        const filePath = await downloadFile(calculatorPage);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { validationResult, additionalContentChecks } =
            await validateAndExtractCSVContent(fileContent);

        expect(validationResult.inValidData.length).toBe(0);
        expect(compareData(validationResult.data, expectedData)).toBe(true);

        const resultsAdditionalData = performContentChecks(additionalContentChecks);
        resultsAdditionalData.forEach((resultsAdditionalData) =>
            expect(resultsAdditionalData.found).toBe(true),
        );
    });
});
