import { getAndRenderCommentList, inputsBox, linkRow, nameInput } from "../app.js"

// в зависимости от isLogin меняем отображение элементов
export const renderApp = (boolean, func) => {
    inputsBox.classList.add('hidden')
    if (boolean) {
        inputsBox.classList.remove('hidden')
        func() 
    } else {
        inputsBox.classList.add('hidden')
        linkRow.classList.remove('hidden')
        nameInput.setAttribute("readonly", "readonly")
        func()
    }
}
