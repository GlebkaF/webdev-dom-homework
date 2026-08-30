import { renderComments } from './renderComments.js';
import { commentsArr, updateCommentsArr } from './commentsArr.js';
import { listEl } from './initListener.js';

export function funcLoadCommentApi() {
    return fetch('https://wedev-api.sky.pro/api/v1/alexey-zyryanov/comments')
        .then((response) => response.json())
        .then((data) => {
            updateCommentsArr(data.comments);
            renderComments(listEl, commentsArr);
        });
}