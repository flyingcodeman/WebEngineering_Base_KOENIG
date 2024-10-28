// Functionality for showing/hiding the comments section
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideBtn.onclick = () => {
  const showHideText = showHideBtn.textContent;
  if (showHideText === 'Show comments') {
    showHideBtn.textContent = 'Hide comments';
    commentWrapper.style.display = 'block';
  } else {
    showHideBtn.textContent = 'Show comments';
    commentWrapper.style.display = 'none';
  }
};

// Functionality for adding a new comment via the comments form
const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.onsubmit = (e) => {
  e.preventDefault();
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  const nameValue = nameField.value;
  const commentValue = commentField.value;

  namePara.textContent = nameValue;
  commentPara.textContent = commentValue;

  list.appendChild(listItem);
  listItem.appendChild(namePara);
  listItem.appendChild(commentPara);

  nameField.value = '';
  commentField.value = '';
};

// Function to fetch the image URLs based on the file names
const baseUrl = "https://en.wikipedia.org/w/api.php";
const title = "List_of_ursids";

const params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

const placeholderImageUrl = 'https://placehold.co/60x40?text=Placeholder+Image+of+a+Bear';

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

    const url = `${baseUrl}?${new URLSearchParams(imageParams).toString()}`;

    const res = await fetch(url);
    const data = await res.json();

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
    // Return null to indicate failure
    return null;
  }
};

const extractBears = async (wikitext) => {
  try {
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

          // Placeholder image if the image URL is invalid
          const validImageUrl = imageUrl || placeholderImageUrl;

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
            image: validImageUrl,
            range: range
          };
          bears.push(bear);
        }
      }
    }

    // Update the UI after all bears are processed
    const moreBearsSection = document.querySelector('.more_bears');
    if (bears.length === 0) {
      moreBearsSection.innerHTML = '<p>No bear data available.</p>';
    } else {
      bears.forEach((bear) => {
        moreBearsSection.innerHTML += `
          <div>
            <h3>${bear.name} (${bear.binomial})</h3>
            <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;" onerror="this.onerror=null;this.src='${placeholderImageUrl}';">
            <p><strong>Range:</strong> ${bear.range}</p>
          </div>
        `;
      });
    }
  } catch (error) {
    console.error('Error extracting bear data:', error);
    // Display an error message to the user
    const moreBearsSection = document.querySelector('.more_bears');
    moreBearsSection.innerHTML = '<p class="error-message">Unable to load bear data - Please try again</p>';
  }
};



const getBearData = async () => {
  try {
    const url = `${baseUrl}?${new URLSearchParams(params).toString()}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.parse || !data.parse.wikitext) {
      throw new Error('Invalid data structure returned from API.');
    }

    const wikitext = data.parse.wikitext['*'];
    await extractBears(wikitext);
  } catch (error) {
    console.error('Error fetching bear data:', error);
    // Display an error message to the user
    const moreBearsSection = document.querySelector('.more_bears');
    moreBearsSection.innerHTML = '<p class="error-message">Unable to load bear data - Please try again</p>';
  }
};

// Fetch and display the bear data
getBearData();
