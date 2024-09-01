import { processSubmission } from '../formHandler';

describe('processSubmission', () => {
  beforeEach(() => {
    // Set up a basic HTML structure
    document.body.innerHTML = `
      <form id="test-form">
        <input id="article-url" type="text" value="https://example.com">
        <div id="polarity"></div>
        <div id="subjectivity"></div>
        <div id="text"></div>
      </form>
    `;

    // Mock updateInterface function
    global.updateInterface = jest.fn();

    // Mock fetch to return a resolved promise
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        polarity: 'positive',
        subjectivity: 'subjective',
        text: 'Sample text',
      }),
    });
  });

  afterEach(() => {
    // Clean up mocks
    jest.resetAllMocks();
  });

  test('It should be a function', () => {
    expect(typeof processSubmission).toBe('function');
  });

  test('It should prevent default form submission', () => {
    const event = { preventDefault: jest.fn() };
    processSubmission(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  test('It should call updateInterface with the response data', async () => {
    const event = { preventDefault: jest.fn() };
    await processSubmission(event);

    // Debugging line
    console.log('updateInterface calls:', global.updateInterface.mock.calls);

    expect(global.updateInterface).toHaveBeenCalledWith({
      polarity: 'positive',
      subjectivity: 'subjective',
      text: 'Sample text',
    });
  });

});
