import { getComments, postApi } from "./api.js";
import { renderComments } from "./renderComments.js";

    const addCommentButton = document.getElementById("comment-button");
    const nameInput = document.getElementById("name-input");
    const textInput = document.getElementById("text-input");
    const addLoaderComment = document.getElementById('add-loader-comment');
    const loaderComment = document.getElementById("loader-comment");
    const newDate = new Date;
    const formatedDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
    const addFormId = document.getElementById("add-form");
    const addForm = document.querySelector('.add-form');

    document.getElementById("add-loader-comment").style.display = 'none';

    let comments = [];

    const getRenderComments = () => {

    getComments().then((responseData) => {
        comments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date).toLocaleDateString() + " " + (new Date(comment.date).getHours() < 10 ? '0' + new Date(comment.date).getHours() : new Date(comment.date).getHours()) + ":" + (new Date(comment.date).getMinutes() < 10 ? '0' + new Date(comment.date).getMinutes() : new Date(comment.date).getMinutes()) + ":" + (new Date(comment.date).getSeconds() < 10 ? '0' + new Date(comment.date).getSeconds() : new Date(comment.date).getSeconds()),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
          }
        });
        loaderComment.style.display = 'none';
        // получили данные и рендерим их в приложении
        renderComments({ comments });
      });
    };

    renderComments({ comments });
    
    addCommentButton.addEventListener("click", () => {

      nameInput.classList.remove("error");
      textInput.classList.remove("error");
      if (nameInput.value === "") {
        nameInput.classList.add("error");
        return;
      }
      if (textInput.value === "") {
        textInput.classList.add("error");
        return;
      }

      //Убираем форму ввода при клике кнопку Написать
      document.getElementById("add-form").style.display = 'none';
      addLoaderComment.style.display = true;
      document.getElementById("add-loader-comment").style.display = 'block';
      
      function postTask(text) {
      postApi({ 
        text: textInput.value,
        name: nameInput.value,
        date: formatedDate
       }).then((responseData) => {
        return getRenderComments();
      })
      .then((responseData) => {
        document.getElementById("add-form").style.display = 'flex';
        document.getElementById("add-loader-comment").style.display = 'none';
        nameInput.value = ""
        textInput.value = ""
      })
      .catch((error) => {
        document.getElementById("add-form").style.display = 'flex';
        document.getElementById("add-loader-comment").style.display = 'none';
          if (error.message === "Сервер сломался") {
            alert('Сервер сломался, попробуйте позже');
          }
          if (error.message === "Плохой запрос") {
            alert('Имя и комментарий должны быть не короче 3х символов');
          }
          else {
            alert("Кажется у вас сломался интернет, попробуйте позже")
          }
          // TODO: Отправлять в систему сбора ошибок
          console.log(error);
        });
      }
      
      postTask();
      renderComments({ comments });  
    });

    getRenderComments();
