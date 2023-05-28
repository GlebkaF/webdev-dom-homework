import { students } from "./data.js";
import { getListStudentsEdit } from "./listStudents.js";
// Т. к. renderStudents экспортировалась по умолчанию default,
// то имя функции мы не берем в фигурные скобки
import renderStudents from "./renderStudents.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const colorInputElement = document.getElementById("color-input");

renderStudents(listElement, getListStudentsEdit);

buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("input-error");
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("input-error");
    return;
  }

  students.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    color: colorInputElement.value,
  }); 

  renderStudents(listElement, getListStudentsEdit);

  nameInputElement.value = "";
});
