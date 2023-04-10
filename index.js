import { getComments, addComment,
  // deleteComment 
  } from "./api.js";
import { myDate, secureInput } from "./optionalFunction.js";
import { renderLoginComponent } from "./components/login-component.js"

export const listElement = document.querySelector('.comments');
export const loaderCommentsElement = document.getElementById('loaderComments');

export let comments = [];

//функция GET

let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

export const getFetchPromise = () => {
  const loaderCommentsElement = document.getElementById('loaderComments');
  loaderCommentsElement.classList.remove('-display-none');
  return getComments({ token })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLike: false,
          token,
        };
      })
      comments = appComments;


      loaderCommentsElement.classList.add('-display-none');
      renderComments(listElement);
    }).catch((error) => {
      alert('Сервер не работает, повторите попытку позже');
      console.warn(error);
    });
};

export const renderComments = () => {
  const commentHtml = comments.map((comment, index) => {
    return `<li class="comment" data-name='${comment.name}' data-comment='${comment.text}'>
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${myDate(new Date(comment.date))}</div>
  </div>
  <div class="comment-body">

    ${comment.isEdit ? `<textarea class= "edit-area-text" onclick = "event.stopPropagation()">${comment.text}</textarea>` : `<div class="comment-text" data-index='${index}' data-name='${comment.name}' data-comment='${comment.text}'>${comment.text.replaceAll('*_', '<div class="quote">').replaceAll('__*', '</div>')}</div>`}
  
  </div>
  <div class="comment-footer">
   <div class="likes">
    <span class="likes-counter">${comment.likes}</span>

    <button class="${comment.isLike ? "like-button -active-like" : "like-button"}" data-index='${index}'></button>

    ${comment.isEdit ? `<button class="save-button button-comment" data-index='${index}'>Сохранить</button>` : `<button class="edit-button button-comment" data-index='${index}'>Редактировать</button>`}
    
   <button class = "delete-button button-comment" data-id='${comment.id}'>Удалить комментарий</button>
   </div>
  </div>
</li>`
  }).join('');

  const appEl = document.getElementById('app');

  const appHtml = `
  <section id="loaderComments" class="loader -display-none">
    <h4 id="loaderText" class="text-loader">Комментарии загружаются...</h4>
  </section>
<div class="container">
  <ul class="comments">
  <!-- список рендерится из js !!!!!!!-->
  ${commentHtml}
  </ul>
  <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      value=""
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш комментарий"
      rows="4"
      value = ""
    ></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
      <button class="add-form-button add-form-button--remove">Удалить последний комментарий</button>
    </div>
  </div>
</div>`;

  if (!token) {
    renderLoginComponent({
      appEl,
      commentHtml,
      setToken: (newToken) => {
        token = newToken;
      },
      getFetchPromise,
    });
    return;
  }

  appEl.innerHTML = appHtml;

  const buttonElement = document.querySelector('button.add-form-button');
  const listElement = document.querySelector('.comments');
  const inputNameElement = document.querySelector('.add-form-name');
  const textareaElement = document.querySelector('.add-form-text'); //export const loaderCommentsElement = document.getElementById('loaderComments');
  const addFormElement = document.querySelector('.add-form');


  buttonElement.addEventListener('click', () => {
    inputNameElement.classList.remove('error');
    textareaElement.classList.remove('error')
    if (!inputNameElement.value || !textareaElement.value) {
      inputNameElement.classList.add('error');
      textareaElement.classList.add('error');
      return;
    };

    buttonElement.disabled = true;
    buttonElement.textContent = "Добавляется..."
    addFormElement.classList.add('-display-block');

    addComment({
      name: secureInput(inputNameElement.value),
      date:
        //new Date(),
        myDate(new Date()),
      text: secureInput(textareaElement.value),
      forceError: false,
      token,
    }).then(() => {
      return getFetchPromise();
    })
      .then((response) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать"
        inputNameElement.value = '';
        textareaElement.value = '';
        return response
      }).catch((error) => {
        addFormElement.classList.remove('-display-block')
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        if (!navigator.onLine) {
          alert('Кажется, у вас сломался интернет, попробуйте позже')
          // throw new Error("Сломался интернет")
        }
        console.warn(error);
      });
    renderComments(listElement);
    buttonElement.disabled = true;
    addFormElement.classList.remove('-display-block')
  });

  const initChangeLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');

    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const index = likeButtonElement.dataset.index;

        if (comments[index].isLike === false) {
          comments[index].likes += 1;
          comments[index].isLike = true;


        } else {
          comments[index].likes -= 1;
          comments[index].isLike = false;
        }

        renderComments(listElement);
      })
    }
  };

  const initEditButtonListeners = () => {
    const editButtons = document.querySelectorAll(".edit-button");
    for (const editButton of editButtons) {
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = editButton.dataset.index;

        if (comments[index].isEdit === false) {
          comments[index].isEdit = true;

        } else {
          comments[index].isEdit = false;
          const textareaEditElements = document.querySelectorAll(".edit-area-text");
          for (const textareaEditElement of textareaEditElements) {
            comments[index].text = textareaEditElement.value;
          }
        }
        renderComments(listElement);
      })
    };
    const saveButtons = document.querySelectorAll(".save-button");
    for (const saveButton of saveButtons) {
      saveButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = saveButton.dataset.index;
        if (comments[index].isEdit === false) {
          comments[index].isEdit = true;
        } else {
          comments[index].isEdit = false;
          const textareaEditElements = document.querySelectorAll(".edit-area-text");
          for (const textareaEditElement of textareaEditElements) {
            comments[index].text = textareaEditElement.value;
          }
        }
        renderComments(listElement)

      });
    }
  };

  const answerQuoteToComment = () => {
    const commentListItems = document.querySelectorAll('.comment');
    for (const commentListItem of commentListItems) {
      commentListItem.addEventListener('click', () => {
        const userName = commentListItem.dataset.name;
        const userComment = commentListItem.dataset.comment;
        textareaElement.value = `*_${userName}: \n${userComment}__*`;
      })
    }
  }

  const deleteComment = () => {
    const deleteButtonElements = document.querySelectorAll('.delete-button');
    for (const deleteButtonElement of deleteButtonElements) {
      deleteButtonElement.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = deleteButtonElement.dataset.index;
        comments.splice(index, 1);
        renderComments(listElement);
      });
    }
  };

  //Удаление комментария из API(не получается)

  // const deleteButtonElements = document.querySelectorAll('.delete-button');
  // for (const deleteButtonElement of deleteButtonElements) {
  //   deleteButtonElement.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     const id = deleteButtonElement.dataset.id;

  //     deleteComment({ token, id })
  //     .then((responseData) => {
  //       comments = responseData.comments;
  //       //renderComments(listElement);
  //       //getComments();
  //       renderComments(listElement);
  //     });
  //   });
  // }

  const deleteLastComment = () => {
    const deleteLastButtonElement = document.querySelector('.add-form-button--remove');

    deleteLastButtonElement.addEventListener('click', () => {
      comments.pop();
      renderComments(listElement);
    });
  };

  const validateButton = () => {
    if (!inputNameElement.value || !textareaElement.value) {
      buttonElement.disabled = true;
    } else buttonElement.disabled = false;
  }

  const initDisabledButtonElement = () => {
    validateButton();
    document.querySelectorAll(".add-form-text,.add-form-name").forEach((input) => {
      input.addEventListener("input", () => {
        validateButton();
      });
    });
  };

  const pushEnter = () => {
    addFormElement.addEventListener('keyup', (ent) => {
      if (ent.code === "Enter") {
        buttonElement.click();
        inputNameElement.value = '';
        textareaElement.value = '';
      }
    });
  }
  pushEnter();
  initChangeLikeButtonListeners();
  initEditButtonListeners();
  initDisabledButtonElement();
  answerQuoteToComment();
  deleteComment();
  deleteLastComment();
}

renderComments(listElement)
getFetchPromise();






