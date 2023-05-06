const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const colorInputElement = document.getElementById("color-input");
const studentElements = document.querySelectorAll('.student');

const students = [ //создаем массив из студентов, взяв нужные значения из верстки
  {
    name: 'Глеб',
    color: '#ff2600',
  }, 
  {
    name: 'Иван',
    color: '#00f900',
  },
  {
    name: 'Люси',
    color: '#0432ff',
  },
];

const renderStudents = () => { //функция, которая берет данные из массива и собирает на их основе верстку
  const studentsHtml = students.map((student, index) => {
    return `<li class="student" data-color="${student.color}">
        <p class="student-name">
          ${student.name}
        <!-- 
          , любимый цвет
          <span style="color: ${student.color}"> ${student.color}</span>
        -->
        </p>
        <button data-index="${index}" class="delete-button">Удалить</button>
      </li>`; //берем верстку из функции, которая добавляет нового студента и меняем значения инпутов на свойства элементов массива со студентами. Получаем массив из кусков верстки со значениями имен и цветов из массива студентов
  }).join(''); //сразу же соединяем этот массив в один большой текстовый кусок верстки через join

  listElement.innerHTML = studentsHtml; //кладем в html списка элементов получившуюся строку

  initEventListeners(); //вызываем для того, чтобы получить всех студентов и обработать клик на них
  initDeleteButtonsListeners(); //вызываем функцию кторая получает все кнопки удаления и обрабатывает клик на них
};


const initEventListeners = () => { //функция для получения студентов и обработки клика на них
  const studentElements = document.querySelectorAll('.student'); //получаем все имена студентов. Метод возвращает псевдомассив

  for(const studentElement of studentElements) { //перебор всех полученных студентов
    studentElement.addEventListener('click', () => { //обработка клика на студентах
      console.log(studentElement.dataset.color); //получаем в консоли значение дата-атрибута color из верстки
    });
  }
};

const initDeleteButtonsListeners = () => { //функция которая получает все кнопки удаления элементов
  const deleteButtonsElements = document.querySelectorAll('.delete-button'); //получаем кнопки "удалить"

  for(const deleteButtonElement of deleteButtonsElements) { //обработка клика на всех кнопках удаления
    deleteButtonElement.addEventListener('click', (event) => {
      console.log('delete handler');
      event.stopPropagation();
      // console.log('Удаляю элемент');
      //План удаления
      //1. + Храним список студентов в js-массиве
      //2. При клике мы удаляем нужный элемент из массива
      //3. На основе нового массива в js формируем html-разметку списка

      const index = deleteButtonElement.dataset.index; //берем дата-атрибут индекса студента в массиве, который был передан в момент рендеринга
      students.splice(index, 1); //вырезаем один элемент массива от элемента под номером index
      renderStudents(); //рендерим студентов после удаления элемента
    });
  }

  const studentsElements = document.querySelectorAll('.student');

  for(const student of studentsElements) { //если добавить обработчик события на каждую карточку студента так, чтобы при клике на нее
    student.addEventListener("click", () => { //появлялся алерт с любимым цветом, то при клике на кнопку удаления внутри карточки тоже
      console.log('alert handler');
      const color = student.dataset.color; //будет срабатывать этот алерт. Всему виной всплытие элементов.
      alert(`Любимый цвет: ${color}`); // всплытие событий - это явление, которое заключается в обработке событий по очереди сначала на самом элементе, а потом и на его родителях. Так же если кликнуть на родителя, у которого есть обработчик события, то событие произойдет и в том случае, если кликнуть на любой из дочерних его элементов. Если добавить на событие event в дочернем элементе stopPropagation, то всплытие отменится. 
    });
  }
};

renderStudents(); //рендерим студентов из массива




buttonElement.addEventListener("click", () => { //обработка клика на кнопке добавить
  nameInputElement.classList.remove("input-error"); //снимаем ошибку пустого инпута

  if (nameInputElement.value === "") { //условное ветвление: если инпут пустой то меняем класс инпута на подкрашенный красным
    nameInputElement.classList.add("input-error");
    return;
  }

  students.push({ //добавляем в массив данные студента из инпутов
    name: nameInputElement.value
      .replaceAll('<', '&lt')
      .replaceAll('>', '&gt'),
    color: colorInputElement.value,
    //Если пользователь добавит верстку в инпуты формы добавления студента, то эта верстка может отобразиться на странице и попасть на сервер, что создает угрозы для безопасности данных других пользователей (могут быть украдены, к примеру, данные банковских карт. Всему виной innerHtml)
    //Есть решение такой проблемы уязвимости: можно использовать альтернативные знаки > и <, которые не воспринимаются браузером как обозначения тега. Для этого необходимо заменить эти знаки с помощью метода replaceAll на &gt и &lt соответственно. 
  });

  // listElement.innerHTML = //добавляем к имеющейся верстке верстку со строкой о новом студенте и его любимом цвете
  //   listElement.innerHTML +
  //   `<li class="student" data-color='${colorInputElement.value}'>
  //       <p class="student-name">
  //         ${nameInputElement.value}, любимый цвет
  //         <span style="color: ${colorInputElement.value}"> ${colorInputElement.value}</span>
  //       </p>
  //       <button class="delete-button">Удалить</button>
  //     </li>`;

  renderStudents(); //рендерим студентов после добавления нового элемента массива

  nameInputElement.value = ""; //очищаем инпут после добавления студента
});

//Удаление элементов списка:
//1. Добавить в разметку кнопку "удалить"
//2. Добавить на кнопки удаления обработчик клика
//3. Реализовать внутри обработчика удаление элемента
