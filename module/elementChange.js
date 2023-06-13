
//этот файл содержит подпрограммы для изменения внешнего вида элементов

//Расширенная валидация

function letDisabledButton(expectedValue) {
    const buttonElement = document.getElementById('buttonComment')   //кнопка для отправки коммента
    if (expectedValue === '') {
        buttonElement.disabled = true;
        buttonElement.classList.add('add-form-button_disable')
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('add-form-button_disable')
    }
};

//Очистка формы

function letClearForm(form) {
    form.classList.remove('error');
};

export {letDisabledButton, letClearForm}