const getSuggestOptions = async (url, query) => {
  try {
    const response = await fetch(`${url}${query}`);
    const data = await response.json();

    if (response.ok) return data;

    return { data: null, error: data };
  } catch (error) {
    return new Error(error);
  }
};

export default { getSuggestOptions };
