// import { inputTextElement } from "./api.js";
import { buttonElement } from "./render.js";
import { trimValue, setError, resetButtonState } from "./validation.js";
import { inputNameElement, inputTextElement } from "./renderOptional.js";

export function currentDate(date) {
  return date.toLocaleString("ru-RU", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export const toggleButton = (buttonElement) => {
  const inputNameElement = document.getElementById("name-input");
  console.log(inputNameElement, inputTextElement);
  if (
    inputNameElement.value.trim().length >= 3 &&
    inputTextElement.value.trim().length >= 3
  ) {
    buttonElement.disabled = false;
    buttonElement.classList.remove("disabled");
  } else {
    buttonElement.disabled = true;
    buttonElement.classList.add("disabled");
  }
};

export const handleEnterKey = () => {
  inputTextElement.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (
        inputNameElement.value.trim() !== "" &&
        inputTextElement.value.trim() !== ""
      ) {
        buttonElement.click();
      }
    }
  });
};
