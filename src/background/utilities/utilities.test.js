import {
  filterSubStrings,
  syncQuotes,
  filterShowAndConcat,
  getRandomElement,
  getRandomQuote,
} from './utilities';

describe('filterSubStrings(strings, string)', () => {
  it('should return strings that is a substring of input string', () => {
    const strings = ['Andreas', 'Hello', 'Andre', 'Hej'];

    const substrings = filterSubStrings(strings, 'Andreas');

    expect(substrings).toEqual(['Andreas', 'Andre']);
  });

  it('should count same string as substring', () => {
    const strings = ['Hej'];

    const substrings = filterSubStrings(strings, strings[0]);

    expect(substrings).toEqual(strings);
  });

  it('should be a case insensitve', () => {
    const strings = ['andreas', 'Hello', 'Andre', 'Hej'];

    const substrings = filterSubStrings(strings, 'andreas');

    expect(substrings).toEqual(['andreas', 'Andre']);
  });
  it('should work with empty array', () => {
    const strings = [];

    const substrings = filterSubStrings(strings, 'Andreas');

    expect(substrings).toEqual([]);
  });
});

describe('syncQuotes(newQuotes, currentQuotes)', () => {
  it('should return newQuotes with show === true when the currentQuotes are undefined', () => {
    const newQuotes = [{ qoute: 'a', author: 'a' }];
    const currentQuotes = undefined;

    const quotes = syncQuotes(newQuotes, currentQuotes);

    expect(quotes).toEqual([{ qoute: 'a', author: 'a', show: true }]);
  });

  it('should return currentQuote if newQuote is equall to currentQuote', () => {
    const newQuotes = [{ qoute: 'a', author: 'a' }];
    const currentQuotes = [{ qoute: 'a', author: 'a', show: true }];

    const quotes = syncQuotes(newQuotes, currentQuotes);

    expect(quotes[0]).toEqual(currentQuotes[0]);
  });

  it('should return currentQuotes where newQuotes equalls currentQoutes', () => {
    const newQuotes = [
      { qoute: 'a', author: 'a' },
      { qoute: 'b', author: 'b' },
    ];
    const currentQuotes = [
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'b', author: 'b', show: false },
    ];

    const quotes = syncQuotes(newQuotes, currentQuotes);

    expect(quotes).toEqual(currentQuotes);
  });

  it('should return newQoutes with show == false if no match with currentQuotes', () => {
    const newQuotes = [
      { qoute: 'c', author: 'c' },
      { qoute: 'd', author: 'd' },
    ];
    const currentQuotes = [
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'b', author: 'b', show: false },
    ];

    const quotes = syncQuotes(newQuotes, currentQuotes);

    expect(quotes).toEqual([
      { qoute: 'c', author: 'c', show: false },
      { qoute: 'd', author: 'd', show: false },
    ]);
  });
  it('should return currentQuote if match with newQuote else newQuote with show == false', () => {
    const newQuotes = [
      { qoute: 'a', author: 'a' },
      { qoute: 'd', author: 'd' },
    ];
    const currentQuotes = [
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'b', author: 'b', show: false },
    ];

    const quotes = syncQuotes(newQuotes, currentQuotes);

    expect(quotes).toEqual([
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'd', author: 'd', show: false },
    ]);
  });
});

describe('filterShowAndConcat(quoteObjects, quotes)', () => {
  it('should transform  quoteObjects to just text', () => {
    const quoteObjects = [{ qoute: 'a', author: 'a', show: true }];
    const newQuotes = [];

    const result = filterShowAndConcat(quoteObjects, newQuotes);

    expect(result).toEqual(['a']);
  });

  it('should filter away all quoteObjects where show=false', () => {
    const quoteObjects = [
      { qoute: 'a', author: 'a', show: false },
      { qoute: 'b', author: 'b', show: false },
      { qoute: 'd', author: 'd', show: true },
    ];
    const newQuotes = [];

    const result = filterShowAndConcat(quoteObjects, newQuotes);

    expect(result).toEqual(['d']);
  });

  it('should return all quotes + text from quoteObjects where show=true', () => {
    const quoteObjects = [
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'd', author: 'd', show: false },
    ];
    const newQuote = ['d', 'e', 'f'];

    const result = filterShowAndConcat(quoteObjects, newQuote);

    expect(result).toEqual(['a', 'd', 'e', 'f']);
  });
});

describe('getRandomElement(list)', () => {
  it('should return undefined if list is undefined', () => {
    const list = undefined;
    const result = getRandomElement(list);
    expect(result).toBe(undefined);
  });

  it('should return random element from list', () => {
    Math.random = jest.fn(() => 0);
    const list = [1, 2, 3];
    const result = getRandomElement(list);
    expect(result).toBe(list[0]);
  });
});

describe('getRandomQuote(quoteObjects, quotes)', () => {
  it('should return random quote from either quoteObjects where show = true or quotes', () => {
    const quotesObjects = [
      { qoute: 'a', author: 'a', show: true },
      { qoute: 'never show', author: '', show: false },
      { qoute: 'never show', author: 'b', show: false },
      { qoute: 'never show', author: 'b', show: false },
      { qoute: 'never show', author: 'b', show: false },
    ];
    const quotes = ['c', 'd', 'e'];

    const allPossibleQoutes = ['a', 'c', 'd', 'e'];

    const result = getRandomQuote(quotesObjects, quotes);
    expect(allPossibleQoutes).toContain(result);
  });
});
