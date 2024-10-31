import { BASE_URL } from './constants';

/**
 * Fetches data from the Wikipedia API with the given parameters.
 * @param apiParams - The parameters for the API call.
 * @returns The JSON response from the API.
 */
export const fetchData = async <T>(
  apiParams: Record<string, string>
): Promise<T> => {
  const url = `${BASE_URL}?${new URLSearchParams(apiParams).toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data: T = await res.json();
  return data;
};
