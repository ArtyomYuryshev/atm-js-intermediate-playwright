import csvFileValidator from 'csv-file-validator';
import configCSV from './csv-file-validator-config';
import { TOTAL_PRICE_PATTERN, DATE_PATTERN, ESTIMATED_FEES_TEXT, URL_PATTERN } from '../data/csv-consts';

interface AdditionalContentCheck {
    index: number;
    cleanedContent: string[];
}

interface ValidationResult {
    inValidData: unknown[];
    data: object[];
}

/**
 * Splits the CSV content into table content and additional content.
 * @param fileContent - The content of the CSV file.
 * @returns An object containing the table content and additional content.
 */
export function extractTableAndAdditionalContent(fileContent: string): { tableContent: string, otherContents: string[] } {
    const [tableContent, ...otherContents] = fileContent.split('\n,,,,,,,\n');
    return { tableContent, otherContents };
}

/**
 * Validates the CSV content and extracts additional content.
 * @param fileContent - The content of the CSV file.
 * @returns An object containing the validation result and additional content checks.
 */
export async function validateAndExtractCSVContent(fileContent: string): Promise<{ validationResult: ValidationResult, additionalContentChecks: AdditionalContentCheck[] }> {
    const { tableContent, otherContents } = extractTableAndAdditionalContent(fileContent);

    const validationResult: ValidationResult = await csvFileValidator(tableContent, configCSV);

    const additionalContentChecks: AdditionalContentCheck[] = otherContents.map((content, index) => {
        const cleanedContent = cleanAdditionalContent(content);
        return { index, cleanedContent };
    });

    return { validationResult, additionalContentChecks };
}

/**
 * Cleans the additional content by removing extra commas and splitting by ':,'.
 * @param content - The additional content string.
 * @returns An array of cleaned content strings.
 */
function cleanAdditionalContent(content: string): string[] {
    return content.replace(/,{2,}/g, '').split(':,');
}

/**
 * Compares two arrays of objects (const and validationResult.data) to check if they are equal.
 * @param actualData - The actual data array.
 * @param expectedData - The expected data array.
 * @returns True if the arrays are equal, otherwise false.
 */
export function compareData(actualData: object[], expectedData: object[]): boolean {
    if (actualData.length !== expectedData.length) {
        return false;
    }

    for (let i = 0; i < actualData.length; i++) {
        if (JSON.stringify(actualData[i]) !== JSON.stringify(expectedData[i])) {
            return false;
        }
    }

    return true;
}

/**
 * Checks if the additional content string matches the given pattern.
 * @param contentString - The content string to check.
 * @param pattern - The pattern to match against.
 * @returns True if the content matches the pattern, otherwise false.
 */
export function matchesPattern(contentString: string, pattern: RegExp | string): boolean {
    if (typeof pattern === 'string') {
        return contentString.includes(pattern);
    } else {
        return pattern.test(contentString);
    }
}

/**
 * Performs additional content checks against predefined patterns.
 * @param additionalContentChecks - The additional content checks to perform.
 * @returns An array of results indicating whether each check passed.
 */
export function performContentChecks(additionalContentChecks: AdditionalContentCheck[]): { description: string, found: boolean }[] {
    const checks = [
        { pattern: TOTAL_PRICE_PATTERN, description: 'Total Price' },
        { pattern: DATE_PATTERN, description: 'Date' },
        { pattern: ESTIMATED_FEES_TEXT, description: 'Estimated Fees' },
        { pattern: URL_PATTERN, description: 'URL' }
    ];

    const results = checks.map(check => {
        const found = additionalContentChecks.some(({ cleanedContent }) => matchesPattern(cleanedContent.join(','), check.pattern));
        console.log(`${check.description} found:`, found);
        return { description: check.description, found };
    });

    return results;
}
