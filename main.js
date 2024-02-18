import { getComments, postComment } from "./api.js";
import { getCurrentDate } from "./getDate.js";
import { renderLogin } from "./loginPage.js";
import { renderCom } from "./renderComments.js";




  


  // Запрет на действие по умолчанию для textArea - gthеход на новую строку. Иначе функция addComment будет выполняться, 
  // если заполнено поле с именеи и в поле комментария есть переход на новую строку

  const textArea = document.getElementById('form-text').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
    }
  })




  // Получаем все необходимые элементы

  const body = document.querySelector(".container");
  const commentList = document.getElementById('comment-list');
  const buttonAddComment = document.getElementById('add-form-button');
  const inputName = document.getElementById('form-name');
  const inputText = document.getElementById('form-text');
  const formaComment = document.getElementById('forma');
  const buttonDeleteComment = document.getElementById('delete-form-button');
  let isLoaded;
  const loaderPage = document.querySelector(".page-loader");
  const loaderAddComment = document.querySelector(".comment-loader");

  let comments = [

  ]

  const mapData = () => {
    return getComments().then((resultData) => {
      const resultComments = resultData.comments.map((comment) => {
        //console.log(comment.author.name);
        let currentDate = getCurrentDate(new Date(comment.date));
        return {
          author: comment.author.name,
          date: currentDate,
          text: comment.text,
          likeCount: comment.likes,
          myLike: comment.isLiked
        };
      });
      comments = resultComments;
      renderComments(); 
    })
    .then((resultData) => {
      //console.log('Загрузка страницы = ' + isLoadedPage);
      loaderPage.style.display = "none";
    })
    .catch((error) => {
      alert("Упс, сервер упал");
      loaderPage.style.display = "none";
    });
  }
  mapData();    

  // Функция ответа на комментарий

  function initAnswerComment2() {
    const commentTexts = document.querySelectorAll(".comment-text");

    commentTexts.forEach((commentText, index) => {
      commentText.addEventListener("click", () => {
        inputText.value = '> ' + comments[index].text + '\n' + comments[index].author + ', ';
      })
    })
  }

  // Функция разблокировки кнопки "Написать", если поле с именем не пустое

  inputName.addEventListener('input', () => {
    buttonAddComment.disabled = false;
  })

  // Функция разблокировки кнопки "Написать", если поле с текстом комментария не пустое

  inputText.addEventListener('input', () => {
    buttonAddComment.disabled = false;
  })

  // Функция добавления лайка

  const ititAddLikeListener = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeButton of likeButtons) {
      likeButton.addEventListener('click', () => {
        let index = likeButton.dataset.islike;
        
        if (comments[index].myLike) {
          comments[index].myLike = false;
          comments[index].likeCount--;
        } else {
          comments[index].myLike = true;
          comments[index].likeCount++;
        }
        
        renderComments();
      })
    }
  }

  // Функция изменения комментария - вызов по кнопке "Редактировать"

  const initEditCommentListener = () => {
    const editButtons = document.querySelectorAll(".comment-text-edit");

    for (const editButton of editButtons) {
      editButton.addEventListener('click', () => {
        let index = editButton.dataset.edit;

        comments[index].isEdit = true;
        renderComments();
      })
    }
  }

    // Функция сохранения изменений в комментарии - вызов по кнопке "Сохранить"

  const initSaveEditCommentListener = () => {
    const saveButtons = document.querySelectorAll(".comment-text-save");

    for (const saveButton of saveButtons) {
      saveButton.addEventListener('click', () => {
        let index = saveButton.dataset.edit;
        const inputText = document.getElementById('form-text');

        comments[index].text = inputText.value;
        comments[index].isEdit = false;

        renderComments();
      })
    }
  }


  // Функция рендера комментариев

  const renderComments = () => {

    const CommentsHtml = comments.map((comment, index) => {
        let isLike;
        let inputTextHtml;
        let textButtonEditSave;
        let classButtonEditSave;
        //isLoadedPage = true;
        comment.myLike ? isLike = "-active-like" : false
        
        comment.isEdit ? textButtonEditSave = "Сохранить" : textButtonEditSave = "Редактировать"
        comment.isEdit ? classButtonEditSave = "comment-text-save" : classButtonEditSave = "comment-text-edit"
        comment.isEdit ? inputTextHtml = `<textarea id="form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарй" rows="4">${comment.text}</textarea>` : inputTextHtml = `<div data-index="${index}" class="comment-text">${comment.text}</div>`;
    
        
          return `<li class="comment">
                  <div class="comment-header">
                    <div>${comment.author}</div>
                    <div>${comment.date}</div>
                  </div>
                  <div class="comment-body">
                    ${inputTextHtml}
                  </div>
                  <button data-edit="${index}" class="${classButtonEditSave}">${textButtonEditSave}</button>
                  <div class="comment-footer">
                    <div class="likes">
                      <span class="likes-counter">${comment.likeCount}</span>
                      <button class="like-button ${isLike}" id="like-button" data-islike="${index}"></button>
                    </div>
                  </div>
                </li>`;
        
        
                
      }).join("");
    
    commentList.innerHTML = renderCom(comments);
    ititAddLikeListener();
    initEditCommentListener();
    initSaveEditCommentListener();
    initAnswerComment2();
  };

  //renderComments();
  renderLogin();

  const postTask = () => {
    let currentDate = getCurrentDate(new Date());
        postComment( {
            text: inputText.value,
            date: currentDate,
            likes: 0,
            isLiked: false,
            forceError: true
        } ).then((resultCommentsData) => {
        return mapData();
        })
        .then((resultData) => {
          buttonAddComment.disabled = false;
          loaderAddComment.style.display = "none";
          inputName.value = '';
          inputText.value = '';
        })
        .catch((error) => {
          console.warn(error);
          loaderAddComment.style.display = "none";
          if (error.message === "Имя или комментраий короткие") {
            alert("Имя и комментарий должны быть не короче 3х символов");
            inputName.classList.add('error-form');
            inputText.classList.add('error-form');
          } else if (error.message === "Сервер не отвечает") {
            //alert ("Сервер сломался, попробуй позже");
            //buttonAddComment.disabled = false;
            postTask();
          } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
            buttonAddComment.disabled = false;
          }
        });
      }

  // Функция отправки комментария

  function addComment(event) {

    if (event.type === 'click' || (event.type === 'keyup' && event.key === 'Enter'))  {

      const oldCommentList = commentList.innerHTML;

    //   if (inputName.value === '' && inputText.value !== '') {
    //     inputName.classList.add('error-form');
    //     inputText.classList.remove('error-form');
    //     buttonAddComment.disabled = true;
    //     return;} 
        
    //   else if (inputText.value === '' && inputName.value !== '') {
    //     inputText.classList.add('error-form');
    //     inputName.classList.remove('error-form');
    //     buttonAddComment.disabled = true;
    //     return;} 
      
    //   else if (inputName.value === '' && inputText.value === '') {
    //     inputName.classList.add('error-form');
    //     inputText.classList.add('error-form');
    //     buttonAddComment.disabled = true;
    //     return;
    //   }

      loaderAddComment.style.display = "block";
      inputName.classList.remove('error-form');
      inputText.classList.remove('error-form');
      buttonAddComment.disabled = true;
      
      

      // comments.push({
      //   text: inputText.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      //   author: inputName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      //   date: currentDate,
      //   likeCount: 0,
      //   myLike: false,
      //   isEdit: false
      // });

      isLoaded = true;
      console.log(isLoaded);

      postTask();
      renderComments();
    }
  }

  // buttonDeleteComment.addEventListener('click', () => {
    
  //   let arrList = Array.from(commentList.children)
  //   //const lastComment = commentList.innerHTML.lastIndexOf();
  //   console.log(arrList);
  //   arrList = arrList.pop();

  //   console.log(arrList);
  //   console.log(commentList);

  //   commentList.innerHTML = String.from(arrList);
  //   //commentList.innerHTML = arrList;
    
  //   //commentList.innerHTML = commentList - lastComment;
  // });


  buttonAddComment.addEventListener('click', addComment);
  formaComment.addEventListener('keyup', addComment);