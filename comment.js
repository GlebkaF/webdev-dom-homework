import { postFetch } from "./api.js";
import { getFetch } from "./api.js";
import { fetchFunction } from "./main.js";
import { renderLoader } from "./secondaryforms.js";
import { commentReplyNew } from "./secondaryforms.js";
import { commentReply } from "./secondaryforms.js";
import { postFetchFirst } from "./api.js";
import { firstLaunchFetchFunction } from "./main.js";
import { userName } from "./api.js";
import { token } from "./api.js";
//import { getFetch } from "./api.js";
import { dataGet } from "./main.js";

//import { LikesFetch } from "./api.js";
//const button = document.querySelectorAll(`.like-button`);
//создание блоков комментариев по содержимому массива
export function renderComments(comments, commentText) {
  const list = document.getElementById("commentsListId");
  const likesHtml = comments
    .map((i, index) => {
      return `<li class="comment" data-index="${index}">
            <div class="comment-header">
              <div>${i.author.name}</div>
              <div>${i.date}</div>
              
            </div>
              <div class="comment-body">
              <div class="comment-text">
                ${i.text}
              </div>
            </div>
            <div class="comment-footer">

            <button 
            class="add-form-button del-button"
            data-index="${index}" 
            id="dell-form-buttonListId"
            >
            Удалить
            </button>

              <div class="likes">
                <span class="likes-counter">${i.likes}</span>
                <button class="like-button ${
                  i.isLiked ? `-active-like` : ""
                }"data-index="${index}"></button>
              </div>
            </div>
          </li>`;
    })
    .join(``);

  list.innerHTML = likesHtml;
  //keyPush();
  delCommentFetch(comments);
  LikesFetch(comments);
  commentReply(comments, commentText);
}
// простановка лайков

function LikesFetch(comments) {
  const button = document.querySelectorAll(`.like-button`);
  for (const likeButton of button) {
    likeButton.addEventListener(`click`, (event) => {
      event.stopPropagation();
      const comment = comments[likeButton.dataset.index];
      console.log(comment);
      let idCom = comment.id;
      console.log(idCom);

      return fetch(
        `https://wedev-api.sky.pro/api/v2/arseny-kulikov/comments/${idCom}/toggle-like`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .catch((error) => {
          throw new Error(`Интернет не работает`);
        })
        .then((response) => {
          console.log(response.status);
          if (response.status === 401)
            throw new Error(`Вы не зарегистрированы!`);
          else {
            return response.json();
          }
        })
        .then((responseData) => {
          comment.isLiked = responseData.result.isLiked;
          comment.likes = responseData.result.likes;
          console.log(comment.isLiked);
          console.log(responseData);
          renderComments(comments, commentText);
        })
        .catch((error) => {
          alert(`Внимание ошибка ${error}`);
        });
    });
  }
}

// добавление комментария после появления формы лоадера "загрузка..."
export function renderAddComment(comments, commentText) {
  // Пересоздание формы ввода комментария
  const list = document.getElementById("commentsListId");
  const listButton = document.getElementById(`add-form-buttonListId`);
  const commentForm = document.getElementById(`add-formListId`);
  let resultCommentForm = (commentForm.innerHTML = `<input
          id="commentNameNew"
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            readonly
          />
         
          <textarea
          id="commentTextNew"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row" id="add-form-rowListIdNew">
            <button class="add-form-button" id="add-form-buttonListIdNew">Написать</button>
          </div>`);

  const commentTextNew = document.getElementById(`commentTextNew`);

  const commentNameNew = document.getElementById(`commentNameNew`);
  commentNameNew.value = userName;
  const addFormButtonIdNew = document.getElementById(
    `add-form-buttonListIdNew`
  );
  // Подключение события клик к новой форме (пересозданной после создания лоадера) ввода комментария
  addFormButtonIdNew.addEventListener(`click`, () => {
    //const oldButton = listButton.innerHTML;
    commentNameNew.classList.remove("error");
    commentTextNew.classList.remove("error");
    const oldList = list.innerHTML;

    if (commentNameNew.value === "") {
      commentNameNew.classList.add("error");

      return;
    } else if (commentTextNew.value === "") {
      commentTextNew.classList.add("error");
      return;
    }
    // добавление комментария в массив
    // добавлять комментарий из хранилища данных
    let isLoading = true;
    addFormButtonIdNew.disabled = true;
    postFetch()
      .then((response) => {
        console.log(response.status);
        if (response.status === 400) {
          //Код который обработает ошибку
          addFormButtonIdNew.disabled = false;
          throw new Error(`Нужно ввести более 2 символов`);
        }
        //return Promise.reject(`сервер упал`)
        else if (response.status === 500) {
          fetchFunction();
          throw new Error(`Сервер не работает, попробуем еще раз?...`);
        } else if (isLoading === true) {
          renderLoader();
        }
        return response.json();
      })
      .then((responseData) => {
        return getFetch();
      })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        comments = responseData.comments;
        isLoading = false;
        console.log(comments);

        renderAddComment(comments, commentText);
        renderComments(comments, commentText);
        commentReplyNew(comments, commentText);
      })
      .catch((error) => {
        alert(` ${error}`);
        //addFormButtonIdNew.disabled = false;
      });
    renderComments(comments, commentText);
  });
  return resultCommentForm;
}
//функия добавление комментария в массив самый первый раз после обновления страницы по клику "написать"
export function addComment(comments, commentText) {
  const list = document.getElementById("commentsListId");
  const listButton = document.getElementById(`add-form-buttonListId`);
  //const commentForm = document.getElementById(`add-formListId`);

  listButton.addEventListener(`click`, () => {
    const oldButton = listButton.innerHTML;
    commentName.classList.remove("error");
    commentText.classList.remove("error");
    const oldList = list.innerHTML;
    if (commentName.value === "") {
      commentName.classList.add("error");
      return;
    } else if (commentText.value === "") {
      commentText.classList.add("error");
      return;
    }
    let isLoading = true;
    listButton.disabled = true;
    //Добавление комментариев в хранилище данных самый первый раз после загрузки страницы
    //Цепочка промисов начало
    postFetchFirst()
      .then((response) => {
        if (response.status === 400) {
          //Код который обработает ошибку
          listButton.disabled = false;
          throw new Error(`Нужно ввести более 2 символов`);
          //return Promise.reject(`сервер упал`)
        } else if (response.status === 500) {
          firstLaunchFetchFunction();
          throw new Error(`Сервер не работает, попробуем еще раз?...`);
        } else {
          if (isLoading === true) {
            renderLoader();
          }
          //isLoading = false
          return response.json();
        }
      })
      .then((responseData) => {
        return getFetch();
      })
      .then((response) => {
        console.log(comments);
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        comments = responseData.comments; //записываем в наш массив данные по API от сервера из объекта comments на сервере
        renderAddComment(comments, commentText); //запускаем функцию создания формы добавления комментария
        renderComments(comments, commentText); //запускаем функцию генерации списка комментариев на основе нашего массива comments
        commentReplyNew(comments, commentText); //вызов функции по навешиванию возможности отвечать на комментарии
        isLoading = false;
        console.log(isLoading);
      })
      .catch((error) => {
        alert(`${error}`);
        //listButton.disabled = false;
      });
  });
}

export function delCommentFetch(comments) {
  const deleteCommentButton = document.querySelectorAll(`.del-button`);
  for (const delButton of deleteCommentButton) {
    delButton.addEventListener(`click`, (event) => {
      event.stopPropagation();
      console.log(comments);
      const comment = comments[delButton.dataset.index];
      console.log(comment);
      let idCom = comment.id;
      console.log(idCom);

      return (
        fetch(
          `https://wedev-api.sky.pro/api/v2/arseny-kulikov/comments/${idCom}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        )
          //.catch((error) =>{throw new Error(`Интернет не работает`)})
          .then((response) => {
            console.log(response.status);
            if (response.status === 401)
              throw new Error(`Вы не зарегистрированы!`);
            else {
              return response.json();
            }
          })
          .then((responseData) => {
            // comment.isLiked=responseData.result.isLiked
            // comment.likes=responseData.result.likes
            // console.log(comment.isLiked)
            console.log(responseData);
            dataGet();
          })
          .catch((error) => {
            alert(`Внимание ошибка ${error}`);
          })
      );
    });
  }
}
delCommentFetch();
