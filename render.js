//import { getListComments } from "./listComments.js";
import { getArr } from "./main.js";
import { fetchPOST } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";


export let token ="Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
token = null;
// Рендерим из массива разметку
function renderAPP(getListComments, comments) {
    const appEL = document.getElementById("app");
    if (!token) {
        renderLoginComponent({
            comments,
            appEL,
            setToken: (newToken) => {
              token = newToken;
            },
            getArr,
          });
        return;

    };

    const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join('');
    const appHtml = `<div class="preloader">
    <p class="text">Пожалуйста, подождите, комментарии загружаются...</p>
  </div>
  <div class="container">
    <ul class="comments" id="list">
    ${commentsHTML}
    </ul>

    <form class="add-form" id="add-form">
      <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="name-input" />
      <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
        id="coment-input"></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="end-delete-button">Удалить</button>
        <button class="add-form-button" id="add-button">Написать</button>
      </div>
    </form>

    <div class="loading">Ваш комментарий добавляется...</div>
  </div>`


    appEL.innerHTML = appHtml;


    const loadingElement = document.querySelector(".loading");
    const addFormElement = document.getElementById("add-form");
    const addButtonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const comentInputElement = document.getElementById("coment-input");

    loadingElement.classList.add("display-none");

    //Добавление возможности редактирования на каждый комент
    function initiateRedact() {
        const redactButtons = document.querySelectorAll(".redact-button");
        for (const redactButton of redactButtons) {
            redactButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = redactButton.dataset.index;
                comments[index].isEdit = !comments[index].isEdit;
                renderAPP(getListComments, comments);
            });

        }
        const saveButtons = document.querySelectorAll(".save-button");
        for (const saveButton of saveButtons) {
            saveButton.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = saveButton.dataset.index;
                comments[index].isEdit = !comments[index].isEdit;
                comments[index].text = saveButton.closest('.comment').querySelector('textarea').value
                renderAPP(getListComments, comments);
            });

        }

    };
    initiateRedact();

    // Добавление кликабельностm лайка и счётчика лайков
    function delay(interval = 300) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, interval);
        });
    }
    const initlikeButtonsListeners = () => {
        const likeButtonsElements = document.querySelectorAll(".like-button");
        for (const likeButtonElement of likeButtonsElements) {
            likeButtonElement.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = likeButtonElement.dataset.index;
                comments[index].currentLike = !comments[index].currentLike;
                likeButtonElement.classList.add('-loading-like');
                delay(2000).then(() => {
                    if (comments[index].currentLike) {
                        ++comments[index].like;
                        comments[index].classLike = 'like-button -active-like';
                    } else {
                        --comments[index].like;
                        comments[index].classLike = 'like-button -no-active-like';
                    }
                    renderAPP(getListComments, comments);
                })
                    .then((data) => {
                        likeButtonElement.classList.remove('-loading-like');
                    });
            });
        }
    };
    initlikeButtonsListeners();

    //Функция ответов на коменты
    const redactComments = () => {
        const commentsElements = document.querySelectorAll(".comment");
        for (const commentElement of commentsElements) {
            commentElement.addEventListener("click", () => {
                const index = commentElement.dataset.index;
                console.log(comments[index].text);
                comentInputElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`;

            })
        }
    }
    redactComments();

    //Добавляем новый коммент на сервер
    function postData() {
        return fetchPOST(nameInputElement, comentInputElement, token)
            .then((response) => {
                return getArr();
            })
            .then(() => {
                addFormElement.classList.add("display-none");
                loadingElement.classList.remove("display-none");
                nameInputElement.value = "";
                comentInputElement.value = "";
            })
            .catch((error) => {
                if (error.message === "Сервер сломался") {
                    alert("Сервер сломался, попробуйте позже");
                    postData();
                } else if (error.message === "Плохой запрос") {
                    alert("Имя и комментарий должны быть не короче 3 символов");
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                    console.log(error);
                }
                addFormElement.classList.remove("display-none");
                loadingElement.classList.add("display-none");
            });
    };


    // Добавить обработчик клика для добавления элемента
    addButtonElement.addEventListener("click", () => {

        //Добавляем валидацию
        if ((nameInputElement.value === "") || (comentInputElement.value === "")) {
            return;
        }
        addFormElement.classList.add("display-none");
        loadingElement.classList.remove("display-none");
        postData();

        renderAPP(getListComments, comments);

    });


    // Добавление обработчика ввода для input
    addEventListener("input", () => {
        addButtonElement.classList.add("error");
        if ((nameInputElement.value !== "") && (comentInputElement.value !== "")) {
            addButtonElement.classList.remove("error");
        }
    });

    // Добавление элемента в список по нажатию Enter
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addButtonElement.click();
        }
    });

    // Удаление последнего комментари
    const endDeleteButtonElement = document.getElementById("end-delete-button");
    endDeleteButtonElement.addEventListener("click", () => {

        const lastElement = listElement.lastElementChild;
        lastElement.remove();
    });
}

export default renderAPP;