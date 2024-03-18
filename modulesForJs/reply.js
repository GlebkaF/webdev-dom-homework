// Ответ по клику на коммент 

export function reply({comments}) {

    const commentElements = document.querySelectorAll('.comment-body');
    const formTextElement = document.querySelector('.add-form-text');

    commentElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            formTextElement.value = `> ${comments[index].name} \n ${comments[index].comment}`;
        });
    });
};