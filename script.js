const buttonElement = document.getElementById('add-button');
const buttonDelElement = document.getElementById('delete-button');
const nameInputElement = document.getElementById("name-input"); 
const textInputElement = document.getElementById("text-input"); 
const listElement = document.getElementById("list"); 

buttonElement.disabled = true;

function checkParams() {

    if (nameInputElement.value.length != 0 && textInputElement.value.length != 0){                            
        buttonElement.style.backgroundColor = '#bcec30';
        buttonElement.disabled = false;
    } else {
        buttonElement.style.backgroundColor = 'gray';
        buttonElement.disabled = true;
        buttonElement.style.opacity = ''
    }
}

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        document.getElementById("add-button").click();
    }
    checkParams() 
})

buttonElement.addEventListener("click", () => {
    
  if(nameInputElement.value === '' || textInputElement.value === '') {
    return;
  }

  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
  };
  let now = new Date().toLocaleString('ru-RU',options);

  const oldListHTML = listElement.innerHTML;
  listElement.innerHTML = oldListHTML + 
  `<li class="comment">
      <div class="comment-header">
        <div>${nameInputElement.value}</div>
        <div>${now.replace(',', ' ')}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${textInputElement.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`

    nameInputElement.value = '';
    textInputElement.value = '';
});

buttonDelElement.addEventListener("click", () => {
    listElement.innerHTML = listElement.innerHTML.substring(0, listElement.innerHTML.lastIndexOf('<li class="comment">'))
})

