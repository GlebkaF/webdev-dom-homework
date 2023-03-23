
const addForm = document.querySelector('input');
const addComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");
const studentElements = document.querySelectorAll(".comment");
const likeButton = document.querySelectorAll(".like-button");

// функция для даты
function getDate(date) {
  const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
  }
  const newDate = new Date(date);
  return newDate.toLocaleString('ru-RU', options).replace(',', '');
}


let comments = [{
    date: getDate(new Date),
    likes: '0',
    text: "",
    author: { name: '' },
    isLiked: false,
    isEdit: false,
   
}
];
renderComments();




const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments", {
  method: "GET"
});

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {
    comments = responseData.comments;
   renderComments()
  });
});




// Функция удаления последнего комментария
function delComment() {
 
  comments.pop()
    renderComments();

}

// Отчистка данных с поля

function delValue() {
  nameInputElement.value = "";
  commentInputElement.value = "";
};




// Добавление лайка

function addLike () {
  const likeButtons = listElement.querySelectorAll('.like-button');
  for(let likeButton of likeButtons){

    likeButton.addEventListener('click', ( event) => {
      event.stopPropagation()
          const index = likeButton.dataset.index;

          if (comments[index].isLiked === false) {
            comments[index].isLiked = true;
            comments[index].likes +=1;

          } else if (comments[index].isLiked === true){
            comments[index].isLiked = false;
            comments[index].likes -=1;
          }

          renderComments();

      })
  }
}





// // Редактирование  
// function editText (event ) {
  
//   const editButtons = listElement.querySelectorAll('.edit_comment');
//   for(let editButton of  editButtons){

//     editButton.addEventListener('click', (event) => {
//       event.stopPropagation()
//           const index = editButton.dataset.index;

//             if (comments[index].isEdit === false) {
//                 comments[index].isEdit = true;    
//           } else {

//           let currentTextarea = document.querySelectorAll('.comment') [index].querySelector('textarea');

//             comments[index].isEdit = false;
//             comments[index].comment = safeInputText(currentTextarea.value);
//           }
//           renderComments();
//       })
//   } 
// }



// Добавление комментария  к инпуту

function reComment () {
  
 const allComments = document.querySelectorAll('.comment')
 for(let comment of allComments){
  comment.addEventListener('click', (event)=>{
    event.stopPropagation()
    const nameUser = comment.dataset.name;
    const userComments = comment.dataset.comment;
    commentInputElement.value =` >${userComments} \n${nameUser} <\n`
    
  })
 
 }
}

// Функция обезопасить ввод данных
function safeInputText(str) {
    return str.replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}



// Рендер разметки

function renderComments() {
  
  const userHtml = comments.map((user, index) => {
    return `<li class="comment"  data-name="${user.author.name}" data-comment="${user.text}">
    <div class="comment-header">
      <div>${user.author.name}</div>
      <div>${getDate(user.date)}</div>
    </div>
    <div class="comment-body" >
   <div class ="comment-text"> ${user.text} </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${user.likes}</span>
        <button data-index="${index}"  class="${user.isLiked ? 'like-button -active-like' : 'like-button'}"></button>
    
      </div>
    </div>
  </li>`
  }).join('')

  listElement.innerHTML = userHtml;
  addLike()  // лайки
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
  } else{
    renderComments();
    fetch('https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments', {
            method: "POST",

            body: JSON.stringify({
                date: new Date,
                likes: 0,
                isLiked: false,
                text: safeInputText(commentInputElement.value),
                name: safeInputText(nameInputElement.value),
            })

        }).then((response) => {
          const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/Kerimov-Evgeny/comments", {
            method: "GET"
          });
          
          fetchPromise.then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((responseData) => {
              comments = responseData.comments;
             renderComments()
            });
          });

            response.json().then((responseData) => {
                renderComments();
            })
        });
  
      }
 
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    const oldListHtml = listElement.innerHTML;


  
  renderComments();
  delValue() 

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








