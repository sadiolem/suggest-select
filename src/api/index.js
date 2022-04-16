const getSuggestOptions = async (query) => {
  try {
    const url = new URL('https://habr.com/kek/v2/publication/suggest-mention');
    url.searchParams.set('q', query);
    url.toString();

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) return data;

    return { data: null, error: data };
  } catch (error) {
    return new Error(error);
  }
};

export default { getSuggestOptions };
