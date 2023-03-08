const buttonElement = document.querySelector('button.add-form-button');
// console.log(document.querySelector('button.add-form-button'))
const listElement = document.querySelector('.comments');
// console.log(document.querySelector('.comments'));
const inputNameElement = document.querySelector('.add-form-name');
// console.log(document.querySelector('.add-form-name'));
const textareaElement = document.querySelector('.add-form-text');
// console.log(document.querySelector('.add-form-text'));
// console.log(listElement.innerHTML);

const myDate = new Date();
let options = { 
    year: "2-digit", 
    month: "2-digit", 
    day: "2-digit", 
    timezone: "UTC",
    hour: "numeric", 
    minute: "2-digit" 
}; 

options.hour = "2-digit"; 
let shortStyleRu = myDate.toLocaleDateString("ru-Ru", options).split(', ').join(' '); 

// buttonElement.disabled = true;
// inputNameElement.oninput = () => {
// if(inputNameElement.value === ''){
//     buttonElement.disabled = true;
// } else {
//     buttonElement.disabled = false;
// }
// };

// textareaElement.oninput = () => {
//     textareaElement.value === '' ? buttonElement.disabled = true : buttonElement.disabled = false;
// };

buttonElement.addEventListener('click', () => {
    inputNameElement.classList.remove('error');
    textareaElement.classList.remove('error')
  if(inputNameElement.value === '' || textareaElement.value === '') {
    inputNameElement.classList.add('error');
    textareaElement.classList.add('error');
    return;
  }
  
    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml + 
    `<ul class="comments" id="comments">
    <li class="comment">
    <div class="comment-header">
      <div>${inputNameElement.value}</div>
      <div>${shortStyleRu}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
      ${textareaElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
      </div>
    </div>
    </li>`;

    inputNameElement.value = '';
    textareaElement.value = '';

    // inputNameElement.disabled = true;
    // textareaElement.disabled = true;

});





