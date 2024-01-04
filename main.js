// Это блок Присваивания имён элементам________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonEvent = document.getElementById("add-form-button");
const boxComments = document.getElementById('comments');

const replyBox = document.getElementById('reply-box');
const replyComment = document.getElementById('add-form-reply');

const replyBoxUser = document.getElementById('reply-user-box');

const addFormUserName = document.getElementById('add-form-name');
const addFormUserText = document.getElementById('add-form-text');

// |                                                                                                          |
// Это блок Присваивания имён элементам_______________________________________________________________________|


// Это блок для Вспомогательных функций________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

  //  (1) __ Функция Эстетичного создания и отображения времени           
const letTime = () => {

  let date = new Date();
  
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() - 2000;
  let hours = date.getHours();
  let minutes = date.getMinutes();
  
  let formattedDate = day + "." + month + "." + year + " " + hours + ":" + minutes;
  
  return formattedDate;
};

  // (2) __ Функция Исправления ошибки при получении отсутствующего текста

const errorTextChecking = (checkingText) => {

  if (checkingText === undefined) {
    return "";
  } else {
    return checkingText;
  };

};

  // (3) __ Функция Загруски страницы

const loadingStartFunctionButton = () => {

  buttonEvent.disabled = true;
  buttonEvent.textContent = "Загрузка данных, подождите"

}
const loadingСompleteFunctionButton = () => {

  buttonEvent.disabled = false;
  buttonEvent.textContent = "Написать"

}


// |                                                                                                          |
// Это блок для Вспомогательных функций_______________________________________________________________________|


// Это блок копируемого комментария____________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

const replyCommentCondition = (arrComments) => {
  
  if (replyBox.innerHTML == "" || replyBox.innerHTML == undefined) {

    let replyUserComment = "";

    return replyUserComment;

  } else {
  
    let replyUserComment = `<div id="reply-box" class="add-form-reply-comments">
    <div class="comment-header">
      <div>${arrComments.name}</div>
      <div>${arrComments.date}</div>
    </div>
      ${arrComments.commentText}
    </div>`;   

    return replyUserComment;

  };
  
};

const initDeleteReplyUserBox = (arrComments) => {

  let replyUserComment = "";
  
  replyBox.addEventListener("click", () => {

    event.stopPropagation()

    replyBox.innerHTML = "";

    return replyCommentCondition(arrComments);
  });

  return replyUserComment;

};

const initReplyClick = (arrComments) => {

  const useReplyClick = document.querySelectorAll(".-use-reply-comment");

  for (const replyClick of useReplyClick) {
  
    replyClick.addEventListener("click", () => {
    
      event.stopPropagation()


      const index = replyClick.dataset.index;

      replyBox.innerHTML = 
      `<div id="reply-user-box" class="add-form-reply-user">
        <div class="comment-header">
          <div>${arrComments[index].name}</div>
          <div>${arrComments[index].date}</div>
        </div>
        ${arrComments[index].commentText}
      </div>`;

      initDeleteReplyUserBox(arrComments);
      replyCommentCondition(arrComments[index]);
      const replyUserComment = replyCommentCondition(arrComments[index]);
      // console.log(replyUserComment);
      
      return replyUserComment;

    });


  };

};
// |                                                                                                          |
// Это блок Копируемого Комментария___________________________________________________________________________|



// Это блок Использования Лайка________________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const initCommentsLiked = (arrComments) => {

  const useCommentsLike = document.querySelectorAll(".like-button");
  for (const useCommentLike of useCommentsLike) {



    useCommentLike.addEventListener("click", () => {
      
      event.stopPropagation()
      
      const index = useCommentLike.dataset.index;

      if (arrComments[index].liked === false) {

        arrComments[index].numLike++;
        arrComments[index].liked = true;
        renderComments(arrComments);
        initCommentsLiked(arrComments);
        initReplyClick(arrComments);
        buttonEventClick()
        return;

      } else {

        arrComments[index].numLike--;
        arrComments[index].liked = false;
        renderComments(arrComments);
        initCommentsLiked(arrComments);
        initReplyClick(arrComments);
        buttonEventClick()
        return;

      };

    });
  };
};

const usedLike = (comm) => {

  if (comm === true) {
    return `-active-like`;
  };

};
// |                                                                                                          |
// Это блок использования Лайка_______________________________________________________________________________|

// Это блок Получения Визуалоного Блока комментариев в HTML____________________________________________________
// |                                                                                                          |
// V                                                                                                          V
const renderComments = (arrComments) => {

  const commentsHtml = arrComments.map((comment, index) => {

    return `<li data-index="${index}" id="comment" class="comment -use-reply-comment">

        <div data-index="${index}" id="comment-header" class="comment-header -use-reply-comment">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>

        <div data-index="${index}" id="reply-box-in-comm class="-use-reply-comment"">
          ${comment.replyText}
        </div>

        <div data-index="${index}" id="comment-body" class="comment-body -use-reply-comment">
          <div data-index="${index}" id="comment-text" class="comment-text">
            ${comment.commentText}
          </div>
        </div>

        <div data-index="${index}" id="comment-footer" class="comment-footer -use-reply-comment">
          <div id="likes" class="likes">
            <span id="likes-counter" class="likes-counter">${comment.numLike}</span>
            <button data-index="${index}" id="like-button" class="like-button ${usedLike(comment.liked)}"></button>
          </div>
        </div>

      </li>`;

  }).join("");

  boxComments.innerHTML = commentsHtml;


};

// |                                                                                                          |
// Это блок Получения Визуалоного Блока комментариев в HTML___________________________________________________|



// Это блок Получения Массива Комментариев и дальнейшее работа с ним___________________________________________
// |                                                                                                          |
// V                                                                                                          V
const functionGetArrComments = () => {



  const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/dmitriy-aleksahin/comments", {

    method: "GET",

  });

  fetchPromise.then((response) => {

    return response.json();

  }).then((responseData) => {


    const arrComments = responseData.comments.map((comment) => {

      return {
        name: comment.author.name,
        date: comment.date,
        commentText: comment.text,
        numLike: comment.likes,
        liked: comment.isLiked,
        replyText: errorTextChecking(comment.replyText),
      };

    });

    return arrComments;

  }).then((arrCommentsData) => {

    if (arrCommentsData.status === 500 ) {

      throw new Error('Ошибка сервера')
      
    };

    let replyUserComment = "";

    // после получения массива с данными коментариев нужно 
    // чтобы создалось физуальное представление коментариев на странице нашего сайта.
    // на этом моменте создались коментарии на нашей странице 
    // с возможностью! поставить "лайк" и "откоментировать" чужой коментарий в своём. 
    // теперь нам нужно

    renderComments(arrCommentsData)
    initCommentsLiked(arrCommentsData);
    initReplyClick(arrCommentsData);


    
  }).then(() => {
    
    loadingСompleteFunctionButton();

  }).catch((error) => {

    if (error.message === "Ошибка сервера") {

      alert("Сервер сломался, попробуй позже");
        
    } else {

      alert("Что-то пошло не так, попробуй позже");

    };

    console.log(error);
    loadingСompleteFunctionButton();


  });

};

// |                                                                                                          |
// Это блок Получения Массива Комментариев и дальнейшее работа с ним__________________________________________|


// Это блок Создания и отправки элементов для массива комментариев_____________________________________________
// |                                                                                                          |
// V                                                                                                          V
const buttonEventClick = (replyUserComment) => {

  buttonEvent.addEventListener("click", () => {
  
    event.stopPropagation()
    
    addFormUserName.classList.remove("error");
    addFormUserText.classList.remove("error");
    
    if (addFormUserName.value === "") {
      addFormUserName.classList.add("error");
      return;
    };
    
    if (addFormUserText.value === "") {
      addFormUserText.classList.add("error");
      return;
    };
    
    let timeForFetch = letTime();
    let userNameForFetch = addFormUserName.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    let userTextForFetch = addFormUserText.value.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    // let userReplyText = errorTextChecking(replyUserComment);
        // console.log(timeForFetch)
        // console.log(userNameForFetch)
        // console.log(userTextForFetch)
        // console.log(userReplyText)
    loadingStartFunctionButton();
    
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/dmitriy-aleksahin/comments", {
    
      method: "POST",
    
      body: JSON.stringify({
      
        name: userNameForFetch,
        date: timeForFetch,
        text: userTextForFetch,
        likes: 0,
        isLiked: false,
        // replyText: userReplyText,
        forceError: true,
      
      }),
    
    }).then((response) => {
      if(response.status === 400 ) {
        throw new Error('Неверный запрос')
      }
      if (response.status === 500 ) {
        throw new Error('Ошибка сервера')
      };
      replyUserComment = "";
      addFormUserName.value = "";
      addFormUserText.value = "";
      replyBox.innerHTML = "";
    
    }).then(() => {
    
      functionGetArrComments();
      loadingСompleteFunctionButton();
    
    }).catch((error) => {
    
      if (error.message === "Ошибка сервера") {
      
        alert("Сервер сломался, попробуй позже");
      
      } else if (error.message === "Неверный запрос") {
      
        alert("Имя и комментарий должны быть не короче 3х символов");
      
      } else {
      
        alert("Что-то пошло не так, попробуй позже");
      
      };
    
      console.log(error);
      loadingСompleteFunctionButton();
    });
  
  
  });
};
// |                                                                                                          |
// Это блок Создания и отправки элементов для массива комментариев____________________________________________|



// Это блок для Внешнего запуска кода__________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V
loadingStartFunctionButton(); 
functionGetArrComments();
buttonEventClick()

// |                                                                                                          |
// Это блок для Внешнего запуска кода_________________________________________________________________________|



// Это блок для копирования Или коментариев к работе___________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

// Копируемый текст теперь исправно высылается, я доволен!
// Недоволен, что сайт запрещает добавлять в него доп сведения.


// |                                                                                                          |
// Это блок для копирования Или коментариев к работе__________________________________________________________|
