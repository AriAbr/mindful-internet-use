export const filterSubStrings = (strings, string) =>
  strings.filter(
    (elem) => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1
  );

export const syncQuotes = (newQoutes, currentQoutes) => {
  if (!currentQoutes) {
    return newQoutes.map((qoute) => ({ ...qoute, show: true }));
  }

  return newQoutes.map((newQoute) => {
    const qoute = currentQoutes.find(
      (currentQoute) => currentQoute.qoute === newQoute.qoute
    );
    const show = typeof qoute === 'undefined' ? false : qoute.show;
    return { ...newQoute, show };
  });
};

export const filterShowAndConcat = (quotes, newQoute) =>
  quotes
    .filter((quote) => quote.show)
    .map((quote) => quote.qoute)
    .concat(newQoute);

const randomIntegerBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomElement = (list) =>
  list && list.length > 0
    ? list[randomIntegerBetween(0, list.length - 1)]
    : undefined;

export const getRandomQuote = (quoteObjects, quotes) =>
  getRandomElement(filterShowAndConcat(quoteObjects, quotes));

export const subStringInArray = (string, array) =>
  array.find((elem) => string.toLowerCase().indexOf(elem.toLowerCase()) !== -1);

export const arrayHasSubString = (array, string) =>
  array.find((elem) => elem.toLowerCase().indexOf(string.toLowerCase()) !== -1);

export const generateNotification = (defaults, userDefined) => ({
  type: 'basic',
  title: 'Mindful Internet Use',
  iconUrl: '../img/logoBlue128.png',
  message:
    getRandomQuote(defaults, userDefined) ||
    'Until we can manage time, we can manage nothing else',
});
