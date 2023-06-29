// import { users } from "./data.js";
const fetchPromise = () => {
    fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
    {
        method: "GET",
    }).then((response) => {    
      return response;
    })
    .then((response) => {
    return response.json()
    })
    .then((responseData) => {
      users = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: name(new Date(comment.date)),
          comments: comment.text,
          like: comment.likes,
          isLiked: false,
          active: ""
        };
      });
      renderUsers();
    }).then(() => { 
      comBox.classList.remove("box-load-active");
    
    })
    .catch((error) => {
      alert("Что то пошло не так, повторите позже") ;
    });;
    
}; 
fetchPromise();

buttonElement.addEventListener("click", () => {
    nameInput.classList.remove("error");
    commentInput.classList.remove("error");
    if (nameInput.value === "") {
      nameInput.classList.add("error"); return
    } else if (commentInput.value === "") {
      commentInput.classList.add("error"); return
    }; 
    buttonElement.disabled = true;
    
    comBoxNew.classList.add("box-load-new-active");
    addForm.classList = "box-load";
    
    
    // POST запрос
    
    const fetchPost = () => {
        return fetch("https://wedev-api.sky.pro/api/v1/vlad-smirnov/comments",
        {
            method: "POST",
            body: JSON.stringify(
                {
                    date: name(new Date()),
                    likes: 0,
                    isLiked: false,
                    text: commentInput.value,
                    name: nameInput.value,
                    active: "",
                })
            })
        }
        fetchPost()
        .then((response) => {
            comBoxNew.classList.remove("box-load-new-active");
            if (response.status === 201) {
                return response.json();
            }
            else if (response.status === 400 && nameInput.value.length < 3) {
                throw new Error(400);
            }
            else if (response.status === 400 && commentInput.value.length < 3) {
                throw new Error(401);
            }
            else if (response.status === 500) {
                throw new Error(500);
            }
            else {
                throw new Error()
            }
        })
        .then((responseData) => {
            users = responseData.comments;
            fetchPromise();
        })
        .then(() => {
            return fetchPromise();
        })
        .then(() => {
            addForm.classList = "add-form";
            comBoxNew.classList.remove("box-load-new-active");
            buttonElement.disabled = false;
            nameInput.value = "";
            commentInput.value = "";
        })
        .catch((error) => { 
            if(error.message == 400) {
                nameInput.classList.add("error");
                setTimeout(() => {
                    return nameInput.classList.remove("error") 
                }, 3000); 
                alert("Имя и комментарий не должны быть короче 3х символов"); 
            }
            else if (error.message == 401) {
                commentInput.classList.add("error");
                setTimeout(() => {
                    return commentInput.classList.remove("error") 
                }, 3000);
                alert("Имя и комментарий не должны быть короче 3х символов");
            }
            else if (error.message == 500) {
                alert("Проблемы с сервером, повторите позже")
                buttonElement.disabled = false;
            }
            else {
                comBoxNew.classList.remove("box-load-new-active");
                alert("Что то пошло не так, повторите позже")
            };
            addForm.classList = "add-form";
            buttonElement.disabled = false;
        });
        renderUsers();
    }); 


