import { commentsLoading, comments, addFormName, addFormText, addForm, adding, addFormButton } from "./script.js";
import renderComments from "./renderComments.js";
import { getListComments } from "./listComments.js";

export let commentos = [];

export const fetchGet = () => {
    commentsLoading.style.display = "block";
    fetch('https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments', {
        method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
          const appComments = responseData.comments
          .map((comment) => {
            return {
              name: comment.author.name,
              date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
              text: comment.text,
              likes: comment.likes,
              isLiked: false,
              id: comment.id,
            };
          });
          return appComments;
        })
        .then((data) => {
          commentsLoading.style.display = "none";
          commentos = data;
          renderComments(comments, getListComments);
        });
  
  };

  export const fetchPost = () => {
    fetch("https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments", {
        method: "POST",
        body: JSON.stringify({
          name: addFormName.value,
          text: addFormText.value,
          // forceError: true,
        })
      })
      .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
            // addFormName.value = nam;
            // addFormText.value = text;
            throw new Error("Ошибка сервера");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны быть не короче 3 символов');
            // addFormName.value = nam;
            // addFormText.value = text;
            throw new Error("Неверный запрос");
          
        } else {
            return response.json();
        } 
      })
      .then((responseData) => {
          console.log(responseData);
          fetchGet();
          renderComments(comments, getListComments);
      })
      .then((data) => {
        addForm.style.display = 'flex';
        adding.style.display = 'none';

        addFormName.value = '';
        addFormText.value = '';
        addFormButton.classList.add('add-form-button-inactive');
      })
      .catch((error) => {

        if(!navigator.onLine) {
           alert('Кажется, у вас сломался интернет, попробуйте позже');
        }

        addForm.style.display = 'flex';
        adding.style.display = 'none';

        console.warn(error);
      });
  }