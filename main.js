import { renderComments} from "./render.js";

const listElement = document.getElementById("comments-list");
const buttonElement = document.getElementById("button-form");
const nameInputElement = document.getElementById("user-name");
const textInputElement = document.getElementById("user-text");
const formElement = document.getElementById("form");
const deleteButtonElement = document.getElementById("delete-button");

const formatDate = (commentDate) => {
  let date = new Date();
  const formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear().toString().slice(-2) +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  return formattedDate;
};

let comments = [];

const getPromise = () => {
  const fetchPromise = fetch(
    "https://wedev-api.sky.pro/api/v1/qwitchers/comments",
    {
      method: "GET",
    }
  );

  fetchPromise.then((responce) => {
    responce.json().then((responceData) => {
      const appComments = responceData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: formatDate(comment.date),
          text: comment.text,
          likes: "0",
          isLiked: false,
        };
      });
      comments = appComments;
      renderComments();
    });
  });
};

getPromise();

const copyComment = () => {
  const commentsElement = document.querySelectorAll(".comment");

  for (const comment of commentsElement) {
    comment.addEventListener("click", () => {
      textInputElement.value =
        `> ${comment
          .querySelector(".comment-text")
          .innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}` +
        `\n\n${comment
          .querySelector(".comment-header")
          .children[0].innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`;
    });
  }
};

const initLike = () => {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    const index = likeButton.dataset.index;
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (comments[index].isLiked) {
        comments[index].likes--;
      } else {
        comments[index].likes++;
      }
      comments[index].isLiked = !comments[index].isLiked;

      renderComments();
    });
  }
};

// const renderComments = () => {
//   const commentsHtml = comments
//     .map((comment, index) => {
//       let activeLike = "";
//       if (comments[index].isLiked) {
//         activeLike = "-active-like";
//       }
//       return `
//         <li class="comment">
//             <div class="comment-header">
//             <div id="commentName">${comment.name}</div>
//             <div>${comment.date}</div>
//             </div>
//             <div class="comment-body">
//               <div class="comment-text"  id="commentText">${comment.text}</div>
//             </div>
//             <div class="comment-footer">
//               <div class="likes">
//                 <span class="likes-counter" >${comment.likes}</span>
//                 <button class="like-button ${activeLike}" data-index='${index}'></button>
//               </div>
//             </div>
//           </li>`;
//     })
//     .join("");

//   listElement.innerHTML = commentsHtml;

//   initLike();
//   copyComment();
// };
renderComments();

buttonElement.addEventListener("click", () => {
  buttonElement.classList.remove("add-form-button-error");
  buttonElement.classList.add("add-form-button");
  nameInputElement.classList.remove("error");
  textInputElement.classList.remove("error");

  if (nameInputElement.value === "" || textInputElement.value === "") {
    buttonElement.classList.remove("add-form-button");
    buttonElement.classList.add("add-form-button-error");

    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
    }
    if (textInputElement.value === "") {
      textInputElement.classList.add("error");
    }

    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Элемент добавлятся...";

  fetch("https://wedev-api.sky.pro/api/v1/qwitchers/comments", {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      date: formatDate(),
      text: textInputElement.value,
      likes: "0",
      isLiked: false,
      forseError: true,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 500) {
        alert("Извините, похоже что-то с сервером. Попробуйте позже");
      } else if (response.status === 400) {
        alert("Некорректно переданны данные");
        alert(
          "Проверьте, корректность введенных данных имени и текста комментария: Имя или текст не должны быть короче 3 символов"
        );
      }
    })
    .then((responseData) => {
      return getPromise();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      textInputElement.value = "";
    })
    .catch((error) => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Написать";
      alert("Что-то пошло не так, попробуйте снова");
    });
});

// deleteButtonElement.addEventListener("click", () => {
//   const lastCommentIndex = listElement.innerHTML.lastIndexOf(
//     '<li class="comment">'
//   );
//   if (lastCommentIndex !== -1) {
//     listElement.innerHTML = listElement.innerHTML.substring(
//       0,
//       lastCommentIndex
//     );
//   }
//   comments.pop();
//   renderComments();
// });

document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});

console.log("It works!");
