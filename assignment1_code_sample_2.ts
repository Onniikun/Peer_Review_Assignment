import * as readline from 'readline';
import * as mysql from 'mysql';
import { exec } from 'child_process';
import * as https from 'https';
import * as prompt from 'prompt-sync';
import shellescape from "shell-escape"

// Commented out hard coded credentials
/**
const dbConfig = {
    host: 'mydatabase.com',
    user: 'admin',
    password: 'secret123',
    database: 'mydb'
};
 */

/**
 * 1. Fixed Hard coded credentials A04_2021: Inscure_Design
 */
// Added credentials that require user inputs.
const host: string = prompt('');
const user: string = prompt('');
const password: string = prompt('');
const database: string = prompt('');


function getUserInput(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter your name: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
/**
 * 2. Fixed data injecting by using shellescape A03_2021-Injection
 */
function sendEmail(to: string, subject: string, body: string) {
    const data = shellescape(`echo ${body} | mail -s "${subject}" ${to}`);
        exec(data (error, stdout, stderr) => {
        if (error) {
            console.error(`Error sending email: ${error}`);
        }
    });
}
/**
 * 3. Changed HTTP request to HTTPS request A02_2021: Cryptographic_failures
 */
function getData(): Promise<string> {
    return new Promise((resolve, reject) => {
        // Changed insecured HTTP request to HTTPS
        https.get('https://insecure-api.com/get-data', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}
/**
 * 4. Fixed variable data with data sanitation to prevent injection 
 * A03_2021: Injection
 * 5. Fixed Error logging to console and provide a clear error message 
 * A09_2021: Security Logging & Monitoring Failures
 */
function saveToDb(data: string) {
    if(!data || typeof data !== 'string' || data.trim() === ''){
        console.error('Invalid data')
        return;
    }
    const connection = mysql.createConnection(dbConfig);
    // The question marks act as placeholding parameters.
    const query = `INSERT INTO mytable (column1, column2) VALUES (?, ?)`;

    connection.connect();
    // We are connecting to the query here instead of using the unvalided values.
    connection.query(query, [data, 'Another Value'], (error, results) => {
        if (error) {
            // Log without inputting data sanitized.
            console.error('Database operation query failure.')
            return;
        }
        console.log('Data saved successfully.')
        connection.end();
    });
}

(async () => {
    const userInput = await getUserInput();
    const data = await getData();
    saveToDb(data);
    sendEmail('admin@example.com', 'User Input', userInput);
})();