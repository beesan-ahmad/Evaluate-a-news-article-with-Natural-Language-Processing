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
    const { url } = req.body;

    try {
        const apiKey = process.env.API_KEY;
        const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${url}&lang=en`);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error during API request:', error);
        res.status(500).send('An error occurred while analyzing the article.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
