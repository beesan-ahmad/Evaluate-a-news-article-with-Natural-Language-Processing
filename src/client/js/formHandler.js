const axios = require('axios');
const { displayLoader, hideLoader } = require('./loader');
const validateUrl = require('./isValidUrl');

const handleSubmit = async (event) => {
  event.preventDefault();
  const url = document.getElementById('url').value;

  if (!validateUrl(url)) {
    document.getElementById('results-section').innerHTML = '<p>Invalid URL</p>';
    return;
  }

  try {
    displayLoader();
    const response = await axios.post('http://localhost:3000/api', { url });

    if (response && response.data) {
      renderResults(response.data);
    } else {
      throw new Error('No data received');
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('results-section').innerHTML = `<p>Error: ${error.message}</p>`;
  } finally {
    hideLoader();
  }
};

const renderResults = (data) => {
  document.getElementById('agreement').textContent = `Agreement: ${data.agreement || 'N/A'}`;
  document.getElementById('irony').textContent = `Irony: ${data.irony || 'N/A'}`;
  document.getElementById('subjectivity').textContent = `Subjectivity: ${data.subjectivity || 'N/A'}`;
};

module.exports = { handleSubmit, renderResults };
