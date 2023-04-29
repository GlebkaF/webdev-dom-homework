let addFormName = document.querySelector(".add-form-name"),
addFormText = document.querySelector(".add-form-text"),
addFormButton = document.querySelector(".add-form-button"),
comments = document.querySelector(".comments"),
comment = document.getElementsByTagName('li'),
deleteFormButton = document.querySelector(".delete-form-button");
// let likeButtonsElements = document.querySelectorAll('.like-button');


const commentos = [
  {
    name: 'Глеб Фокин',
    data: '12.02.2022 12:18',
    text: 'Это будет первый комментарий на этой странице',
    likesNum: 3,
    isLiked: false,
  },
  {
    name: 'Варвара Н.',
    data: '13.02.2022 19:22',
    text: 'Мне нравится как оформлена эта страница! ❤',
    likesNum: 75,
    isLiked: true,
  }
];

const currentDate = new Date();


addFormButton.classList.add('add-form-button-inactive');

initLikeButtonsListeners = () => {
  let likeButtonsElements = document.querySelectorAll('.like-button');

  for(const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener('click', () => {
      const index = likeButtonElement.dataset.index;
      // console.log(index);

      if(commentos[index].isLiked) {
        commentos[index].isLiked = !commentos[index].isLiked;
        commentos[index].likesNum -= 1;
        renderComments();
      } else {
        commentos[index].isLiked = !commentos[index].isLiked;
        commentos[index].likesNum += 1;
        renderComments();
      }
    });
  }
};

const renderComments = () => {
  const commentsHtml = commentos.map((comment, index) => {
    if(comment.isLiked) {
      return `<li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.data}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likesNum}</span>
          <button class="like-button -active-like" data-index='${index}'></button>
        </div>
      </div>
    </li>`;
    } else {
      return `<li class="comment">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.data}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likesNum}</span>
          <button class="like-button" data-index='${index}'></button>
        </div>
      </div>
    </li>`;
    }
  }).join('');

  comments.innerHTML = commentsHtml;

  initLikeButtonsListeners();
};

renderComments();




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

    // let oldComments = comments.innerHTML;
    // comments.innerHTML = oldComments + 
    // `<li class="comment">
    //       <div class="comment-header">
    //         <div>${addFormName.value}</div>
    //         <div>${currentDate.toLocaleDateString() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()}
    //         </div>
    //       </div>
    //       <div class="comment-body">
    //         <div class="comment-text">
    //           ${addFormText.value}
    //         </div>
    //       </div>
    //       <div class="comment-footer">
    //         <div class="likes">
    //           <span class="likes-counter">0</span>
    //           <button class="like-button"></button>
    //         </div>
    //       </div>
    //     </li>`;

        commentos.push({
          name: addFormName.value,
          data: currentDate.toLocaleDateString() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes(),
          text: addFormText.value,
          likesNum: 0,
        });

        renderComments();

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
    commentos.pop();
    renderComments();
});



