import { inputTextElement } from "./api.js";

export const buttonElement = document.getElementById("add-button");
export const listElement = document.getElementById("list");

export const renderUsers = (users, listElement) => {
  listElement.innerHTML = "";
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<div class="comment" id="comment-${user.id}">
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              <a class="comment__link" href="#" id="text-button-${user.text}">${
      user.text
    }</a>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span id="likes-counter-${user.id}" class="likes-counter">${
      user.likes
    }</span>
    
              <button id="like-button-${user.id}" class="like-button ${
      user.isLiked ? "-active-like" : "-no-active-like"
    }"></button>
            </div>
          </div>
        </div> `;
    listElement.appendChild(listItem);

    attachLikeButtonListener(user, users, listElement);
    attachTextButtonListener(user, users, listElement);
  });
};

export const attachTextButtonListener = (user) => {
  const commentElement = document.getElementById(`comment-${user.id}`);
  commentElement.addEventListener("click", (event) => {
    event.stopPropagation();
    inputTextElement.value = user.name + "\n" + user.text;
    inputTextElement.style.whiteSpace = "pre-line";
  });
};

export const attachLikeButtonListener = (user, users, listElement) => {
  const likesButton = document.getElementById(`like-button-${user.id}`);
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
