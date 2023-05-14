let addFormName = document.querySelector(".add-form-name"),
addFormText = document.querySelector(".add-form-text"),
addFormButton = document.querySelector(".add-form-button"),
comments = document.querySelector(".comments"),
comment = document.getElementsByTagName('li'),
deleteFormButton = document.querySelector(".delete-form-button");


// const commentos = [
//   {
//     name: 'Глеб Фокин',
//     data: '12.02.2022 12:18',
//     text: 'Это будет первый комментарий на этой странице',
//     likesNum: 3,
//     isLiked: false,
//     isCorrecting: false,
//   },
//   {
//     name: 'Варвара Н.',
//     data: '13.02.2022 19:22',
//     text: 'Мне нравится как оформлена эта страница! ❤',
//     likesNum: 75,
//     isLiked: true,
//     isCorrecting: false,
//   }
// ];

let commentos = [];

const currentDate = new Date();



fetchGet = () => {
  const fetchPromise = fetch('https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments',

     {
      method: "GET"
    });


    fetchPromise.then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((responseData) => {
        commentos = responseData.comments;
        renderComments();
      });
    });
};

fetchGet();


addFormButton.classList.add('add-form-button-inactive');

initLikeButtonsListeners = () => {
  let likeButtonsElements = document.querySelectorAll('.like-button');

  for(const likeButtonElement of likeButtonsElements) {
    likeButtonElement.addEventListener('click', (event) => {

      event.stopPropagation();

      // const index = likeButtonElement.dataset.index;
      // console.log(index);

      // if(commentos[index].isLiked) {
      //   commentos[index].isLiked = !commentos[index].isLiked;
      //   commentos[index].likesNum -= 1;
      //   renderComments();
      // } else {
      //   commentos[index].isLiked = !commentos[index].isLiked;
      //   commentos[index].likesNum += 1;
      //   renderComments();
      // }

      const index = likeButtonElement.dataset.id;
      console.log(index);





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
  const commentsHtml = commentos.map((comment) => {

    let time = Date.parse(comment.date);
    let data = new Date(time);
    let date = data.toLocaleDateString() + ' ' + data.getHours() + ':' + data.getMinutes();


    if(comment.isCorrecting) {
      comment.text = comment.text
      .replaceAll(`<div class='quote'>`, 'QUOTE_BEGIN')
      .replaceAll('</div>', 'QUOTE_END');
      return `<li class="comment" data-id='${comment.id}'>
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${date}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          <input class='correcting-input' value='${comment.text}'></input>
        </div>
      </div>
      <div class="comment-footer">
        <button class='correcting-btn'>Сохранить</button>
      </div>
    </li>`;
    }
    if(comment.isLiked) {
      return `<li class="comment" data-id='${comment.id}'>
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${date}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button -active-like" data-id='${comment.id}'></button>
        </div>
      </div>
      <button class='correct-form-button' data-id='${comment.id}'>Редактировать</button>
    </li>`;
    } else {
      return `<li class="comment" data-id='${comment.id}'>
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${date}
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button" data-id='${comment.id}'></button>
        </div>
      </div>
      <button class='correct-form-button' data-id='${comment.id}'>Редактировать</button>
    </li>`;
    }
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

        // commentos.push({
        //   name: addFormName.value
        //     .replaceAll('<', '&lt')
        //     .replaceAll('>', '&gt'),
        //   data: currentDate.toLocaleDateString() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes(),
        //   text: addFormText.value
        //     .replaceAll('<', '&lt')
        //     .replaceAll('>', '&gt')
        //     .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        //     .replaceAll("QUOTE_END", "</div>"),
        //   likesNum: 0,
        // });

        fetch("https://webdev-hw-api.vercel.app/api/v1/NSchenikov/comments", {
          method: "POST",
          body: JSON.stringify({
            author: {name: addFormName.value},
            text: addFormText.value,
            date: new Date().toISOString()
          })
        }).then((response) => {
          response.json().then((responseData) => {
            commentos = responseData.comments;
            renderComments();
          });
        });

        fetchGet();

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



