import {listElement, addForm, commentInputElement, comments} from './constants.js'

export const pageLoaded = () => {
    const loadInfo = "<span>Пожалуйста, подождите, загружаю комментарии...</span>"
    listElement.innerHTML = loadInfo
  } 
  
export const commentSend = () => {
    const loadInfo = "<span>Комментарий добавляется...</span>"
    listElement.innerHTML += loadInfo;
    addForm.style.display = "none"
  } 

export const answerComment = (index) => {
    commentInputElement.value = `> ${comments[index].comment} \n ${comments[index].name},`;
} 