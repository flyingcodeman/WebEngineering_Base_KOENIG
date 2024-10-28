import { baseUrl, params } from './constants.js';

export const fetchData = async (apiParams) => {
  const url = `${baseUrl}?${new URLSearchParams(apiParams).toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
