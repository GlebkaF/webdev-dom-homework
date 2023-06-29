const butttonWriteElement = document.getElementById('add-form-button');
const commentsLinkElement = document.getElementById('comments');
const commentNameElevent = document.getElementById('add-form-name');
const commentTextElement = document.getElementById('add-form-text');
const commentLikeCounterElements = document.querySelectorAll('.likes-counter');
const likebuttonElements = document.querySelectorAll('.like-button');



const comments =[
    {
        name:'Глеб Фокин ',
        data: `12.02.22 12:18`,
        comment: 'Это будет первый комментарий на этой странице',
        likesNum: '3',
        isLike: false,
        },
        {
        name:'Варвара Н.',
        data: `13.02.22 19:22`,
        comment: 'Мне нравится как оформлена эта страница! ❤',
        likesNum: '75',
        isLike: false,
        } 
    
];
// счетчик лайков
const calculLikeSum = () => {
  const likebuttons = document.querySelectorAll('.like-button');
     
  for (const likebutton of likebuttons){
       likebutton.addEventListener('click', () => { 
       
         const el =  likebutton.dataset.el;  

        if(!comments[el].isLike){  
          comments[el].likesNum ++;
          comments[el].isLike = true;  
        } else {
          comments[el].likesNum --;
          comments[el].isLike = false;
        }
     renderComments()
       });  
   }; 
};

// не активная кнопка
const ButtonEctiv = () => {
 if (commentNameElevent.value && commentTextElement.value){
  butttonWriteElement.disabled = false;
 } else {
  butttonWriteElement.disabled = true;
 };
 };

// ответ на комметарий
   
const answerComment = () => {
  const textComments = document.querySelectorAll('.comment-body')
    for (const textComment of textComments){
    textComment.addEventListener('click', () => {
      const el = textComment.dataset.el;
      commentTextElement.value = `${'>' + ' ' + comments[el].comment + '  ' + comments[el].name + ':' + '  '}`;
     
    }) 
  }
}

// enter вместо клика
document.addEventListener('keyup', (e) => {
  if ( e.key === 'Enter');  
  butttonWriteElement.click();
}) 

const renderComments = () => {
    const commentsHtml = comments.map((comment, el) => {
        return `<li id="comment" class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.data}</div>
        </div>
        <div data-el="${el}" class="comment-body" >
          <div   class="comment-text"  type ="form">
           ${comment.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span   class="likes-counter">${comment.likesNum}</span>
            <button  data-el="${el}" class="like-button ${comment.isLike ? "-active-like" : ""}"></button>
          </div>
        </div>
      </li>`
    }).join('');

    commentsLinkElement.innerHTML = commentsHtml;
    calculLikeSum();
    answerComment();
    ButtonEctiv();
  
};

renderComments();

butttonWriteElement.addEventListener('click', () => {
   
   comments.push({
    name:commentNameElevent.value
    .replace('<', '&lt')
    .replace('>', '&gt'),
        data: new Date().toLocaleDateString().slice(0, -2) + ' ' + new Date().toLocaleTimeString().slice(0, -3),
        comment: commentTextElement.value,
        likesNum: 0,
        isLike: false,
   })
//    commentsLinkElement.innerHTML = commentsLinkElement.innerHTML + `<li id="comment" class="comment">
//             <div class="comment-header">
//             <div>${commentNameElevent.value}</div>
//             <div>${new Date().toLocaleDateString().slice(0, -2) + ' ' + new Date().toLocaleTimeString().slice(0, -3)}</div>
//             </div>
//             <div class="comment-body">
//             <div class="comment-text">
//             ${commentTextElement.value}
//             </div>
//             </div>
//             <div class="comment-footer">
//             <div class="likes">
//                 <span class="likes-counter">0</span>
//                 <button  class="like-button"></button>
//             </div>
//             </div>
//         </li>
//         `



// colorLikeSum();
butttonWriteElement.disabled = true;

renderComments();


  commentNameElevent.value = '';
  commentTextElement.value = '';
});

commentNameElevent.addEventListener('input', ButtonEctiv);
commentTextElement.addEventListener('input', ButtonEctiv);