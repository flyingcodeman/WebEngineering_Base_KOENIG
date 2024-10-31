import { getBearData } from './dataProcessor';
import { initializeCommentsToggle, initializeCommentForm } from './ui';

initializeCommentsToggle();
initializeCommentForm();

void getBearData(); // Added 'void' to ignore the promise
