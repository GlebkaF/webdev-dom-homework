
const addForm = document.querySelector('input');
const addComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");
const studentElements = document.querySelectorAll(".comment");
const likeButton = document.querySelectorAll(".like-button");


const options = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  timezone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',

};


let nowDate = new Date().toLocaleString("ru-RU", options).replace(",", "");



const comments = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    likesCount: 75,
    isLiked: false,
    isEdit: false,
   
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: " Мне нравится как оформлена эта страница! ❤",
    likesCount: 12,
    isLiked: true,
    isEdit: false,
   
   
  },

];



// Функция удаления последнего комментария
const delComment = () => {
  const elem = document.getElementById("comments").lastChild;
  elem.parentNode.removeChild(elem);

}

// Отчистка данных с поля

const delValue = () => {
  nameInputElement.value = "";
  commentInputElement.value = "";
};




// Добавление лайка

const addLike =() => {
  const likeButtons = listElement.querySelectorAll('.like-button');
  for(let likeButton of likeButtons){

    likeButton.addEventListener('click', ( event) => {
      event.stopPropagation()
          const index = likeButton.dataset.index;

          if (comments[index].isLiked === false) {
            comments[index].isLiked = true;
            comments[index].likesCount +=1;

          } else if (comments[index].isLiked === true){
            comments[index].isLiked = false;
            comments[index].likesCount -=1;
          }

          renderComments();

      })
  }
}

const commentsList = document.querySelector('ul.comments'); 



// Редактирование  
const editText = (event ) => {
  
  const editButtons = listElement.querySelectorAll('.edit_comment');
  for(let editButton of  editButtons){

    editButton.addEventListener('click', (event) => {
      event.stopPropagation()
          const index = editButton.dataset.index;

            if (comments[index].isEdit === false) {
                comments[index].isEdit = true;    
          } else {

          let currentTextarea = document.querySelectorAll('.comment') [index].querySelector('textarea');

            comments[index].isEdit = false;
            comments[index].comment = safeInputText(currentTextarea.value);
          }
          renderComments();
      })
  } 
}



// Добавление комментария

const reComment = () => {
  
 const allComments = document.querySelectorAll('.comment')
 for(let comment of allComments){
  comment.addEventListener('click', (event)=>{
    event.stopPropagation()
    const nameUser = comment.dataset.name;
    const userComments = comment.dataset.comment;
    commentInputElement.value =` >${userComments} \n${nameUser} <`
    
  })
 
 }
}

// Функция обезопасить ввод данных
function safeInputText(str) {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;")

}

// Рендер разметки

const renderComments = () => {
  const userHtml = comments.map((user, index) => {
    return `<li class="comment"  data-name="${user.name}" data-comment="${user.comment}">
    <div class="comment-header">
      <div>${user.name}</div>
      <div>${user.date}</div>
    </div>
    <div class="comment-body" >
    ${user.isEdit ? `<textarea class ="aria-text"  onclick="event.stopPropagation()">${user.comment}</textarea>` :`<div class ="comment-text"> ${user.comment} </div>`}
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likesCount}</span>
        <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
        <button data-index="${index}" class= "edit_comment">Редактировать</button>
       
      </div>
    </div>
  </li>`
  }).join('')

  listElement.innerHTML = userHtml;
  
  delValue() // Отчиска формы
  addLike()  // лайки
  editText() //Изменеие текста
  reComment() // Комментирование поста


 
}



renderComments();


// Добавление комментария
addComment.addEventListener("click", () => {

  if (nameInputElement.value === "" || commentInputElement.value === "") {
    nameInputElement.classList.add("error");
    commentInputElement.classList.add("error");
    nameInputElement.placeholder = 'Введите имя';
    commentInputElement.placeholder = 'Введите комментарий';
    buttonBlock()
    return;

  } else {
    comments.push({
      name:safeInputText(nameInputElement.value),
      date: nowDate,
      comment: safeInputText(commentInputElement.value),
      likesCount: 0,
      isLiked: false,
      isEdit: false,
    })

    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    const oldListHtml = listElement.innerHTML;


  }
  renderComments();

});




removeComment.addEventListener("click", () => {
  delComment()
})

// Блокировка кнопки ввода()
const buttonBlock = () => {
  document.querySelectorAll("#name-input,#comment-input").forEach((el) => {
    el.addEventListener("input", () => {
      if (document.getElementById("name-input").value === '' || document.getElementById("comment-input").value === '')
        document.getElementById("add-button").disabled = true;
      else
        document.getElementById("add-button").disabled = false;
    });
  });
}


// Ввод по нажатию клавиши Enter
mainForm.addEventListener('keyup', (e) => {
  if (e.code === "Enter") {
    addComment.click();
    delValue();
  }
});








