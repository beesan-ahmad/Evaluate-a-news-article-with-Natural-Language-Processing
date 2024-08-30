const { validateUrl } = require('../isValidUrl');

describe('isValidUrl', () => {
  test('should return true for valid URLs', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('http://example.com')).toBe(true);
    expect(validateUrl('https://sub.example.com')).toBe(true);
    expect(validateUrl('https://example.com/path?query=param')).toBe(true);
  });

  test('should return false for invalid URLs', () => {
    expect(validateUrl('invalid-url')).toBe(false);
    expect(validateUrl('ftp://example.com')).toBe(false);
    expect(validateUrl('http://')).toBe(false);
    expect(validateUrl('http://example')).toBe(false);
  });

  test('should return false for email addresses', () => {
    expect(validateUrl('beesan@gmail.com')).toBe(false);
    expect(validateUrl('b.a.mfarreh@students.ptuk.edu.ps')).toBe(false);
  });

  test('should return false for empty strings', () => {
    expect(validateUrl('')).toBe(false);
  });
});
