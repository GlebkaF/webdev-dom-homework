import { getListStudentsNotEdit } from "./listStudents.js";
// Т. к. renderStudents экспортировалась по умолчанию default,
// то имя функции мы не берем в фигурные скобки
import renderStudents from "./renderStudents.js";

const listElement = document.getElementById("list");

renderStudents(listElement, getListStudentsNotEdit);