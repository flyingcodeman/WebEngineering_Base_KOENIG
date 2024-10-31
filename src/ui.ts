import { PLACEHOLDER_IMAGE_URL } from './constants';

/**
 * Initializes the show/hide comments functionality.
 */
export const initializeCommentsToggle = () => {
  const showHideBtn = document.querySelector(
    '.show-hide'
  ) as HTMLElement | null;
  const commentWrapper = document.querySelector(
    '.comment-wrapper'
  ) as HTMLElement | null;

  if (commentWrapper) {
    commentWrapper.style.display = 'none';
  }

  if (showHideBtn && commentWrapper) {
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
  } else {
    console.error('Required elements not found in the DOM.');
  }
};

/**
 * Initializes the comment submission form functionality.
 */
export const initializeCommentForm = () => {
  const form = document.querySelector(
    '.comment-form'
  ) as HTMLFormElement | null;
  const nameField = document.querySelector('#name') as HTMLInputElement | null;
  const commentField = document.querySelector(
    '#comment'
  ) as HTMLInputElement | null;
  const list = document.querySelector(
    '.comment-container'
  ) as HTMLUListElement | null;

  if (form && nameField && commentField && list) {
    form.onsubmit = (e: Event) => {
      e.preventDefault();
      const listItem = document.createElement('li');
      const namePara = document.createElement('p');
      const commentPara = document.createElement('p');
      const nameValue = nameField.value;
      const commentValue = commentField.value;

      if (nameValue && commentValue) {
        namePara.textContent = nameValue;
        commentPara.textContent = commentValue;

        listItem.appendChild(namePara);
        listItem.appendChild(commentPara);
        list.appendChild(listItem);

        nameField.value = '';
        commentField.value = '';
      } else {
        alert('Please enter both your name and comment.');
      }
    };
  } else {
    console.error('Required form elements not found in the DOM.');
  }
};

/**
 * Updates the UI with the bear data.
 * @param bears - An array of bear objects.
 */
export const updateUIWithBears = (bears: Bear[]) => {
  const moreBearsSection = document.querySelector(
    '.more_bears'
  ) as HTMLElement | null;
  if (moreBearsSection) {
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
  } else {
    console.error('More Bears section not found in the DOM.');
  }
};

/**
 * Displays an error message to the user.
 * @param message - The error message to display.
 */
export const displayErrorMessage = (message: string) => {
  const moreBearsSection = document.querySelector(
    '.more_bears'
  ) as HTMLElement | null;
  if (moreBearsSection) {
    moreBearsSection.innerHTML = `<p class="error-message">${message}</p>`;
  } else {
    console.error('More Bears section not found in the DOM.');
  }
};

/**
 * Interface representing a bear.
 */
interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}
