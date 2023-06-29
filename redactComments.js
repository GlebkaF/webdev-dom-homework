
const redactComments = (commentsElements) => {
    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            console.log(comments[index].text);
            comentInputElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`;

        })
    }
}
//export {redactComments};