// Импортируем список студентов
import { students  } from "./data.js";

const renderStudents = (element, getListStudents) => {
    const studentsHtml = students
      .map((student, index) => getListStudents(student, index)).join("");

      element.innerHTML = studentsHtml;

    const deleteButtons = document.querySelectorAll(".delete-button");


    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = deleteButton.dataset.index;


        students.splice(index, 1);
        renderStudents(element, getListStudents);
      });
    }
};

// Обратите внимание на еще один вариант экспорта
export default renderStudents;