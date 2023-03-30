
const buttonInputElement = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const commentInputElement = document.querySelector('.add-form-text');
const listElement = document.querySelector('.comments');
buttonInputElement.disabled = true;

const сomments = [
  {
  name : 'Глеб Фокин',
  time : '12.02.23 12:18',
  text : 'Это будет первый комментарий на этой странице',
  'likes-counter' : 3, 
  'likes-class' : '',
  },

{
  name : 'Варвара Н.',
  time : '13.02.22 19:22',
  text : 'Мне нравится как оформлена эта страница! ❤',
  'likes-counter' : 75, 
  'likes-class' : '-active-like',

},
  ];

function renderComment() {
const listElement = document.querySelector('.comments');
  

listElement.innerHTML = сomments.map((el,index)=> el=`
      <li class="comment" data-index='${index}'>
        <div class="comment-header">
          <div class="comment-author">${el.name}</div>
          <div class="comment-time">${el.time}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${el.text}</div>
        </div>
        <div class="comment-footer">    
          <div class="likes">
            <span class="likes-counter">${el['likes-counter']}</span>
            <button class="like-button ${el['likes-class']}"></button>
          </div>
        </div>
      </li>`).join('');

  likes();

  editComment();
        
}

renderComment();

function checkValue() {
  if( nameInputElement.value != '' && commentInputElement.value != '') buttonInputElement.disabled = false; 
}

checkValue();

buttonInputElement.addEventListener('click',() => {
  if(nameInputElement.value == '' || commentInputElement.value == '') return;

nameInputElement.value = nameInputElement.value.replaceAll("&", "&amp;")
                                               .replaceAll("<", "&lt;")
                                               .replaceAll(">", "&gt;");
        
commentInputElement.value = commentInputElement.value.replaceAll("&", "&amp;")
                                                     .replaceAll("<", "&lt;")
                                                     .replaceAll(">", "&gt;")
                                                     .replaceAll('◄', '<div class ="quote">')
                                                     .replaceAll('►', '</div><br>');
      
сomments.push({name : nameInputElement.value,
                      time : myDate(),
                      text : commentInputElement.value,
                      'likes-counter' : 0, 
                      'likes-class' : '',
  });

  renderComment();
  nameInputElement.value = '';
  commentInputElement.value = '';
  buttonInputElement.disabled = true;
});

function myDate () {
    let date = new Date();
    let monthArray=['01','02','03','04','05','06','07','08','09','10','11','12'];
    let myMinutes = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
    let myHours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
    let myDay = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
    let myMonth = monthArray[+date.getMonth()];
    let myYear = String( date.getFullYear() ).slice(2);
    let str= myDay + '.' + myMonth + '.' + myYear + ' ' + myHours + ':' + myMinutes;
    return str;
}

  function likes(){
 
    const listItems = listElement.querySelectorAll('.comment');

      for(let key of listItems) {

          const likeButton = key.querySelector('.like-button');
          const likeCounter = key.querySelector('.likes-counter');
         
          likeButton.addEventListener('click',(event) => {
           
          event.stopPropagation();  
          likeButton.classList.toggle('-active-like');
          likeButton.classList.contains('-active-like') ? likeCounter.innerHTML++ : likeCounter.innerHTML--;

          })
      }
  }

      function editComment(){

        const listItems = listElement.querySelectorAll('.comment');

        for(let key of listItems) { 

          key.addEventListener('click',() => {

            let author = key.querySelector('.comment-author');
            let text = key.querySelector('.comment-text');
            commentInputElement.value = `◄ ${author.textContent} ${text.textContent} ►`;
                        
          }); 
        }
      }