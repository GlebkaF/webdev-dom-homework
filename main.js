
import { formatDate } from './formatDate.js';
import { renderComments } from './renderComments.js';
import { getComments } from './api.js';
import { initAuthButtonListener } from './loginPage.js';






export let comments = [];
export const setComments = (newComments) => {
comments = newComments;
}




    

getComments();
initAuthButtonListener();