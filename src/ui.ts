import { PLACEHOLDER_IMAGE_URL } from './constants';

/**
 * Initializes the show/hide comments functionality.
 */
export const initializeCommentsToggle = () => {
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
};

/**
 * Initializes the comment submission form functionality.
 */
export const initializeCommentForm = () => {
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

    if (nameValue && commentValue) {
      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      list.appendChild(listItem);
      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);

      nameField.value = '';
      commentField.value = '';
    } else {
      alert('Please enter both your name and comment.');
    }
  };
};

/**
 * Updates the UI with the bear data.
 * @param {Array} bears - An array of bear objects.
 */
export const updateUIWithBears = (bears) => {
  const moreBearsSection = document.querySelector('.more_bears');
  if (bears.length === 0) {
    moreBearsSection.innerHTML = '<p>No bear data available.</p>';
  } else {
    moreBearsSection.innerHTML = ''; // Clear existing content
    bears.forEach((bear) => {
      moreBearsSection.innerHTML += `
        <div>
          <h3>${bear.name} (${bear.binomial})</h3>
          <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;" onerror="this.onerror=null;this.src='${PLACEHOLDER_IMAGE_URL}';">
          <p><strong>Range:</strong> ${bear.range}</p>
        </div>
      `;
    });
  }
};

/**
 * Displays an error message to the user.
 * @param {string} message - The error message to display.
 */
export const displayErrorMessage = (message) => {
  const moreBearsSection = document.querySelector('.more_bears');
  moreBearsSection.innerHTML = `<p class="error-message">${message}</p>`;
};
