const buttonElement = document.getElementById("add-button");
const commentsElement = document.getElementById("comments");
const commentElement = document.getElementById("comment");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");

function getDate(){
  const dateNow = new Date();
  const dateNumber = String(dateNow.getDate()).padStart(2, '0');
  const dateMonth = String(dateNow.getMonth() + 1).padStart(2, '0');
  const dateYear =dateNow.getFullYear()
  const dateHours = dateNow.getHours()
  const dateMinutes = dateNow.getMinutes()

  return dateNumber + "." + dateMonth +"."+ dateYear + " "+ dateHours +":"+dateMinutes;
}

const addNewElToList = () =>{

  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");


  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  }

  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  }

  comments.push({
    name: nameInputElement.value
    .replaceAll("<", "&lt;")
    .replaceAll("<", "&lt;"),
    comment: textInputElement.value
    .replaceAll("<", "&lt;")
    .replaceAll("<", "&lt;"),
    date: getDate(),
    likes: 0,
    isLiked: false
  })

  renderComments();

  nameInputElement.value = "";
  textInputElement.value = "";
  nameInputElement.blur();
  textInputElement.blur();

}

function removeLastElement() {
  comments.pop();
  renderComments(); 
  }
buttonElement.addEventListener("click", addNewElToList);

const comments = [
  {
    name: 'Глеб Фокин',
    comment: 'Это будет первый комментарий на этой странице',
    date: '12.02.22 12:18',
    likes: 3,
    isLiked: ''
  },
  {
    name: 'Варвара Н.',
    comment: 'Мне нравится как оформлена эта страница! ❤',
    date: '13.02.22 19:22',
    likes: 75,
    isLiked: '-active-like'
  }
]

const renderComments = () =>{
  const commentsHTML = comments
 .map((comment, index) => {
   return `<li id= "comment" class="comment" data-index="${index}">
       <div class="comment-header">
         <div class= "comment-name" data-name="${comment.name}">${comment.name}</div>
         <div>${comment.date}</div>
        </div>    
        <div class="comment-body">
          <div class="comment-text" data-text="${comment.comment}">
            ${comment.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes" data-index="${index}">
            <span class="likes-counter" data-index="${index}">${comment.likes}</span>
            <button class= "like-button ${comment.isLiked}" data-index="${index}"></button>
          </div>
        </div>
     </li>`;

  }).join("");


  const commentsEl = document.getElementById("comments");

 commentsEl.innerHTML = commentsHTML;


  const usersLikes = document.querySelectorAll('.likes');
  const numberLikesEl = document.querySelectorAll('.likes-counter');
  const likesPainter = document.querySelectorAll('.like-button')

  for (let userLike of usersLikes ) {
    userLike.addEventListener('click',(event) => {
      event.stopPropagation();
      const indexUserLike = userLike.dataset.index;

      if (comments[indexUserLike].isLiked === '') {
        comments[indexUserLike].likes += 1;
        comments[indexUserLike].isLiked = '-active-like';
      } else{
        comments[indexUserLike].likes -= 1;
        comments[indexUserLike].isLiked = '';
      }
     renderComments();

    })
  }

  const responseUsersComments = document.querySelectorAll('.comment');
  for(const responseUserComment of responseUsersComments ){
    responseUserComment.addEventListener('click',() => {
      const userName = comments[responseUserComment.dataset.index].name;
      const userText = comments[responseUserComment.dataset.index].comment;
      textInputElement.value = '>'+ "  " + `${userText}` + '\n' +'('+ `${userName}`+')' + '\n'; 
    })
  }

}

renderComments();