const validator = require('validator');

function validateUrl(url) {
    return validator.isURL(url, {
        protocols: ['http', 'https'],
        require_protocol: true,
        require_tld: true
    });
}

module.exports = validateUrl; // Export the function directly
