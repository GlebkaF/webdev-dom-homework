const comments = [
    {
        name: 'Глеб Фокин',
        date: "12.02.22 12:18",
        comment: 'Это будет первый комментарий на этой странице',
        likes: 3
    },
    {
        name: 'Варвара Н',
        date: "13.02.22 19:22",
        comment: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75

    }
];
const listElement = document.getElementById("list");
const nameElement = document.querySelector('.add-form-name');
const textElement = document.querySelector('.add-form-text');
const buttonElement = document.querySelector('.add-form-button');

function renderElements (){
    const g = comments.map((element)=>{
        return `<li class="comment">
        <div class="comment-header">
          <div>${element.name}</div>
          <div>${element.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${element.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">3</span>
            <button class="like-button"></button>
          </div>
        </div>
      </li>`
      
    });
    console.log(g);
}
renderElements();
