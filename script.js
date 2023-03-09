const addForm = document.querySelector('input');
const addComment = document.getElementById("add-button");
const removeComment = document.getElementById("remove-comment");
const listElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const mainForm = document.querySelector(".add-form");

const options = {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  timezone: 'UTC',
  hour: '2-digit',
  minute: '2-digit',

};


let now = new Date().toLocaleString("ru-RU",options).replace(",", "");



const delValue = () => {
  nameInputElement.value = "";
  commentInputElement.value = "";
};

addComment.addEventListener("click",  () => {

  if (nameInputElement.value === "" || commentInputElement.value === "") {
    nameInputElement.classList.add("error");
    commentInputElement.classList.add("error");
    nameInputElement.placeholder = 'Введите имя';
    commentInputElement.placeholder = 'Введите комментарий';
    nameInputElement.value = '';
    commentInputElement.value = '';
    buttonBlock()
    return;

  }else{
    
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML =
      oldListHtml +
      `<li class="comment" >
      <div class="comment-header">
        <div>${nameInputElement.value}</div>
        <div>${now}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${commentInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button" id ="like-input"></button>
        </div>
      </div>
    </li>`;

  }
  
  delValue();

});



// Функция удаления последнего комментария
  const  delComment = () => {
  const elem = document.getElementById("comments").lastChild;
  elem.parentNode.removeChild(elem);
}

removeComment.addEventListener("click",  () => {
 delComment()
})

// Блокировка кнопки ввода()
const buttonBlock = () =>{
document.querySelectorAll("#name-input,#comment-input").forEach((el)=>{
 		el.addEventListener("input",()=>{
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




