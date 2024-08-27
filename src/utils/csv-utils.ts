import csvFileValidator from 'csv-file-validator';
import configCSV from './csv-config';

export function splitCSVContent(fileContent: string) {
    const [tableContent, ...otherContents] = fileContent.split('\n,,,,,,,\n');
    return { tableContent, otherContents };
}

export async function validateCSVContent(fileContent: string) {
    const { tableContent, otherContents } = splitCSVContent(fileContent);

    const validationResult = await csvFileValidator(tableContent, configCSV);

    const additionalContentChecks = otherContents.map((content, index) => {
        const cleanedContent = content.replace(/,{2,}/g, '').split(':,');
        return { index, cleanedContent };
    });

    return { validationResult, additionalContentChecks };
}
