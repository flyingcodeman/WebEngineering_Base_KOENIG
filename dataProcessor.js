import { fetchData } from './api.js';
import { params, placeholderImageUrl } from './constants.js';
import { updateUIWithBears, displayErrorMessage } from './ui.js';

export const getBearData = async () => {
  try {
    const data = await fetchData(params);

    if (!data.parse || !data.parse.wikitext) {
      throw new Error('Invalid data structure returned from API.');
    }

    const wikitext = data.parse.wikitext['*'];
    const bears = await extractBears(wikitext);
    updateUIWithBears(bears);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    displayErrorMessage('Unable to load bear data - Please try again');
  }
};

const fetchImageUrl = async (fileName) => {
  try {
    const imageParams = {
      action: "query",
      titles: `File:${fileName}`,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    };

    const data = await fetchData(imageParams);

    if (!data.query || !data.query.pages) {
      throw new Error('Invalid data structure returned from image API.');
    }

    const pages = data.query.pages;
    const pageValues = Object.values(pages);

    if (pageValues.length === 0 || !pageValues[0].imageinfo) {
      throw new Error(`No image info available for file: ${fileName}`);
    }

    const imageUrl = pageValues[0].imageinfo[0].url;
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching image URL for ${fileName}:`, error);
    // Return placeholder image URL to ensure image always displays
    return placeholderImageUrl;
  }
};

const extractBears = async (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

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

        const bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1].replace(/''/g, '').trim(),
          image: imageUrl,
          range: range
        };
        bears.push(bear);
      }
    }
  }

  return bears;
};