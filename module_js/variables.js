export const listElement = document.getElementById("comments-list");
export const buttonElement = document.getElementById("button-form");
export const nameInputElement = document.getElementById("user-name");
export const textInputElement = document.getElementById("user-text");
export const formElement = document.getElementById("form");
export const deleteButtonElement = document.getElementById("delete-button");
export const toggleButton = document.getElementById("toggle-button");
export const userName = document.getElementById("username");
export const userLogin = document.getElementById("login");
export const userPassword = document.getElementById("password"); 

export const formatDate = (commentDate) => {
  let date = new Date();
  const formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear().toString().slice(-2) +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  return formattedDate;
};

export let comments = [];