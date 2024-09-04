const configCSV = {
    headers: [
        {
            name: 'service_display_name',
            inputName: 'service_display_name',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'name',
            inputName: 'name',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'quantity',
            inputName: 'quantity',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'region',
            inputName: 'region',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'service_id',
            inputName: 'service_id',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'sku',
            inputName: 'sku',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'total_price, USD',
            inputName: 'total_price_usd',
            required: true,
            requiredError: function (headerName: string, rowNumber: number) {
                return `${headerName} is required in row ${rowNumber}`;
            },
        },
        {
            name: 'notes',
            inputName: 'notes',
            required: false,
        },
    ],
};

export default configCSV;
