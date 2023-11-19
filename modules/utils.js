import { trimValue, setError, resetButtonState } from "./validation.js";
import { inputNameElement, inputTextElement, buttonElement } from "./render.js";

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


