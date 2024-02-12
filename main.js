

  //переменные для работы
  const waitElement = document.getElementById("form-wait");
  const waitFormElement = document.getElementById("add-form-wait");
  const waitDeleteElement = document.getElementById("delete-form");
  const buttonElement = document.getElementById("add-form-button");
  const listElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const containerElement = document.querySelector(".container");
  const loadingElement = document.querySelector(".loading");
  const likesCounterElement = document.querySelector(".likes-counter");
  const likeButtonElement = document.querySelector(".like-button");
  const DeleteButtonElement = document.getElementById("delete-button");

  let originalComment = document.getElementById("comment-original");


  // классы для части разметки HTML, которая не рендерится из js
  waitElement.classList.add("edit-none");
  loadingElement.classList.add("loading-none");
  waitDeleteElement.classList.add("edit-none");


  //создание массива
  let comments = [/*
    {
      name: "Глеб Фокин",
      date: "12.02.22 12:18",
      text: "Это будет первый комментарий на этой странице",
      likesCounter: 3,
      itLikes: false,
      original: '',
      answer: '',
    },
    {
      name: "Варвара Н.",
      date: "13.02.22 19:22",
      text: "Мне нравится как оформлена эта страница! ❤",
      likesCounter: 75,
      itLikes: false,
      original: '',
      answer: '',
    },*/
  ]

  //запрос на получение данных с сервера
  const fetchPromise = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
      method: "GET"
    }).then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер упал.");
      } else if (response.status !== 200) {
        throw new Error("Отсутствует интернет");
      } else {
        return response.json();
      };
    }).then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        let myDate = new Date(comment.date);
        return {
          name: comment.author.name,
          date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
            ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
          text: comment.text,
          likesCounter: comment.likes,
          itLikes: comment.isLiked,
          original: '',
          answer: '',
          isLikeLoading: false,
        };
      });
      comments = appComments;
      console.log(appComments);
      renderComments();
    }).catch((error) => {
      if (error.message === "Сервер упал.") {
        alert("Сервер упал. Попробуйте позже...");
        //fetchPromise();
      } else {
        alert("Что-то пошло не так, попробуйте позже...");
      };
      console.warn(error);
    });
  };


  //автопрокрутка обработки ошибки
  /*function handleGetClick() {
    //...
    fetchPromise()
      .catch((error) => {
        if (error.message === "Сервер упал.") {
          handleGetClick();
        }
      });
    //...
  };*/
  //addButton.addEventListener("click", handlePostClick);


  //Получение данных с сервера + время ожидания загрузки
  const waitFetchPromise = () => {
    containerElement.classList.add("edit-none");
    loadingElement.classList.remove("loading-none");
    return fetchPromise().then((data) => {
      containerElement.classList.remove("edit-none");
      loadingElement.classList.add("loading-none");
    });
  }

  //имимтация загрузки данных
  function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

  //вариант имимтации загрузки данных
  /*delay(2000).then(() => {
    comment.likes = comment.isLiked
      ? comment.likes - 1
      : comment.likes + 1;
    comment.isLiked = !comment.isLiked;
    comment.isLikeLoading = false;
    renderComments();
  });*/



  //добавление обработчика динамическим элементам (кнопка лайков, с имитацией загрузки)
  const InitEventListeners = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonElements) {
      likeButtonElement.addEventListener('click', () => {
        const index = likeButtonElement.dataset.index;
        comments[index].isLikeLoading = true;
        renderComments();
        delay(2000).then(() => {
          if (comments[index]['itLikes'] === false) {
            comments[index].likesCounter++;
            comments[index]['itLikes'] = true;
          } else {
            comments[index]['likesCounter'] -= 1;
            comments[index]['itLikes'] = false;
          }
          //comments[index]['itLikes'] = !comments[index]['itLikes'] - можно заменить одной этой строкой строки 92+95 (сокращение кода)
          comments[index].isLikeLoading = false;
          renderComments();
        });
      });
    };
  }


  //ответ на комментарий по клику на комментарий
  const InitCommentListeners = () => {
    const EveryComments = document.querySelectorAll(".comment-text");
    for (const EveryComment of EveryComments) {
      EveryComment.addEventListener('click', () => {
        const index = EveryComment.dataset.index;
        originalComment = `${comments[index]['name']} \n ${comments[index]['text']} \n`;
        commentInputElement.value = originalComment + comments[index]['answer'];
        renderComments();
      })
    }
  }


  //редактирование комментария
  const InitEditComments = () => {
    const EditComments = document.querySelectorAll(".edit-button");
    for (const EditComment of EditComments) {
      EditComment.addEventListener('click', () => {
        const index = EditComment.dataset.index;
        comments[index].isEdit = true;
        renderComments();
      });
    };
  }

  // вариант для редактирования комментария:
  /* <div class="comment-footer">
            <div class="redact">
               ${comment.isEdit ?
                   '<textarea type="textarea" class="add-form-text" rows="4">${comment.text}</textarea>
                    <button class="redact-button" data-index="${index}">Сохранить</button>' :
                   '<button class="redact-button" data-index="${index}">Редактировать</button>"'
            </div>    
         </div>*/




  //добавление редактированного комментария
  const InitEditKommitted = () => {
    const EditKommitteds = document.querySelectorAll(".edit-committed");
    for (const EditKommitted of EditKommitteds) {
      EditKommitted.addEventListener('click', () => {
        const index = EditKommitted.dataset.index;
        comments[index].text = EditKommitted.closest('.comment').querySelector('textarea').value;
        comments[index].isEdit = false;
        renderComments();//обновленный комментарий рендерится в локальное хранилище(массив)

        //PATH не прописан в API - нет возможности проверки работы данного кода:
        /*const id = EditKommitted.dataset.id;
        fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments' + id, {
          method: "PATCH",
          body: JSON.stringify({
            text: EditKommitted.closest('.comment').querySelector('textarea').value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
          }),
        }).then((response) => {
          return response.json();
        }).then((responseData) => {
          сomments = responseData.comments;
          renderComments();
        });*/
      });
    };
  };



  //рендерфункция
  const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class=" ${(comments[index]['original'] != '') ? "comment-original" : ""}">
            ${comment.original}
          </div>
          <div class="${comment.isEdit ? "edit-none" : "comment-text"}" data-index = "${index}">
            ${comment.text}
          </div>
        <div>
          <textarea type="textarea" id="edit-input" class="${comment.isEdit ? "add-form-text" : "edit-none"}" rows="4" >${comment.text}</textarea>
        </div>
          <button class="${!comment.isEdit ? "edit-button" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Редактировать</button>
          <button class="${comment.isEdit ? "edit-committed" : "edit-none"}" data-index = "${index}" data-id = "${comment.id}" >Сохранить</button>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="${comments[index].isLikeLoading ? "loading-none" : "likes-counter"}" >${comment.likesCounter}</span>
            <button class="${comments[index].isLikeLoading ? "like-button -loading-like" : `${comment.itLikes ? "like-button -active-like" : "like-button"}`}" data-index = "${index}"></button> 
          </div>
        </div>
      </li>`;
    }).join('');
    listElement.innerHTML = commentsHtml;
    InitEventListeners();
    InitCommentListeners();
    InitEditComments();
    InitEditKommitted();
  };


  waitFetchPromise();
  renderComments();
  InitDeleteComment();


  //ввод данных в поля ввода (проверки)
  /* nameInputElement.addEventListener('click', () => {
     nameInputElement.classList.remove("error");
     if (nameInputElement.value === '') {
       buttonElement.disabled = true;
       buttonElement.classList.add("click-none");
       return;
     }
     buttonElement.disabled = false;
     buttonElement.classList.remove("click-none");
   })
 
   commentInputElement.addEventListener('click', () => {
     commentInputElement.classList.remove("error");
     if (commentInputElement.value === '') {
       buttonElement.disabled = true;
       buttonElement.classList.add("click-none");
       return;
     }
     buttonElement.disabled = false;
     buttonElement.classList.remove("click-none");
   })*/




  //функция добавления комментария (по клику)
  function buttonClick() {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    buttonElement.classList.remove("click-none");
    //buttonElement.disabled = false;
    if (nameInputElement.value === '') {
      nameInputElement.classList.add("error");
      buttonElement.classList.add("click-none");
      //buttonElement.disabled = true;
      return;
    } else if (commentInputElement.value === '') {
      commentInputElement.classList.add("error");
      buttonElement.classList.add("click-none");
      //buttonElement.disabled = true;
      return;
    };
    let myDate = new Date();
    /*comments.push({
      name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
        ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
      text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      likesCounter: 0,
      itLikes: false,
      original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
      answer: '',
    });*/
    DeleteButtonElement.disabled = true;
    DeleteButtonElement.classList.add("click-none");
    waitFormElement.classList.add("edit-none");
    waitElement.classList.remove("edit-none");
    // buttonElement.textContent = "Ваш омментарий добавляется...";
    //buttonElement.classList.add("click-none");
    const clickFetchPromise = fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: myDate.getDate() + ":" + (myDate.getMonth() + 1) +
          ":" + myDate.getFullYear() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds(),
        text: commentInputElement.value.replace(originalComment, '').replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likesCounter: 0,
        itLikes: false,
        original: `${commentInputElement.value.includes(originalComment) ? originalComment : ''}`,
        answer: '',
        isLikeLoading: false,
        forceError: true,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Введенные имя или комментарий короче 3-х знаков");
      } else if (response.status === 500) {
        throw new Error("Сервер упал.");
      } else if (response.status !== 201) {
        throw new Error("Отсутствует интернет");
      } else {
        return response.json();
      };
    }).then(() => {
      return fetchPromise();
    }).then((data) => {
      DeleteButtonElement.disabled = false;
      DeleteButtonElement.classList.remove("click-none");
      waitFormElement.classList.remove("edit-none");
      waitElement.classList.add("edit-none");
      nameInputElement.value = '';
      commentInputElement.value = '';
      //buttonElement.textContent = "Написать";
      //buttonElement.classList.remove("click-none");
    }).catch((error) => {
      if (error.message === "Введенные имя или комментарий короче 3-х знаков") {
        alert("Ваше имя или Ваш комментарий короче 3-х знаков. Попробуйте еще раз!");
      } else if (error.message === "Сервер упал.") {
        buttonClick();
        //alert("Сервер упал. Попробуйте позже...");
      } else {
        alert("Что-то пошло не так, попробуйте позже...");
      };
      console.warn(error);
      DeleteButtonElement.disabled = false;
      DeleteButtonElement.classList.remove("click-none");
      waitFormElement.classList.remove("edit-none");
      waitElement.classList.add("edit-none");
    });
    renderComments();

  };




  //добавлениe комментария по клику на кнопку "написать"
  buttonElement.addEventListener('click', buttonClick);




  //добавление комментария по клику на кнопку "Enter"
  document.body.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
      buttonClick();
    }
  });


  //удаление  последнего комментария (комментарий удаляется в локальном хранилище(массиве) + имитация удаления с сервера)
  function InitDeleteComment() {

    DeleteButtonElement.addEventListener('click', () => {
      const index = comments.length - 1;
      comments.splice(index, 1);
      DeleteButtonElement.classList.add("edit-none");
      waitDeleteElement.classList.remove("edit-none");
      buttonElement.disabled = true;
      buttonElement.classList.add("click-none");
      delay(2000).then(() => {
        renderComments();
        DeleteButtonElement.classList.remove("edit-none");
        waitDeleteElement.classList.add("edit-none");
        buttonElement.disabled = false;
        buttonElement.classList.remove("click-none");
      });
    });
  };


  console.log("It works!");