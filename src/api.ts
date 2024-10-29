import { BASE_URL } from './constants';

/**
 * Fetches data from the Wikipedia API with the given parameters.
 * @param {Object} apiParams - The parameters for the API call.
 * @returns {Promise<Object>} The JSON response from the API.
 */
export const fetchData = async (apiParams) => {
  const url = `${BASE_URL}?${new URLSearchParams(apiParams).toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  return data;
};
