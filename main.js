    import { getTodos, postTodo } from "./api.js";
    import { renderComments } from "./renderComments.js";

        const buttonElement = document.getElementById("add-button");
        const nameInputElement = document.getElementById("name-input");
        const commentInputElement = document.getElementById("comment-input");
        const newButton = document.getElementById("new-button");
        const inputList = document.getElementById("input-list");
        const loader = document.querySelector(".loader");
        const preloader = document.querySelector(".preloader");

        const getCurrentDate = () => {
        const currentDate = new Date();
        const year = String(currentDate.getFullYear()).slice(-2);
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const resultDate = `${day}.${month}.${year} ${hours}:${minutes}`;
        return resultDate;
        };

        let comments = [];

        const clickLike = (event) => {
            event.stopPropagation();
            const index = event.target.dataset.index;
            const comment = comments[index];
            if (!comment.active) {
            comment.active = true;
            comment.like++;
            } else {
            comment.active = false;
            comment.like--;
            }
            renderComments({comments, clickLike});
        };

        const getDateApi = () => {
    getTodos()
    .then((responseData) =>{
        const appComments = responseData.comments.map((comment)=>{
            return {
            name: comment.author.name,
            date: getCurrentDate(),
            text: comment.text,
            like: comment.likes,
            active: false,
            isEdit: false,
            }
        });

        comments = appComments; 
        loader.style.display = 'none';
        renderComments({comments, clickLike});
        });
    };

    getDateApi();

        // const clickEdit = (event) => {
        //   event.stopPropagation();
        //   const index = event.target.dataset.edit;
        //   const comment = comments[index];
        //   const textarea = document.querySelectorAll(".edit-form");

        //   if (!textarea) {
        //     comments[index].text = textarea.value;
        //   }

        //   if (comment.isEdit) {
        //     comment.isEdit = false;
        //   } else {
        //     comment.isEdit = true;
        //   }
        //   renderComments();
        // };

        // const textCommentClick = (event) => {
        //   event.stopPropagation();
        //   const index = commentElements.dataset.test;
        //   const comment = comments[index];
        //   commentInputElement.value =
        //     ">" + comments[index].text + "\n" + "\n" + comments[index].name + ",";
        //   renderComments();
        // };

        renderComments({comments, clickLike});

        const getElement = () => {
        nameInputElement.classList.remove("error");
        commentInputElement.classList.remove("error");

        if (nameInputElement.value === "") {
            buttonElement.disabled = true;
            buttonElement.style.backgroundColor = "gray";
            nameInputElement.classList.add("error");
            return;
        }
        if (commentInputElement.value === "") {
            buttonElement.disabled = true;
            buttonElement.style.backgroundColor = "gray";
            commentInputElement.classList.add("error");
            return;
        }

        preloader.style.display = 'block';
        inputList.style.display = 'none';

        postTodo({
            name: nameInputElement.value, 
            text: commentInputElement.value,
            forceError: true,
        })
        .then((responseData) =>{
        return getDateApi();
            })
            .then((getDate)=>{
            preloader.style.display = 'none';
            inputList.style.display = 'flex';
            
            nameInputElement.value = "";
            commentInputElement.value = "";
            nameInputElement.classList.remove("error");
            commentInputElement.classList.remove("error");
            })
            .catch((error)=>{
            preloader.style.display = 'none';
            inputList.style.display = 'flex';

            if (error.message === 'Сервер сломался') {
                alert("Сервер сломался, попробуй позже");
                return;
            } if (error.message === 'Плохой запрос') {
                alert('Имя и комментарий должны быть не короче 3 символов');
                return;
            } 

            alert('Кажется, у вас сломался интернет, попробуйте позже');
            });
        };

        buttonElement.addEventListener("click", getElement);

        nameInputElement.addEventListener("input", () => {
        buttonElement.disabled = false;
        buttonElement.style.backgroundColor = "";
        nameInputElement.classList.remove("error");
        });

        commentInputElement.addEventListener("input", () => {
        buttonElement.disabled = false;
        buttonElement.style.backgroundColor = "";
        commentInputElement.classList.remove("error");
        });

        newButton.addEventListener("click", () => {
        comments.pop();
        renderComments({comments, clickLike});
        });

        document.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            getElement();
        }
        });
