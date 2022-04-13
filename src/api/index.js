const getSuggestOptions = async (query) => {
  const url = new URL('https://habr.com/kek/v2/publication/suggest-mention');
  url.searchParams.set('q', query);
  url.toString();

  const response = await fetch(url);
  const data = await response.json();

  // TODO errors handler

  return data;
};

export default { getSuggestOptions };
