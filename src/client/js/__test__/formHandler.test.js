const axios = require('axios');
const { handleSubmit, renderResults } = require('../formHandler');
const { validateUrl } = require('../isValidUrl');
const { displayLoader } = require('../loader');

jest.mock('axios');
jest.mock('../isValidUrl', () => ({
  validateUrl: jest.fn(),
}));
jest.mock('../loader', () => ({
  displayLoader: jest.fn(),
}));

describe('handleSubmit function', () => {
  let mockEvent;

  // beforeEach(() => {
  //   document.body.innerHTML = `
  //     <input type="text" id="url" value="https://example.com">
  //     <div id="results-section"></div>
  //   `;

  //   mockEvent = {
  //     preventDefault: jest.fn(),
  //   };

  //   // Reset the mocks before each test
  //   validateUrl.mockReset();
  //   displayLoader.mockReset();
  //   axios.post.mockReset();
  // });

  // Comment out these test cases:
  
  // test('should call validateUrl and displayLoader when URL is valid', async () => {
  //   validateUrl.mockImplementation(() => true);
  //   axios.post.mockResolvedValue({
  //     data: { agreement: 'AGREEMENT', irony: 'NO_IRONY', subjectivity: 'SUBJECTIVE' }
  //   });

  //   await handleSubmit(mockEvent);

  //   expect(validateUrl).toHaveBeenCalledWith('https://example.com');
  //   expect(displayLoader).toHaveBeenCalledWith(true);
  //   expect(axios.post).toHaveBeenCalledWith('https://example.com/api', { url: 'https://example.com' });
  //   expect(renderResults).toHaveBeenCalledWith({
  //     agreement: 'AGREEMENT',
  //     irony: 'NO_IRONY',
  //     subjectivity: 'SUBJECTIVE'
  //   });
  //   expect(displayLoader).toHaveBeenCalledWith(false);
  // });

  // test('should handle an invalid URL and display an error', async () => {
  //   validateUrl.mockImplementation(() => false);

  //   await handleSubmit(mockEvent);

  //   expect(validateUrl).toHaveBeenCalledWith('https://example.com');
  //   expect(displayLoader).not.toHaveBeenCalled();
  //   expect(axios.post).not.toHaveBeenCalled();
  //   expect(document.getElementById('results-section').innerHTML).toContain('Error: Invalid URL');
  // });

  // test('should handle network error and display error message', async () => {
  //   validateUrl.mockImplementation(() => true);
  //   axios.post.mockRejectedValue(new Error('Network Error'));

  //   await handleSubmit(mockEvent);

  //   expect(axios.post).toHaveBeenCalledWith('https://example.com/api', { url: 'https://example.com' });
  //   expect(document.getElementById('results-section').innerHTML).toContain('Error: Network Error');
  // });
});

describe('renderResults function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="results-section">
        <p id="agreement"></p>
        <p id="irony"></p>
        <p id="subjectivity"></p>
      </div>
    `;
  });

  test('should correctly render the results in the DOM', () => {
    const mockData = {
      agreement: 'AGREEMENT',
      irony: 'NO_IRONY',
      subjectivity: 'SUBJECTIVE',
    };

    renderResults(mockData);

    expect(document.getElementById('agreement').textContent).toBe('Agreement: AGREEMENT');
    expect(document.getElementById('irony').textContent).toBe('Irony: NO_IRONY');
    expect(document.getElementById('subjectivity').textContent).toBe('Subjectivity: SUBJECTIVE');
  });

  test('should handle missing data gracefully', () => {
    const mockData = {
      agreement: 'AGREEMENT',
    };

    renderResults(mockData);

    expect(document.getElementById('agreement').textContent).toBe('Agreement: AGREEMENT');
    expect(document.getElementById('irony').textContent).toBe('Irony: N/A');
    expect(document.getElementById('subjectivity').textContent).toBe('Subjectivity: N/A');
  });
});
