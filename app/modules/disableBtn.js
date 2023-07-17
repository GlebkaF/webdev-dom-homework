export function disableBtn(nameInput, commentInput, addButton) {
    if (!nameInput.value == '' && !commentInput.value == '') {
        addButton.classList.remove('add-form-button_disable')
    } else {
        addButton.classList.add('add-form-button_disable')
    }
}