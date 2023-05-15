import { comment, getFetch, addTodo, buttonAddElement, descrElement,nameElement } from "./api.js";

getFetch();

nameElement.addEventListener("input", () => {
  if (nameElement.value === "" || descrElement.value === "") {
    buttonAddElement.disabled = true;
  } else {
    buttonAddElement.disabled = false;
  }
});

descrElement.addEventListener("input", () => {
  if (nameElement.value === "" || descrElement.value === "") {
    buttonAddElement.disabled = true;
  } else {
    buttonAddElement.disabled = false;
  }
});

document.addEventListener("keyup", () => {
  if (event.code === "Enter") {
    nameElement.classList.remove("error");
    descrElement.classList.remove("error");
    nameElement.placeholder;
    descrElement.placeholder;
    if (nameElement.value === "" || descrElement.value === "") {
      nameElement.classList.add("error");
      descrElement.classList.add("error");
      nameElement.placeholder = "Впишите данные";
      descrElement.placeholder = "Впишите данные";
    } else {
      buttonAddElement.disabled = false;

      comment.push({
        name: nameElement.value,
        descr: descrElement.value,
      });

      nameElement.value = "";
      descrElement.value = "";
    }
  }
});

buttonAddElement.addEventListener("click", () => {
  nameElement.classList.remove("error");
  descrElement.classList.remove("error");
  nameElement.placeholder;
  descrElement.placeholder;
  if (nameElement.value === "" || descrElement.value === "") {
    nameElement.classList.add("error");
    descrElement.classList.add("error");
    nameElement.placeholder = "Впишите данные";
    descrElement.placeholder = "Впишите данные";
  } else {
    buttonAddElement.disabled = false;
    addTodo();  
  }
});
