import {nameInputElement, commentInputElement, buttonElement, addForm} from './constants.js'


export const checkInput = () => {
    if (!nameInputElement.value || !commentInputElement.value) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }