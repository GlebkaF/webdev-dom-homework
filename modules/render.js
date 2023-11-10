import { inputTextElement, inputNameElement } from "./renderOptional.js";


export const buttonElement = document.getElementById("add-button");
export const listElement = document.getElementById("list");

export const renderUsers = (users) => {
  // listElement remove if not working
  const appHtml = document.getElementById("app");
  // const list = document.getElementById("list");
  const usersHTML = users
    .map((user, index) => {
      return `<li class="comment" data-index="${index}" >
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              <a class="comment__link" href="#" id="text-button-${
                user.text
              }"></a>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button data-index="${index}" class="like-button ${
        user.isLiked ? "-active-like" : "-no-active-like"
      }"></button>
            </div>
          </div>
        </li> `;
    })
    .join("");

  appHtml.innerHTML = usersHTML;

  // listElement.appendChild(listItem);

  // attachLikeButtonListener(user, users, listElement);
  // attachTextButtonListener(user, users, listElement);
  // Possibly needed
  //   });
  // list.innerHTML = usersHTML;
};

export const attachTextButtonListener = (user) => {
  const commentElement = document.getElementById(`comment-${index}`);
  commentElement.addEventListener("click", (event) => {
    event.stopPropagation();
    inputTextElement.value = user.name + "\n" + user.text;
    inputTextElement.style.whiteSpace = "pre-line";
  });
};

export const attachLikeButtonListener = (user, users, listElement) => {
  const likesButton = document.querySelectorAll(`like-button-${index}`);
  likesButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (user.isLiked) {
      user.likes -= 1;
    } else {
      user.likes += 1;
    }
    user.isLiked = !user.isLiked;
    renderUsers(users, listElement);
  });
};
