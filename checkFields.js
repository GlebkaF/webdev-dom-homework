import { buttonElement, nameElement, commentElement } from "./main.js";

export const checkFields = () => {

    if (nameElement.value && commentElement.value) {
        buttonElement.disabled = false;
    } else {
        buttonElement.disabled = true;
    }
    }
