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
// src/ui.ts

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

export const updateUIWithBears = (bears: Bear[]): void => {
  const moreBearsSection = document.querySelector<HTMLElement>('.more_bears');
  if (!moreBearsSection) {
    console.error('More Bears section not found in the DOM.');
    return;
  }

  if (bears.length === 0) {
    moreBearsSection.innerHTML = '<p>No bear data available.</p>';
  } else {
    // Create table element
    const table = document.createElement('table');

    // Add caption to the table
    const caption = document.createElement('caption');
    caption.textContent = 'List of Various Bears';
    table.appendChild(caption);

    // Create table head
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const headers = ['Name', 'Binomial Name', 'Image', 'Range'];

    headers.forEach((headerText) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    bears.forEach((bear: Bear) => {
      const row = document.createElement('tr');

      // Name cell
      const nameCell = document.createElement('td');
      nameCell.textContent = bear.name;
      row.appendChild(nameCell);

      // Binomial Name cell
      const binomialCell = document.createElement('td');
      binomialCell.textContent = bear.binomial;
      row.appendChild(binomialCell);

      // Image cell
      const imageCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = bear.image;
      img.alt = `${bear.name} (${bear.binomial})`;
      img.width = 200;
      img.onerror = () => {
        img.src = PLACEHOLDER_IMAGE_URL;
      };
      imageCell.appendChild(img);
      row.appendChild(imageCell);

      // Range cell
      const rangeCell = document.createElement('td');
      rangeCell.textContent = bear.range;
      row.appendChild(rangeCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    moreBearsSection.appendChild(table);
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
