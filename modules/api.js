  import { getDate, addErrors } from "./helper.js";
import { renderCommentList } from "./render.js";
  
  
    const addingAComment = document.getElementById('adding');
    const commentsLoader = document.getElementById('loader');
    const nameElement = document.getElementById('name');
    const commentsElement = document.getElementById('comments');

    
export const getComments = () => {
    const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v2/valeriy-poletaev/comments",
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
               date: getDate(comment.date),
               text: comment.text,
               likes: comment.likes,
               activeLike: comment.isLiked,
              activeClass: activeClass, 
              isEdit: false,
          }
        });
        renderCommentList(commentList);
      });
      });
      };
    

    export const postComment = (data) => {
      const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v2/valeriy-poletaev/comments",
        {
          method: "POST",
          body: JSON.stringify({
          name: nameElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
          date: new Date(),
          text: commentsElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
          likes: 0,
          activeLike: false,
          activeClass: "",
          forceError: true,
        })
      });
        fetchPromise.then((response) => {
          console.log(response);
          commentsLoader.classList.add("_hidden");
          addingAComment.classList.remove("_hidden");
          if (response.status === 400) {
            alert("Имя и комментарий не должны быть меньше трех симвалов");
            addErrors()
            
          }
          else if (response.status === 500){
            alert("Сервер сломался, Попробуй позже");
          }
          
          else{
            commentsElement.value = "";
            nameElement.value = "";  
          }
        });
        getComments();
      };


      export const getUsers = () => {
        const fetchPromise = fetch("https://wedev-api.sky.pro/api/user",
          {
            method: "GET"
          });

          fetchPromise.then((response) => {
            const jsonPromise = response.json();
    
          jsonPromise.then((responseData) => {
            console.log(responseData);
              
            });
          });
          };
          

          export const postRegistration = (data) => {
            const fetchPromise = fetch(" https://wedev-api.sky.pro/api/user",
              {
                method: "POST",
                body: JSON.stringify({
                login: login.value,
                name: registrationName.value,
                password: password.value
              })
            });
            fetchPromise.then((response) => {
              const jsonPromise = response.json();
      
            jsonPromise.then((responseData) => {
              console.log(responseData);
                
              });
            });
          };

          export const postLogIn = (login, password) => {
            const fetchPromise = fetch("  https://wedev-api.sky.pro/api/user/login",
              {
                method: "POST",
                body: JSON.stringify({
                login,
                password
              })
            });
            fetchPromise.then((response) => {
              const jsonPromise = response.json();
            });
              getUsers();
            };
          
          

          
    
        



