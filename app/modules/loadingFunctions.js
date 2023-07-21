export function enableLoadingToNewComment(boolean, loadingCommentsBox, inputsBox) {
    if (boolean) {
      loadingCommentsBox.classList.remove('hidden')
      inputsBox.classList.add('hidden')
    } else {
      loadingCommentsBox.classList.add('hidden')
      inputsBox.classList.remove('hidden')
    }
}

export function enableLoadingToStartApp(boolean, loadingHeadBox) {
    if (boolean) {
      loadingHeadBox.classList.remove('hidden')      
    } else {
      loadingHeadBox.classList.add('hidden')      
    }
}