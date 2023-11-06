import { getCommentsApi, postCommentsApi } from "./api.js";

const buttonElement = document.getElementById("add-button");
  const listElement = document.getElementById("list");
  const nameElement = document.getElementById("add-name");
  const commentElement = document.getElementById("add-comment");
  const loaderElement = document.getElementById("loader");

  const getApi = () => {
    listElement.classList.add("hidden");
    loaderElement.classList.remove("hidden");
    getCommentsApi()
      .then((responseData) => {
        commentsArray = responseData.comments.map((user) => {
          return {
            name: user.author.name,
            date: new Date(user.date).toLocaleString(),
            comment: user.text,
            like: user.likes,
            isLike: false
          };
        });
        renderComments();
      })
      .then(() => {
        listElement.classList.remove("hidden");
        loaderElement.classList.add("hidden");
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Failed to fetch") {
          alert("Нет подключения к сети,попробуйте позже");
        } else {
          alert(error.message);
        }
      });
  };
  getApi();

  let commentsArray = [];
  const commentClick = () => {
    const userComments = document.querySelectorAll(".comment");
    for (const userComment of userComments) {
      const addTextInTextArea = () => {
        const commentBodyText = userComment.querySelector(".comment-body")
          .innerText;
        const commentNameText = userComment.querySelector(".comment-name")
          .innerText;
        commentElement.value = `> ${commentBodyText} \n ${commentNameText},`;
        commentElement.focus();
      };
      userComment.addEventListener("click", addTextInTextArea);
    }
  };

  const likeButtonClick = () => {
    const userLikes = document.querySelectorAll(".like-button");
    for (const userLike of userLikes) {
      userLike.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = userLike.dataset.index;
        if (commentsArray[index].isLike === false) {
          commentsArray[index].like++;
          commentsArray[index].isLike = true;
        } else {
          commentsArray[index].like--;
          commentsArray[index].isLike = false;
        }

        renderComments();
      });
    }
  };
  const renderComments = () => {
    const commentsHtml = commentsArray
      .map((user, index) => {
        return `<li class="comment" >
          <div class="comment-header">
            <div class="comment-name">${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
            ${user.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.like}</span>
              <button data-index="${index}" class="like-button  ${user.isLike ? "-active-like" : ""
          }"></button>
            </div>
          </div>
        </li>`;
      })
      .join("");

    listElement.innerHTML = commentsHtml;
    likeButtonClick();
    commentClick();
  };
  renderComments();

  let date = new Date();
  let m = date.getMonth() + 1;
  if (m < 10) {
    m = "0" + m;
  }
  let y = date.getFullYear() % 100;
  if (y < 10) {
    y = "0" + y;
  }
  let minu = date.getMinutes();
  if (minu < 10) {
    minu = "0" + minu;
  }
  let myDate =
    date.getDate() + "." + m + "." + y + " " + date.getHours() + ":" + minu;

  buttonElement.addEventListener("click", () => {
    nameElement.classList.remove("error");

    if (nameElement.value === "") {
      nameElement.classList.add("error");
      return;
    }

    commentElement.classList.remove("error");

    if (commentElement.value === "") {
      commentElement.classList.add("error");
      return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавляется...";

    postCommentsApi({nameElement, commentElement})
      .then((responseData) => {
        nameElement.value = "";
        commentElement.value = "";
        return getApi();


      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "Failed to fetch") {
          alert("Нет подключения к сети,попробуйте позже");
        } else {
          alert(error.message);
        }
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
      });
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
  });