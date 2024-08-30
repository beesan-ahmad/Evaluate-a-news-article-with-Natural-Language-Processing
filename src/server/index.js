const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');
const axios = require('axios');

const app = express();

// app.use(cors());
app.use(cors());
app.use(express.json()); // Built-in middleware for JSON
app.use(express.static(path.join(__dirname, '../../dist')));

const port = process.env.PORT || 3000; // Use environment variable or default to 3000

console.log(__dirname);
// Variables for url and api key
console.log(`Your API key is ${process.env.API_KEY}`);

app.get('/', (req, res) => {
    // Send API response back to client
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

// POST Route
app.post('/api', async (req, res) => {
    const url = req.body.url;
    // Validate input
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Make a request to the MeaningCloud API
        const apiResponse = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
            params: {
                key: process.env.API_KEY,
                txt: url,
                lang: 'en' // Specify language
            }
        });

        const { data } = apiResponse;

        if (data.status.code === '0') {
            res.json({
                agreement: data.agreement || 'Not Available',
                confidence: data.confidence || 'Not Available',
                irony: data.irony || 'Not Available',
                model: data.model || 'Not Available',
                scoreTag: data.score_tag || 'Not Available',
                subjectivity: data.subjectivity || 'Not Available',
            });
        } else {
            res.status(400).json({ error: data.status.msg });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
