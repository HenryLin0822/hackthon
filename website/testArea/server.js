import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Serve the HTML file
app.get('/', (req, res) => {
    fs.readFile('localfile.txt', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Local File Data</title>
            </head>
            <body>
                <h1>Current Number: <span id="number">${data}</span></h1>
                <button onclick="window.location.reload()">Reload</button>
            </body>
            </html>
        `);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
