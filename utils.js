
import { inputTextElement, inputNameElement } from "./api.js";
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
