// import { inputTextElement } from "./api.js";
import { trimValue, setError, resetButtonState } from "./validation.js";
import {
  inputNameElement,
  inputTextElement,
  buttonElement,
} from "./renderOptional.js";

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



// export const handleEnterKey = () => {
//   inputTextElement.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//       event.preventDefault();
//       if (
//         inputNameElement.value.trim() !== "" &&
//         inputTextElement.value.trim() !== ""
//       ) {
//         buttonElement.click();
//       }
//     }
//   });
// };
