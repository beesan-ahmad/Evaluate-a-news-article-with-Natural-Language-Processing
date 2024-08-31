const axios = require('axios');
const { removeNullValues } = require('./removeNullValues.js');
const { validateUrl } = require('./isValidUrl.js');
const { displayLoader, hideLoader } = require('./loader.js');

// Define the API endpoint for requests
const apiEndpoint = 'http://localhost:3000/api';

// Main function to handle form submission
async function processForm(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const inputUrl = document.getElementById('url').value.trim(); // Get and trim URL input

  // Validate the URL input
  if (validateUrl(inputUrl)) {
    displayLoader(); // Show loader during the API request
    try {
      // Make POST request to the API with the URL
      const result = await axios.post(apiEndpoint, { url: inputUrl });
      const responseData = result.data;

      // Process and display results from the API
      displayResults(responseData);
    } catch (error) {
      // Handle errors from the API request
      const errorMsg = error.response ? error.response.data.message : error.message;
      document.getElementById('results').innerHTML = `<p>Error: ${errorMsg}</p>`;
    } finally {
      hideLoader(); // Hide loader after the request is complete
    }
  } else {
    // Display an error message if the URL is invalid
    document.getElementById('results').innerHTML = `<p>Provide a valid URL pls!</p>`;
  }
}

// Function to display the results from the API
function displayResults(data) {
  const sanitizedData = removeNullValues(data); // Clean the data by removing null values
  for (const [field, value] of Object.entries(sanitizedData)) {
    const resultElement = document.getElementById(field);
    if (resultElement) {
      // Format the field name for display
      const formattedField = field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      resultElement.textContent = `${formattedField}: ${value || 'Not Available'}`;
    }
  }
}

// Export the functions for use in other modules
module.exports = { processForm, displayResults };