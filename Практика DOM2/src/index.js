const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const colorInputElement = document.getElementById("color-input");

const students = [
    {
      name: "Глеб",
      color: "#ff2600",
      isMale: true,
      isLover: true
    },
    {
      name: "Иван",
      color: "#00f900",
      isMale: true,
      isLover: false
    },
    {
      name: "Люси",
      color: "#0432ff",
      isMale: false,
      isLover: false
    }
  ];


function initEventListeners() {
    const studentElements = document.querySelectorAll('.student');

    for (const studentElement of studentElements) {
        studentElement.addEventListener('click', () => {
            // console.log(studentElement.dataset.color);
        });
    };

}

const colorFon =() => {
    const colorElements = document.querySelectorAll('span');
    //const colorElements = document.querySelectorAll('span[style^="color:"]');

    for(const colorElement of colorElements) {
        colorElement.addEventListener('click', () => {
            const elements = document.querySelectorAll('body');
            const bodyElement = elements[0];
            bodyElement.style.backgroundColor = 'red';
        })
    }
}

const greetStudent = () => {
    const greetStudentButtons = document.querySelectorAll('.student-greet');
    
    for(const greetStudentButton of greetStudentButtons) {
       
       greetStudentButton.addEventListener('click', () => {
        alert(`Привет, ${greetStudentButton.dataset.name}`);
       })
    }
}

const initDeleteButtonListener = () => {
    const deleteButtonElements = document.querySelectorAll('.delete-button');

    for(const deleteButtonElement of deleteButtonElements) {
        deleteButtonElement.addEventListener('click', () => {
        const index = deleteButtonElement.dataset.index;
        students.splice(index, 1);
        renderStudents();
        })
    }
}

const initDeleteNameButtonListener = () => {
    const deleteNameButtonElements = document.querySelectorAll('.delete-name');

    for(const deleteNameButtonElement of deleteNameButtonElements) {
        deleteNameButtonElement.addEventListener('click', () => {
            const index = deleteNameButtonElement.dataset.indexname;
            students[index].name = 'Неизвестный студент';
            renderStudents();
        })
    }
}

const renderStudents = () => {
    const studentsHtml = students.map((student, index) => {
        return `<li class="student" data-color = ${student.color}>
        <p class="student-name" style="${student.isLover ? "color: #FF8000" : "color: ${student.color}"}">
          ${student.name}, любимый цвет
          <span style="color: ${student.color}"> ${student.color}</span>
        </p>
        <button class = "student-greet" data-name = ${student.name}>Приветствовать</button>
        <button data-index=${index} class = "delete-button">Удалить</button>
        <button data-indexname=${index} class="delete-name">Стереть имя</button>
      </li>`;
    }).join('');

    listElement.innerHTML = studentsHtml;

    colorFon();
    initEventListeners();
    greetStudent();
    initDeleteButtonListener();
    initDeleteNameButtonListener();
};

renderStudents();

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("input-error");

  if (nameInputElement.value === "") {
    nameInputElement.classList.add("input-error");
    return;
  }

students.push({
    name: nameInputElement.value,
    color: colorInputElement.value,
    isLover: false
});      

      renderStudents();

  nameInputElement.value = "";
});

