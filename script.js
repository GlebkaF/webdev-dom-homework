let addFormName = document.querySelector(".add-form-name"),
addFormText = document.querySelector(".add-form-text"),
addFormButton = document.querySelector(".add-form-button"),
comments = document.querySelector(".comments"),
comment = document.getElementsByTagName('li'),
deleteFormButton = document.querySelector(".delete-form-button"),
addForm = document.querySelector(".add-form"),
adding = document.querySelector(".adding"),
commentsLoading = document.querySelector(".comments-loading");


let commentos = [];




fetchGet = () => {
  commentsLoading.style.display = "block";
  fetch('https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments', {
      method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
        const appComments = responseData.comments
        .map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(Date.parse(comment.date)).toLocaleDateString() + ' ' + new Date(Date.parse(comment.date)).getHours() + ':' + new Date(Date.parse(comment.date)).getMinutes(),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
            id: comment.id,
          };
        });
        return appComments;
      })
      .then((data) => {
        commentsLoading.style.display = "none";
        commentos = data;
        renderComments();
      });

};

fetchGet();

function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};



addFormButton.classList.add('add-form-button-inactive');






initLikeButtonsListeners = () => {
  let likeButtonsElements = document.querySelectorAll('.like-button');

  

  for(const likeButtonElement of likeButtonsElements) {

    likeButtonElement.addEventListener('click', (event) => {

      event.stopPropagation();

      const index = likeButtonElement.dataset.index;
      console.log(index);
      likeButtonElement.classList.add('-loading-like');
      delay(2000)
      .then(() => {
        if(commentos[index].isLiked) {
          commentos[index].likes -= 1;
          commentos[index].isLiked = !commentos[index].isLiked;
        } else {
          commentos[index].likes += 1;
          commentos[index].isLiked = !commentos[index].isLiked;
        }
      })
      .then(() => {
        likeButtonElement.classList.remove('-loading-like');
        renderComments();
      });
    });
  }
  
};

initCorrectButtonsListeners = () => {
  let correctButtonsElements = document.querySelectorAll('.correct-form-button');

  for(const correctButtonElement of correctButtonsElements) {
    correctButtonElement.addEventListener('click', (event) => {

      event.stopPropagation();

      let correctIndex = correctButtonElement.dataset.id;

      commentos[correctIndex].isCorrecting = !commentos[correctIndex].isCorrecting;

      renderComments();

      let correctedText = document.querySelector('.correcting-input');
      let correctingBtn = document.querySelector('.correcting-btn');

      //.replaceAll(`<div class='quote'>`, 'QUOTE_BEGIN').replaceAll('</div>', 'QUOTE_END')
    
        correctingBtn.addEventListener('click', (event) => {

          event.stopPropagation();

          correctedText.value = correctedText.value
          .replaceAll('<', '&lt')
          .replaceAll('>', '&gt')
          .replaceAll('QUOTE_BEGIN', `<div class='quote'>`)
          .replaceAll('QUOTE_END', '</div>');


          commentos[correctIndex].text = correctedText.value;

          commentos[correctIndex].isCorrecting = !commentos[correctIndex].isCorrecting;

          renderComments();
        });
    });
  }
};

initCommentariesListeners = () => {
  let commentaries = document.querySelectorAll('.comment');

  for(const commentarie of commentaries) {
    commentarie.addEventListener('click', () => {
      let index = commentarie.dataset.id;

      commentos[index].text = commentos[index].text
      .replaceAll(`<div class='quote'>`, 'QUOTE_BEGIN')
      .replaceAll('</div>', 'QUOTE_END');

      addFormText.value = `QUOTE_BEGIN ${commentos[index].name}: \n ${commentos[index].text} QUOTE_END`;
    });
  }
};



const renderComments = () => {

  const commentsHtml = commentos.map((comment, index) => {

    // isLiked[index] = 0;

    // if(comment.isCorrecting) {
    //   comment.text = comment.text
    //   .replaceAll(`<div class='quote'>`, 'QUOTE_BEGIN')
    //   .replaceAll('</div>', 'QUOTE_END');
    //   return `<li class="comment" data-id='${comment.id}'>
    //   <div class="comment-header">
    //     <div>${comment.name}</div>
    //     <div>${comment.date}
    //     </div>
    //   </div>
    //   <div class="comment-body">
    //     <div class="comment-text">
    //       <input class='correcting-input' value='${comment.text}'></input>
    //     </div>
    //   </div>
    //   <div class="comment-footer">
    //     <button class='correcting-btn'>Сохранить</button>
    //   </div>
    // </li>`;
    // }

      return `<li class="comment" data-id='${comment.id}'>
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter" data-id='${comment.id}'>${commentos[index].likes}</span>
          <button 
          class="like-button ${comment.isLiked ? '-active-like' : ''}" 
          data-index='${index}'>
          </button>
        </div>
      </div>
      <button class='correct-form-button' data-id='${comment.id}'>Редактировать</button>
    </li>`;
  }).join('');

  let comments = document.querySelector(".comments");

  comments.innerHTML = commentsHtml;

  initLikeButtonsListeners();
  initCorrectButtonsListeners();
  initCommentariesListeners();
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

    addForm.style.display = 'none';
    adding.style.display = 'block';
    

        fetch("https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments", {
          method: "POST",
          body: JSON.stringify({
            name: addFormName.value,
            text: addFormText.value,
          })
        })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
            console.log(responseData);
            fetchGet();
            renderComments();
        })
        .then((data) => {
          addForm.style.display = 'flex';
          adding.style.display = 'none';
        });



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



