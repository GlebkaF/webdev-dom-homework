function letDisabledButton(expectedValue) {
  const commentButton = document.getElementById('buttonComment');   //кнопка для отправки коммента
  if (expectedValue === '') {
      commentButton.disabled = true;
      commentButton.classList.add('add-form-button_disable')
  } else {
      commentButton.disabled = false;
      commentButton.classList.remove('add-form-button_disable')
  }
};

//Очистка формы

function letClearForm(form) {
  form.classList.remove('error');
};

export {letDisabledButton, letClearForm}