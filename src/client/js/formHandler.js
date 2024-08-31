const axios = require('axios');
const { removeNullValues } = require('./removeNullValues.js');
const { validateUrl } = require('./isValidUrl.js');
const { displayLoader, hideLoader } = require('./loader.js');

const apiEndpoint = 'http://localhost:3000/api';

async function processForm(event) {
  event.preventDefault();
  const inputUrl = document.getElementById('url').value;
  
  if (validateUrl(inputUrl)) {
    displayLoader();
    try {
      const result = await axios.post(apiEndpoint, { url: inputUrl });
      const responseData = result.data;
      console.log('Received Data:', responseData);

      displayResults(responseData);
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : error.message;
      document.getElementById('results-section').innerHTML = `<p>Error: ${errorMsg}</p>`;
    } finally {
      hideLoader();
    }
  } else {
    document.getElementById('results-section').innerHTML = `<p>Please provide a valid URL.</p>`;
  }
}

function displayResults(data) {
  const sanitizedData = removeNullValues(data);
  for (const [field, value] of Object.entries(sanitizedData)) {
    const resultElement = document.getElementById(field);
    if (resultElement) {
      const formattedField = field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      resultElement.textContent = `${formattedField}: ${value || 'N/A'}`;
    }
  }
}

module.exports = { processForm, displayResults };
