let addFormName = document.querySelector(".add-form-name"),
addFormText = document.querySelector(".add-form-text"),
addFormButton = document.querySelector(".add-form-button"),
comments = document.querySelector(".comments"),
comment = document.getElementsByTagName('li'),
deleteFormButton = document.querySelector(".delete-form-button");

const currentDate = new Date();


addFormButton.classList.add('add-form-button-inactive');


addFormName.addEventListener('input', () => {
    if(addFormName.value !== 0 && addFormText.value !== 0) {
        addFormButton.classList.remove('add-form-button-inactive');
    }
});

addFormText.addEventListener('input', () => {
    if(addFormName.value !== 0 && addFormText.value !== 0) {
        addFormButton.classList.remove('add-form-button-inactive');
     }

});

function clickable() {
        addFormName.classList.remove('error');
    addFormText.classList.remove('error');

    if(addFormName.value === '') {
        addFormName.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }
    if(addFormText.value === '') {
        addFormText.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }

    let oldComments = comments.innerHTML;
    comments.innerHTML = oldComments + 
    `<li class="comment">
          <div class="comment-header">
            <div>${addFormName.value}</div>
            <div>${currentDate.toLocaleDateString() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()}
            </div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${addFormText.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>`;

        addFormName.value = '';
        addFormText.value = '';
        addFormButton.classList.add('add-form-button-inactive');
}

addFormButton.addEventListener('click', () => {
    clickable();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        clickable();
    }
});

deleteFormButton.addEventListener('click', () => {
    comment[comment.length - 1].remove();
});

