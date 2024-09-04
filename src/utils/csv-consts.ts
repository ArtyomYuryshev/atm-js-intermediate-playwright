/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */

export const expectedData = [
    {
        service_display_name: 'Compute Engine',
        name: 'N1 Predefined Instance Core running in Americas',
        quantity: '2920.0',
        region: 'us-central1',
        service_id: '6F81-5844-456A',
        sku: '2E27-4F75-95CD',
        total_price_usd: '92.30412',
        notes: ''
    },
    {
        service_display_name: 'Compute Engine',
        name: 'N1 Predefined Instance Ram running in Americas',
        quantity: '10950.0',
        region: 'us-central1',
        service_id: '6F81-5844-456A',
        sku: '6C71-E844-38BC',
        total_price_usd: '46.39515',
        notes: ''
    },
    {
        service_display_name: 'Compute Engine',
        name: 'Storage PD Capacity',
        quantity: '20.0',
        region: 'us-central1',
        service_id: '6F81-5844-456A',
        sku: 'D973-5D65-BAB2',
        total_price_usd: '0',
        notes: ''
    }
];

export const TOTAL_PRICE_PATTERN = /Total Price,138\.69927/;
export const DATE_PATTERN = /Prices are in US dollars, effective date is \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/;
export const ESTIMATED_FEES_TEXT = "The estimated fees provided by Google Cloud Pricing Calculator are for discussion purposes only and are not binding on either you or Google. Your actual fees may be higher or lower than the estimate.";
export const URL_PATTERN = /Url to the estimate,https:\/\/cloud\.google\.com\/calculator\?dl=.*/;