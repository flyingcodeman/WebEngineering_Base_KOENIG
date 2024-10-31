import { PLACEHOLDER_IMAGE_URL } from './constants';

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
 * Initializes the show/hide comments functionality.
 */
export const initializeCommentsToggle = (): void => {
  const showHideBtn = document.querySelector('.show-hide');
  const commentWrapper = document.querySelector('.comment-wrapper');

  if (!commentWrapper) {
    console.error('Comment wrapper element not found');
    return;
  }

  (commentWrapper as HTMLElement).style.display = 'none';

  if (!showHideBtn) {
    console.error('Show/Hide button not found');
    return;
  }

  (showHideBtn as HTMLElement).onclick = () => {
    const showHideText = showHideBtn.textContent;
    if (showHideText === 'Show comments') {
      showHideBtn.textContent = 'Hide comments';
      (commentWrapper as HTMLElement).style.display = 'block';
    } else {
      showHideBtn.textContent = 'Show comments';
      (commentWrapper as HTMLElement).style.display = 'none';
    }
  };
};

/**
 * Initializes the comment submission form functionality.
 */
export const initializeCommentForm = (): void => {
  const form = document.querySelector('.comment-form');
  const nameField = document.querySelector('#name');
  const commentField = document.querySelector('#comment');
  const list = document.querySelector('.comment-container');

  if (!form || !nameField || !commentField || !list) {
    console.error('Required form elements not found in the DOM.');
    return;
  }

  (form as HTMLFormElement).onsubmit = (e: Event): void => {
    e.preventDefault();
    const listItem = document.createElement('li');
    const namePara = document.createElement('p');
    const commentPara = document.createElement('p');
    const nameValue = (nameField as HTMLInputElement).value;
    const commentValue = (commentField as HTMLInputElement).value;

    if (nameValue && commentValue) {
      namePara.textContent = nameValue;
      commentPara.textContent = commentValue;

      listItem.appendChild(namePara);
      listItem.appendChild(commentPara);
      list.appendChild(listItem);

      (nameField as HTMLInputElement).value = '';
      (commentField as HTMLInputElement).value = '';
    } else {
      alert('Please enter both your name and comment.');
    }
  };
};

/**
 * Updates the UI with the bear data.
 * @param bears - An array of bear objects.
 */
export const updateUIWithBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector('.more_bears');
  if (!moreBearsSection) {
    console.error('More Bears section not found in the DOM.');
    return;
  }

  if (bears.length === 0) {
    moreBearsSection.innerHTML = '<p>No bear data available.</p>';
  } else {
    moreBearsSection.innerHTML = ''; // Clear existing content
    bears.forEach((bear: Bear) => {
      const bearDiv = document.createElement('div');

      const title = document.createElement('h3');
      title.textContent = `${bear.name} (${bear.binomial})`;

      const img = document.createElement('img');
      img.src = bear.image;
      img.alt = bear.name;
      img.style.width = '200px';
      img.style.height = 'auto';
      img.onerror = () => {
        img.src = PLACEHOLDER_IMAGE_URL;
      };

      const rangePara = document.createElement('p');
      rangePara.innerHTML = `<strong>Range:</strong> ${bear.range}`;

      bearDiv.appendChild(title);
      bearDiv.appendChild(img);
      bearDiv.appendChild(rangePara);
      moreBearsSection.appendChild(bearDiv);
    });
  }
};

/**
 * Displays an error message to the user.
 * @param message - The error message to display.
 */
export const displayErrorMessage = (message: string): void => {
  const moreBearsSection = document.querySelector('.more_bears');
  if (!moreBearsSection) {
    console.error('More Bears section not found in the DOM.');
    return;
  }

  const errorPara = document.createElement('p');
  errorPara.classList.add('error-message');
  errorPara.textContent = message;
  moreBearsSection.innerHTML = '';
  moreBearsSection.appendChild(errorPara);
};
