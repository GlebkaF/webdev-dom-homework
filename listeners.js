const commentClickListener = () => {
  
    const boxOfCommentsTexts = boxOfComments.querySelectorAll('.comment')
  
    for (const comment of boxOfCommentsTexts) {
      comment.addEventListener('click', () => {
        newComment.setAttribute('style', 'white-space: pre-line;');
        const replace = `${usersComments[comment.dataset.id].comment} \r\n \r\n ${usersComments[comment.dataset.id].name}`
        newComment.value = `| ${replace} \r\n\|`
      })
    }
}

const initEventListeners = () => {

const likeButtons = document.querySelectorAll('.likes');
  
  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (e) => {
      (usersComments[e.target.dataset.id].Iliked) ? delLikes(e) : addLikes(e);
    renderComments();
    e.stopPropagation()
    })
    
  }
}

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
    usersComments.pop()
})
