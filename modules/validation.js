import { buttonElement } from "./renderOptional.js";
export const trimValue = (element) => element.value.trim();

export const setError = (element, message) => {};
export const resetButtonState = (buttonElement, value) => {
  buttonElement.disabled = false;
  buttonElement.textContent = value;
};
