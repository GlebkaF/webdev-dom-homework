let comments = [];
const buttonElement = document.querySelector(".add-form-button");
const form = document.querySelector(".add-form");
const formName = document.querySelector(".add-form-name");
const formText = document.querySelector(".add-form-text");
const commentElement = document.querySelector(".comments");
const load = document.querySelector(".load");
const newLoad = commentElement.innerHTML;

const fetchComments = () => {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
   method: "GET"
 })
 .then((response) => {
      return response.json();
 })
 .then((responseData) => {
       comments = responseData.comments.map((comment) => {
         return {
           name: comment.author.name,
           data: new Date(comment.date).toLocaleString(),
           text: comment.text,
           countLike: comment.likes,
           likeComment: false,
           isLoading: true,
         }
       });
       load.innerHTML = newLoad;
     })
   .catch((err) => {
     alert("Кажется, у вас сломался интернет, попробуйте позже");
     console.warn(err);
   });
 };

 const newComment = () => {
 return fetch("https://webdev-hw-api.vercel.app/api/v1/Ekaterina_Ivanova/comments", {
    method: "POST",
    body: JSON.stringify({
      name: formName.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      text: formText.value.replaceAll('<','&lt;').replaceAll('>','&gt;'),
      forceError: true,
    }),
  })
 .then((response) => {
    if(response.status === 500){
      throw new Error("Ошибка сервера");
    } 
    if (response.status === 400){
      throw new Error("Неверный запрос");
    } else {
      return response.json();
    }
  })
  .then(() => {
       return fetchComments();
    })
  .then(() => {
    buttonElement.disabled = false;
    form.innerHTML = newForm;
    formName.value = "";
    formText.value = "";
  })
  .catch((error) => {
    buttonElement.disabled = false;
    form.innerHTML = newForm;
    if(error.message === "Ошибка сервера"){
      alert("Сервер сломался")
      return;
    } 
    if(formName.value.length <= 3 || formText.value.length <= 3){
      alert('Имя и комментарий должны быть не короче 3 символов');
      return;
    } else {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    }
    console.warn(error);
  });
 };
 export { fetchComments, newComment };
 
