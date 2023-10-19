import { getComments } from "./store.js";

export const init = () => {
  const removeFormButton = document.querySelector('.remove-form-button');
  const listComments = document.querySelector('.comments');
  removeFormButton.addEventListener('click', () => {
    const lastChild = listComments.lastChild;
    lastChild.remove();
    getComments().pop();
  })
}
