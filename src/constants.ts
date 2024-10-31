export const BASE_URL = 'https://en.wikipedia.org/w/api.php';
export const TITLE = 'List_of_ursids';

export const API_PARAMS: Record<string, string> = {
  action: 'parse',
  page: TITLE,
  prop: 'wikitext',
  section: '3', // Changed from number to string
  format: 'json',
  origin: '*',
};

export const PLACEHOLDER_IMAGE_URL =
  'https://placehold.co/200x150?text=No+Image';

export const ERROR_MESSAGES = {
  FETCH_BEAR_DATA: 'Unable to load bear data. Please try again later.',
  FETCH_IMAGE: 'Unable to load bear image.',
};
