const { displayLoader, hideLoader } = require('../loader');

describe('Loader functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="loader" style="display: none;"></div>
    `;
  });

  test('displayLoader should make the loader visible', () => {
    displayLoader();
    expect(document.getElementById('loader').style.display).toBe('block');
  });

  test('hideLoader should hide the loader', () => {
    displayLoader(); // first show the loader
    hideLoader();    // then hide it
    expect(document.getElementById('loader').style.display).toBe('none');
  });
});
