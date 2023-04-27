const form = document.querySelector('.add-form');
const newName = form.querySelector('.add-form-name');
const newComment = form.querySelector('.add-form-text');
const addButton = form.querySelector('.add-form-button');
const comments = document.querySelector('.comments')
const delButton = form.querySelector('.del-form-button')


newName.addEventListener('input', function () {
    if (newName.value.length < 2 || newComment.value.length < 5) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});
newComment.addEventListener('input', function () {
    if (newName.value.length < 2 || newComment.value.length < 5) {
        addButton.setAttribute('disabled', 'disabled')
    }
    else{
        addButton.removeAttribute('disabled')
    }
});


addButton.addEventListener('click', addNewComment)

function addNewComment() {
    let oldComments = comments.innerHTML
    const dateNow = new Date();
    let newComments = `<li class="comment">
    <div class="comment-header">
      <div>${newName.value}</div>
      <div>${formatDate(dateNow)}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${newComment.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="">0</span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`
    comments.innerHTML = oldComments + newComments
    cleareInputs()
}

function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    let hh = date.getHours() % 100
    if (hh < 10) hh = '0' + hh;

    let mi = date.getMinutes() % 100
    if (mi < 10) mi = '0' + mi;
    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + mi;
}

function cleareInputs () {
    newName.value = ''
    newComment.value = ''
    addButton.setAttribute('disabled', 'disabled')
}

form.addEventListener('keyup', function (event) {
    if (!addButton.attributes.disabled && event.code == 'Enter') {
       addNewComment()
    }
    else{
        return
    }
})

delButton.addEventListener('click', function () {
    comments.removeChild(comments.lastChild)
})