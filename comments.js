import { userData } from "./api.js";

let form = document.querySelector('.add-form');
let newName = document.querySelector('.add-form-name');
let newComment = form.querySelector('.add-form-text');
let addButton = form.querySelector('.add-form-button');
let boxOfComments = document.querySelector('.comments');

export { form, newName, newComment, addButton, boxOfComments}