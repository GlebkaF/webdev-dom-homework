import { getComments } from "./store.js";

const removeFormButton = document.querySelector('.remove-form-button');
const listComments = document.querySelector('.comments');


export const init = () => {
    removeFormButton.addEventListener('click', () => {
        const lastChild = listComments.lastChild;
        lastChild.remove();
        getComments().pop();
    })
}