import {renderComments} from './render.js'

export const convertServer = (response, commentArray) => {
    response.json().then((responseData) => {
        commentArray = responseData.comments; 
        commentArray = commentArray.map((item) => {
        return {
          name: item.author.name, 
          date: new Date(item.date),
          text: item.text,
          likes: item.likes,
          isActiveLike: item.isLiked,
          id: item.id,
        }
      })
      renderComments(commentArray);
    })
  }