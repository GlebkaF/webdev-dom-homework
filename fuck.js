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
        like: ''
        },
        {
          name:'Варвара Н.',
        data: `13.02.22 19:22`,
        comment: 'Мне нравится как оформлена эта страница! ❤',
        likesNum: '75',
        like: ''
        },  
    
];

const renderComments = () => {
    const commentsHtml = comments.map((comment, el) => {
        return `<li id="comment" class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.data}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
           ${comment.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span  data-el="${el}" class="likes-counter">${comment.likesNum}</span>
            <button data-el="${el}" class="like-button">${comment.like}</button>
          </div>
        </div>
      </li>`
    }).join('');

    commentsLinkElement.innerHTML = commentsHtml;
};

renderComments();




const colorLikeSum = () => {
    const likebuttonElements = document.querySelectorAll('.like-button');

    for (const likebuttonElement of likebuttonElements){
         likebuttonElement.addEventListener('click', () => {
          likebuttonElement.classList.add('click-btn') 
        
         });
     };           
};
colorLikeSum()

const calculLikeSum = () => {
    const likebuttonElements = document.querySelectorAll('.like-button');
  
    for (const likebuttonElement of likebuttonElements){
         likebuttonElement.addEventListener('click', () => {
            likebuttonElement.classList.add('click-btn') 
          const el =  likebuttonElement.dataset.el;
          console.log(el);
        comments[el].likesNum ++;
       
        renderComments(); 
         });
     };           
};





butttonWriteElement.addEventListener('click', () => {
    commentNameElevent.classList.remove('bord');
    commentTextElement.classList.remove('bord');

    if (commentNameElevent.value === '' || commentTextElement.value === ''){
        commentNameElevent.classList.add('bord');
        commentTextElement.classList.add('bord');
        return;
    
    } 

   comments.push({
    name:commentNameElevent.value,
        data: new Date().toLocaleDateString().slice(0, -2) + ' ' + new Date().toLocaleTimeString().slice(0, -3),
        comment: commentTextElement.value,
        likesNum: '',
        like: ''
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


renderComments();
colorLikeSum();
calculLikeSum()


  commentNameElevent.value = '';
commentTextElement.value = '';
});

