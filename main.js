import { enableButton } from "./enableButton.js";
import { fetchComments } from "./fetchComments.js";
import { clickButton } from "./buttonElement.js";

const buttonElement = document.getElementById("add-button");

enableButton({ buttonElement });

fetchComments();

clickButton();

console.log('It works!');