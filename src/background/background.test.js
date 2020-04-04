const { filterSubStrings } = require('./background');

describe('filterSubStrings', () => {
  it('should be a function', () => {
    expect(filterSubStrings).toBeInstanceOf(Function);
  });

  it('should return all substrings of input string', () => {
    const array = ['Andreas', 'Hello', 'Andre', 'Hej'];
    expect(filterSubStrings(array, 'Andreas')).toEqual(['Andreas', 'Andre']);
  });

  it('should be a case insensitve', () => {
    const array = ['andreas', 'Hello', 'Andre', 'Hej'];
    expect(filterSubStrings(array, 'Andreas')).toEqual(['andreas', 'Andre']);
    expect(filterSubStrings(array, 'andreas')).toEqual(['andreas', 'Andre']);
  });
  it('should work with empty array', () => {
    const array = [];
    expect(filterSubStrings(array, 'Andreas')).toEqual([]);
  });
});
