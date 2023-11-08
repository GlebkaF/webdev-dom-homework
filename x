const ButtonElement = document.getElementById('add-form-button');
const ListElement = document.getElementById('comments');
const UserName = document.getElementById('add-form-name');
const UserComment = document.getElementById('add-form-text');

ButtonElement.addEventListener("click", () => {
  const name = UserName.value;
  const comment = UserComment.value;
  const OldLIstHTML = ListElement.innerHTML;
  ListElement.innerHTML = OldLIstHTML + `  
    <li class="comment">
    <div class="comment-header">
    <div>${name}</div>
    <div></div>
    </div>
    <div class="comment-body">
    <div class="comment-text">
        ${comment}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
        <span class="likes-counter">3</span>
        <button class="like-button"></button>
    </div>
    </div>
    </li>
`;
});
console.log("It works!");