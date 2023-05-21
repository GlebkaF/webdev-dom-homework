//обЪявляем переменные
const container = document.querySelector('.container');
const commentList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const userName = document.querySelector('.add-form-name');
const textCommment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const comments = document.querySelectorAll('.comment');
const loader = document.querySelector('.loader');
let answerStatus = '';
//Найдена на просторах инета
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
window.addEventListener('load', () => {
    loader.classList.add('loader_visible');
    loader.classList.remove('loader_hidden');
});
//показывем ошибки
function errorShow(text_error, code) {
    const error_popap = document.querySelector('.error_popap');
    const error_popap__h2 = document.querySelector('.error_popap__h2');
    const error_popap__p = document.querySelector('.error_popap__p');
    error_popap__h2.textContent = `Ошибка ${code}`;
    error_popap__p.textContent = text_error;
    error_popap.classList.remove('error_popap__hide')
    loader.classList.remove('loader_visible');
    loader.classList.add('loader_hidden');
    addForm.style.visibility = "visible";
}
//скрываем ошибки
function errorHide() {
    const error_popap = document.querySelector('.error_popap');
    const error_popap__h2 = document.querySelector('.error_popap__h2');
    const error_popap__p = document.querySelector('.error_popap__p');
    error_popap__h2.textContent = '';
    error_popap__p.textContent = '';
    error_popap.classList.add('error_popap__hide');
}
//функция даты
function dateFormat(date) {
    // const date = new Date();
    (date.getDate() < 10) ? dd = '0' + date.getDate() : dd = date.getDate();
    (date.getMonth() < 10) ? MM = '0' + (date.getMonth() + 1) : MM = (date.getMonth() + 1);
    (date.getFullYear()) ? YY = date.getFullYear().toString().slice(-2) : YY = date.getFullYear().toString().slice(-2);
    (date.getHours() < 10) ? hh = '0' + date.getHours() : hh = date.getHours();
    (date.getMinutes() < 10) ? mm = '0' + date.getMinutes() : mm = date.getMinutes();
    return `${dd}.${MM}.${YY} ${hh}:${mm}`;
}
//Проверка куда кликнул пользователь
container.addEventListener('click', (e) => {
    const target = e.target.classList[0];
    const id = e.target.dataset.id;
    switch (target) {
        case 'like-button': initLikeClick(id);
            e.target.classList.add('-loading-like');
            break;
        case 'del-comment': delClick(id);
            break;
        case 'edit-comment': editClick(id); editValid();
            break;
        case 'edit-form-button': saveEditComment(id);
            break;
        case 'comment-body': quoteComment(id);
            break;
        case 'comment-text': quoteComment(id);
            break;
        case 'quote_title': quoteComment(id);
            break;
        case 'quote': quoteComment(id);
            break;
        case 'comment': quoteComment(id);
            break;
        default: break;
    }
})
let commentsListArray = [

];
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
//все запросы к апи
function fetchRequest(method, datas = null) {

    return fetch("https://webdev-hw-api.vercel.app/api/v1/djon198360/comments",
        {
            method: method,
            body: datas,
        })
        .then((response) => {
            answerStatus = response.status;
            return response.json();

        })

        .then((data) => {
            if (answerStatus === 201) {
                fetchRequest("GET");
                commentsListArray = data.comments
                textCommment.value = "";/// очищаем поле коммента имя не трогаем 
                renderComments();
            }
            else if (answerStatus === 400) {
                
             return   errorShow(data.error, answerStatus);
            }
            else if (answerStatus === 500) {
                
                return   fetchRequest(method, datas);
            }
            else {
                commentsListArray = data.comments
                renderComments();

            }
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                errorShow('Нет соединения с интернетом, жду соединения', 'соединения');
                //другого способа я не придумал
                sleep(5000);
                fetchRequest(method, datas);
                
            }
            else { error }
        });
}
//устанока лайка
const addLikes = (id) => {
    delay(2000).then(() => {
        commentsListArray[id].likes++;
        commentsListArray[id].isLiked = true;
        // const data = JSON.stringify({
        //     id: id,
        //     likes: likes++,
        //     isLiked:  true,
        // });
        // fetchRequest("POST", data);
        renderComments();
    });
}
//удаление лайка
const delLikes = (id) => {
    commentsListArray[id].isLikeLoading = true;
    delay(2000).then(() => {
        commentsListArray[id].likes--;
        commentsListArray[id].isLiked = false;
        // const data = JSON.stringify({
        //     id: id,
        //     likes: likes--,
        //     isLiked:  false,
        // });
        // fetchRequest("POST", data);
        renderComments();
    });
}
//проверка лайкнуто или нет
const initLikeClick = (id) => {
    (commentsListArray[id].isLiked) ? delLikes(id) : addLikes(id);

}
//редактирование 
const editClick = (id) => {
    commentsListArray[id].isEdit = true;
    renderComments();
    const editFormText = document.querySelector('.edit-form-text');
    editFormText.scrollIntoView({ behavior: "smooth" });
}
//сохраняем редактирование
const saveEditComment = (id) => {
    const date = new Date(); // дата
    const editText = document.querySelector('.edit-form-text');
    if (editText.value.length > 10) {
        const data = JSON.stringify({
            id: id,
            name: commentsListArray[id].author.name,
            //  date: dateFormat(),
            text: htmlSpecialChars(editText.value),
            like: 0,
        });
        fetchRequest("POST", data);
    } else {
        editText.classList.add('error');
    }
}
//валидация при редактирование
function editValid() {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');
    editText.addEventListener('input', () => {
        if (editText.value.length > 3) {
            editText.classList.remove('error');
            editButton.removeAttribute('disabled');
        } else {
            editText.classList.add('error');
            editButton.setAttribute('disabled', '');
        }
    });
}
//удаление
const delClick = (id) => {
    commentsListArray.splice(id, 1);
    renderComments();
}
//цитата 
function quoteComment(id) {
    const comment_body = document.querySelectorAll('.comment-text');
    textCommment.scrollIntoView({ behavior: "smooth" });
    const quoteText = `[quote=${commentsListArray[id].author.name}]\n${commentsListArray[id].text}[/quote]\n`;
    textCommment.value += quoteText;
}
//реплайс б кодов
function htmlBbDecode(text, id) {
    return text
        .replaceAll(/\[quote=(.*?)\]/g, `<div class="quote_title" data-id="${id}">Цитата: $1</div><div class="quote" data-id="${id}">`)
        .replaceAll(/\[iframe=(.*?)\]/g, `<iframe src="$1" width="100%" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>`)
        .replaceAll(/\[video=(.*?)\]/g, `<video src="$1" width="100%" height="240" controls>`)
        .replaceAll(/\[img=(.*?)\]/g, `<img src="$1" width="100%" height="240">`)
        .replaceAll(/\[audio=(.*?)\]/g, `<audio src="$1" width="100%" height="240" controls>`)
        .replaceAll(/\[(.*?)\]/g, '<$1>')
        .replaceAll(/\[\/(.*?)\]/g, '</$1>')
}
//реплайс спец символов
function htmlSpecialChars(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}
//рендер
function renderComments() {

    const commentHtmlResult = commentsListArray.map((comment, id) => {
        (comment.isLiked) ? Iliked = '-active-like' : Iliked = '';
        if (comment.isEdit) {
            return `
            <div class="add-form">
                    <textarea
                    type="textarea"
                    class="edit-form-text"
                    rows="4">${comment.text}</textarea>
                    <div class="add-form-row">
                    <button data-id="${id}" class="edit-form-button save_button">Сохранить</button>
                    </div>
                    </div>
                   `
                ;


        } else {

            return `<li class="comment" data-id="${id}">
                    <div class="comment-header">
                    <div>${comment.author.name}</div>      
                    <div>${dateFormat(new Date(comment.date))}</div>   
                    </div>
                    <div class="comment-body" data-id="${id}">
                    <div class="comment-text" data-id="${id}">
                    ${htmlBbDecode(comment.text, id)}
                    </div>
                    </div>
                    <div class="comment-footer">
                    <div class="comment-func">
                        <div><span class="edit-comment" data-id="${id}" title="Редактироать">&#9998;</span></div>
                        <div><span class="del-comment" data-id="${id}" title="Удалить">&#10008;</span></div>
                        </div>
                    
                    <div class="likes">
                        <span class="likes-counter" >${comment.likes}</span>
                        <button class="like-button ${Iliked}" data-id="${id}"></button>
                    </div>
                </div>
                </li>`;
        }
    }).join("");
    loader.classList.remove('loader_visible');
    loader.classList.add('loader_hidden');
    addForm.style.visibility = "visible";
    errorHide();
    commentList.innerHTML = commentHtmlResult;


}
//проверка валидации
function valiate() { //функция валидации простая
    if (userName.value.length < 3) { //если имя === 0
        userName.classList.add('error'); //ставим класс
        return false; //возвращаем false 
    } else { userName.classList.remove('error'); } // иначе удаляем
    if (textCommment.value.length < 3) {// если количество символов коммента менше 10 
        textCommment.classList.add('error'); //ставим класс 
        return false; //возвращаем false
    } else { textCommment.classList.remove('error'); } //иначе удаляе класс

    if (userName.value.length >= 3 && textCommment.value.length >= 3) { //если  оба поля заполнены 
        return true; //возвращаем true
    }
    else {
        return false; //возвращаем false
    }
}
//добавка коммента
function addComment() { //функция  добавления коммента
    const validate = valiate(); //присваиваем переменной результат валидации
    const date = new Date(); // дата
    if (validate) { //если true 

        const data = JSON.stringify({

            name: htmlSpecialChars(userName.value),
            //   date: dateFormat(),
            forceError: true,
            text: htmlSpecialChars(textCommment.value),
            like: 0,
        });
        addForm.style.visibility = "hidden";
        loader.classList.add('loader_visible');
        loader.classList.remove('loader_hidden');
        fetchRequest("POST", data);
    }
}
button.addEventListener('click', (event) => { // если клик по буттон
    addComment();
});
addForm.addEventListener('input', (event) => { //отслеживаем ввод 
    const validate = valiate();
    (validate) ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
});
addForm.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode == 13) { addComment(); } // если нажата Ctrl + Enter
});
if (document.querySelector('.edit-form-text')) {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');
    editText.addEventListener('input', () => {
        if (editText.value.length > 10) {
            editButton.removeAttribute('disabled');
        }
    });
}
const bbCodeButton = document.querySelectorAll('.bb_code_button');
for (let i = 0; i < bbCodeButton.length; i++) {
    const element = bbCodeButton[i];

    element.addEventListener('click', (event) => {
        const bbTag = event.target.dataset.code;
        if (bbTag === 'iframe' || bbTag === 'video' || bbTag === 'img' || bbTag === 'audio') {
            const iframeUrl = prompt(`Вставьте адрес ${bbTag}`);
            if (iframeUrl) { textCommment.value += `[${bbTag}=${iframeUrl}][/${bbTag}]` }
        }
        if (textCommment.selectionStart === textCommment.selectionEnd) {
            return; // ничего не выделено
        }
        let selected = textCommment.value.slice(textCommment.selectionStart, textCommment.selectionEnd);
        textCommment.setRangeText(`[${bbTag}]${selected}[/${bbTag}]`);
    });

}

fetchRequest("GET");