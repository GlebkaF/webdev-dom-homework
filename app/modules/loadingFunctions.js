export function enableLoadingToNewComment(boolean, loadingCommentsBox, inputsBox) {
    if (boolean) {
      loadingCommentsBox.classList.remove('loading_hidden')
      inputsBox.classList.add('loading_hidden')
    } else {
      loadingCommentsBox.classList.add('loading_hidden')
      inputsBox.classList.remove('loading_hidden')
    }
}

export function enableLoadingToStartApp(boolean, loadingHeadBox) {
    if (boolean) {
      loadingHeadBox.classList.remove('loading_hidden')      
    } else {
      loadingHeadBox.classList.add('loading_hidden')      
    }
}