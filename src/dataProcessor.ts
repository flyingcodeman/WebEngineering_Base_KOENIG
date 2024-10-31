import { fetchData } from './api';
import { API_PARAMS, PLACEHOLDER_IMAGE_URL, ERROR_MESSAGES } from './constants';
import { updateUIWithBears, displayErrorMessage } from './ui';

/**
 * Interface representing a bear.
 */
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

/**
 * Interface for the response from the Wikipedia parse API.
 */
interface ParseResponse {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

/**
 * Interface for the response from the Wikipedia image info API.
 */
interface ImageInfoResponse {
  query: {
    pages: {
      [key: string]: ImageInfoPage;
    };
  };
}

interface ImageInfoPage {
  imageinfo?: Array<{
    url: string;
  }>;
}

/**
 * Fetches bear data from the Wikipedia API and processes it.
 */
export const getBearData = async (): Promise<void> => {
  try {
    const data = await fetchData<ParseResponse>(API_PARAMS);

    if (!data.parse || !data.parse.wikitext) {
      throw new Error('Invalid data structure returned from API.');
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);
    updateUIWithBears(bears);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    displayErrorMessage(ERROR_MESSAGES.FETCH_BEAR_DATA);
  }
};

/**
 * Extracts bear information from the wikitext.
 * @param wikitext - The wikitext content from the API.
 * @returns An array of bear objects.
 */
export const extractBears = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range\s*=\s*([^|\n]*)/);

      if (nameMatch && binomialMatch && imageMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        const imageUrl = await fetchImageUrl(fileName);

        // Process the range value
        let range = 'No range information available';

        if (rangeMatch) {
          range = rangeMatch[1].trim();

          // Remove any wiki markup
          range = range.replace(/\[\[|\]\]/g, '').trim();
          range = range.replace(/''/g, '').trim();

          // Handle cases where range is empty
          if (!range) {
            range = 'Range information not available.';
          }
        }

        const bear: Bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1].replace(/''/g, '').trim(),
          image: imageUrl,
          range: range,
        };
        bears.push(bear);
      }
    }
  }

  return bears;
};

/**
 * Fetches the image URL for a given file name.
 * @param fileName - The name of the image file.
 * @returns The URL of the image.
 */
const fetchImageUrl = async (fileName: string): Promise<string> => {
  try {
    const imageParams = {
      action: 'query',
      titles: `File:${fileName}`,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      origin: '*',
    };

    const data = await fetchData<ImageInfoResponse>(imageParams);

    if (!data.query || !data.query.pages) {
      throw new Error('Invalid data structure returned from image API.');
    }

    const pages = data.query.pages;

    // Convert pages object to an array of ImageInfoPage
    const pageValues = Object.values(pages) as ImageInfoPage[];

    if (pageValues.length === 0) {
      throw new Error(`No image info available for file: ${fileName}`);
    }

    const page = pageValues[0];

    if (!page.imageinfo || page.imageinfo.length === 0) {
      throw new Error(`No image info available for file: ${fileName}`);
    }

    const imageUrl = page.imageinfo[0].url;
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching image URL for ${fileName}:`, error);
    // Return placeholder image URL to ensure image always displays
    return PLACEHOLDER_IMAGE_URL;
  }
};
