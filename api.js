import { renderComments,renderForm } from "./render.js";

const getComments = (arrData,Element,token) => {
    let currentDate = new Date();
const shortDate = (value) => {
  let date = new Date(value);
  let month = date.getMonth();
  let min = date.getMinutes();
  let hours = date.getHours();
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (min < 10) min = "0" + min;
  return `${date.getDate()}.${month}.${date.getFullYear()-2000} ${hours}:${min}`;
}

    return fetch("https://wedev-api.sky.pro/api/v2/maxim/comments", {
 method: "GET",
 headers: {
  authorization: token,
 },
}).then((response) => {
 if (response.status === 200) {
   return response.json()
 } else {
   throw new Error("Нет соединения с сервером, попробуйте позже")
 } 
}).then((responseData) => {
   const appComments = responseData.comments.map((comment) => {
     return {
         id: comment.id,
         name: comment.author.name,
         date: shortDate(comment.date),
         text: comment.text,
         likeCounter: comment.likes,
         likeStatus: comment.isLiked,
     };
   });
   arrData = appComments;
   renderComments(arrData,Element,token);
 }).catch((error) => {
   if (error.message === "Failed to fetch") {
           alert("Кажется, у вас сломался интернет, попробуйте позже");
         } else { alert(error)}
       });
}
const checkAndAdd = (arrComments, element, disabledElement,token) => {
    const formElement = document.getElementById("form");
    const commentsElement = document.getElementById("comments");
    const userCommentElement = document.getElementById("userComment");
      const userNameElement = document.getElementById("userName");
    if (userNameElement.value === "" || userCommentElement.value === "") {
       disabledElement.disabled = true;
       setTimeout(() => disabledElement.disabled = false, 1000);
       return;}
       let oldForm = formElement.innerHTML;
      fetch("https://wedev-api.sky.pro/api/v2/maxim/comments", {
          method: "POST",
          body: JSON.stringify({
            forceError: true,
            text: userCommentElement.value,}),
            headers: {
              authorization: `Bearer ${localStorage.getItem('userToken')}`,
             },
        }).then((response) => {
          if (response.status === 201) {
            formElement.innerHTML = `<span style='text-align:center'>Коментарий добавляется...</span>`;
            return response.json()
          }
          if (response.status === 400) {
            throw new Error("Имя и коментарий должен содержать хотя бы 3 символа")
          } 
          if (response.status === 500) {
            throw new Error("500");
          }
        }).then((responseData) => {
            arrComments = responseData.comments;
            return getComments(arrComments, element,token);
          }).then(()=>{
            formElement.innerHTML = oldForm;
            document.getElementById("userName").disabled = true;
            document.getElementById("userName").value = localStorage.getItem('userName');
          }).catch((error) => {
            if (error.message === "Failed to fetch") {
              alert("Кажется, у вас сломался интернет, попробуйте позже");
              return
            }
            if (error.message === "500") {
              checkAndAdd(arrComments, element, disabledElement);
            } else { alert(error)}
          });
  
  }

  const addNewUser = () => {
    return fetch("https://wedev-api.sky.pro/api/user", {
      method: "POST",
      body: JSON.stringify({
        login: document.getElementById("userName").value,
        name: document.getElementById("userLogin").value,
        password: document.getElementById("userPassword").value,
      })
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Пользователь с таким логином уже сущетсвует");
      }
    }).catch((error) => {
     alert(error);
    });
  }

  const authorization = () => {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login: document.getElementById("userLogin").value,
        password: document.getElementById("userPassword").value,
      })
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Введен неправильный логин или пароль");
      }
      if (response.status === 201) {
        return response.json();
      }
    }).then((data) => {
      localStorage.clear()
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userToken', data.user.token);
      localStorage.setItem('userPassword', data.user.password);
      localStorage.setItem('userLogin', data.user.login);
      return data.user;
    }).catch((error) => {
      alert(error);
     });
  }

  const deleteComment = (id,token) => {
    return fetch("https://wedev-api.sky.pro/api/v2/maxim/comments/" + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      return response.json();
    });
  }

  const switchLike = (id,token) => {
    return fetch("https://wedev-api.sky.pro/api/v2/maxim/comments/" +id +"/toggle-like", {
      method: "POST",
      headers: {
        authorization: token,
       },
    }).then((response) => {
      if (response.status === 401) {
        throw new Error("Лайкать могут только авторизованные пользователи");
      } else {
        return response.json();
      }
    }).catch((error) => {
      alert(error);
     });
  }
  export { getComments, checkAndAdd, addNewUser, authorization, switchLike, deleteComment};