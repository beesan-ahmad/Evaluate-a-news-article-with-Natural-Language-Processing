function removeNullValues(data) {
  return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null));
}

module.exports = { removeNullValues };