function displayLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'block';
  }
}

function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

module.exports = {
  displayLoader,
  hideLoader,
};
