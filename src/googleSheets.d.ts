export function handleClientLoad(): void;
export function appendDataToSheet(results: { stage: string; round: number; choice: string; outcome: string; reward: number; points: number }[]): void;

function handleClientLoad(): void {
    gapi.load('client:auth2', initClient);
}

function initClient(): void {
    gapi.client.init({
        apiKey: "AIzaSyA2LG7XTZCnbccg2D-MuuQQnZ2UR7SZKZI", // provides unrestricted access
        clientId: "527838503731-l3etetdujn61m3m1jgtc6c8um0p45d5v.apps.googleusercontent.com", // for access requiring authentication
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(() => {
        gapi.auth2.getAuthInstance().signIn();
    }).catch((error) => {
        console.error('Error initializing Google API client:', error);
    });
}

function appendDataToSheet(): void {
    // Transform results into a 2D array format that Google Sheets API expects
    const values = results.map(result => [
        result.stage,
        result.round,
        result.choice,
        result.outcome,
        result.reward,
        result.points
    ]);
    const params = {
        spreadsheetId: 'YOUR_SPREADSHEET_ID',
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
            values: [
                ['Stage', 'Round', 'Choice', 'Outcome', 'Reward', 'TotalPoints'],
                ...values
            ]
        }
    };

    gapi.client.sheets.spreadsheets.values.append(params).then(response => {
        console.log('Data appended:', response.result);
    }, error => {
        console.error('Error appending data:', error);
    });
}
