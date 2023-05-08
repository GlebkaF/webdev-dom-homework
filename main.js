import { comment, getFetch, addTodo, buttonAddElement, descrElement,nameElement } from "./api.js";




// let comment = [];

// const getFetch = () => {
//   let changeText = () => {
//     return (listElement.textContent = "подождите немного");
//   };

//   changeText();
//   return fetch(
//     "https://webdev-hw-api.vercel.app/api/v1/gromov-danil/comments",
//     {
//       method: "GET",
//     }
//   )
//     .then((response) => {
//       changeText();
//       return response.json();
//     })
//     .then((responseData) => {
//       comment = responseData.comments;
//       renderList();
//     });

// подписываемся на успешное завершение запроса с помощью then
// fetchPromise.then((response) => {
// Запускаем преобразовываем "сырые" данные от API в json формат
// const jsonPromise = response.json();

// Подписываемся на результат преобразования
// jsonPromise.then((responseData) => {
// получили данные и рендерим их в приложении
//   });
// });
// };
// const addTodo = () => {
//   buttonAddElement.disabled = true;
//   buttonAddElement.textContent = "Элемент добавлятся...";
//   fetch("https://webdev-hw-api.vercel.app/api/v1/gromov-danil/comments", {
//     method: "POST",
//     body: JSON.stringify({
//       text: descrElement.value
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;"),
//       name: nameElement.value
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;"),
//       likes: 0,
//       isLiked: false,
//       date: new Date(),
//     }),
//   })
//     .then((response) => {
//       console.log(response);
//       if (response.status === 400) {
//         return alert("Ведите в поле больше 2-ух символов");
//       }
//       if (response.status === 500) {
//         return alert("Сервер лег");
//       }
//       return response.json();
//     })

//     .then(() => {
//       // получили данные и рендерим их в приложении
//       return getFetch();
//     })
//     .then(() => {
//       buttonAddElement.disabled = false;
//       buttonAddElement.textContent = "Написать";
//       nameElement.value = "";
//       descrElement.value = "";
//     })
//     .catch((error) => {
//       buttonAddElement.disabled = false;
//       buttonAddElement.textContent = "Написать";
//       alert("Кажется, что-то пошло не так, попробуй позже");
//       // TODO: Отправлять в систему сбора ошибок
//       console.warn(error);
//     });
// };
getFetch();

// renderList();

// function initButtonsLikes() {
//   const numberLikesElements = document.querySelectorAll(".like-button");

//   for (const numberLikesElement of numberLikesElements) {
//     numberLikesElement.addEventListener("click", () => {
//       // 1. (+) Мы храним список студентов в js массиве
//       // 2. (+) При клике мы удаляем нужный элемент из массива
//       // 3. (+) На основе нового массива в js формируем html разметку списка

//       let index = numberLikesElement.dataset.index;

//       if (comment[index].isLiked === false) {
//         comment[index].likes += 1;
//         numberLikesElement.classList.add("-active-like");
//         comment[index].isLiked = true;
//       } else {
//         numberLikesElement.classList.remove("-active-like");
//         comment[index].likes -= 1;
//         comment[index].isLiked = false;
//       }
//       renderList();
//     });
//   }
// }

// function changeComment() {
//   const changeTextComment = document.querySelectorAll(".comment-text");

//   for (const changeTextCommen of changeTextComment) {
//     changeTextCommen.addEventListener("click", () => {
//       let text = changeTextCommen.dataset.text;
//       descrElement.innerHTML = changeTextCommen.dataset.text;
//       renderList();
//     });
//   }
// }
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
