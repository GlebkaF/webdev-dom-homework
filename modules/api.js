  import { getDate, addErrors } from "./helper.js";
import { renderCommentList } from "./render.js";
import {formatDateToRu} from "./lib/formatDate/formatDate.js"
  
  
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');
    const nameElement = document.getElementById('name');
    const commentsElement = document.getElementById('comments');
    let token = ''  

    export const getToken = () => token;
    export const setToken = (newToken) => {
      token = newToken
      };

    
export const getComments = () => {
    const fetchPromise = fetch(" https://wedev-api.sky.pro/api/v2/valeriy-poletaev/comments",
      {
        method: "GET"
      });

      fetchPromise.then((response) => {
        const jsonPromise = response.json();

      jsonPromise.then((responseData) => {
         const commentList = responseData.comments.map((comment) => {
          let activeClass = ""
          if(comments.isLiked === true){
            activeClass = "-active-like"
          };
          return{
            name: comment.author.name,
               date: formatDateToRu(comment.date),
               text: comment.text,
               likes: comment.likes,
               activeLike: comment.isLiked,
              activeClass: activeClass, 
              isEdit: false,
              id: comment.id,
              author: {
                id: comment.author.id,
                login: comment.author.login,
                name: comment.author.name 
              }             
          }
        });
        renderCommentList(commentList); 
        });
      });
      };
    

    export const postComment = (data) => {
      const fetchPromise = fetch(" https://wedev-api.sky.pro/api/v2/valeriy-poletaev/comments",
        {
          method: "POST",
          headers:{Authorization: token},
          body: JSON.stringify({
          text: commentsElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
          })
      });
        fetchPromise.then((response) => {
          console.log(response);
          commentsLoader.classList.add("_hidden");
          addingAComment.classList.remove("_hidden");
          if (response.status === 400) {
            alert("Комментарий не должны быть меньше трех симвалов");
            addErrors()
            }
          else if (response.status === 500){
            alert("Сервер сломался, Попробуй позже");
          }
          else{
            commentsElement.value = "";
            nameElement.value = "";  
            getComments();
          }
        });
      };


      export const getUsers = () => {
        return fetch("https://wedev-api.sky.pro/api/user",
          {
            method: "GET"
          }).then((response) => {
            const jsonPromise = response.json();
            return jsonPromise;
          });
        };
          

          export const postRegistration = (data) => {
            return fetch("https://wedev-api.sky.pro/api/user",
              {
                method: "POST",
                body: JSON.stringify({
                login: login.value,
                name: registrationName.value,
                password: password.value
              })
            }).then((response) => {
              if (response.status === 400 ) {
                alert("Такой пользователь уже существует")
              };
              const jsonPromise = response.json();
              console.log(jsonPromise);
              return jsonPromise;
              });
          };

          export const postLogIn = (login, password) => {
            return fetch(" https://wedev-api.sky.pro/api/user/login",
              {
                method: "POST",
                body: JSON.stringify({
                login: login,
                password: password
              })
            }).then((response) => {
              if (response.status === 400 ) {
                alert("Неверный логин или пароль")
              };
              getUsers();
              const jsonPromise = response.json();
              console.log(jsonPromise);
              return jsonPromise;
              });
            };
          
          

          
    
        



