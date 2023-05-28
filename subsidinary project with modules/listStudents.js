const getListStudentsEdit = (student, index) => {
    return `
    <li class="student" data-color="${student.color}">
      <p class="student-name">
        ${student.name}
      </p>
      <p>Любимый цвет студента: ${student.color}</p>
      <button data-index="${index}" class="button delete-button">Удалить</button>
    </li>`;
};

const getListStudentsNotEdit = (student, index) => {
    return `
    <li class="student" data-color="${student.color}">
      <p class="student-name">
        ${student.name}
      </p>
      <p>Любимый цвет: ${student.color} <span style="
        display:inline-block;
        width: 15px;
        height: 15px;
        background-color: ${student.color};">
      </span></p>
    </li>`;
};

// Обратите внимание на способ экспорта
export { getListStudentsEdit, getListStudentsNotEdit };