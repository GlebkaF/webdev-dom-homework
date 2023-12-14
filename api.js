import { formatDateTime, endcodeSpecialSymbols } from "./utils.format.js";
import { delay } from './utils.promise.js';


const API_URL = 'https://wedev-api.sky.pro/api/v1/pogozhiyag/comments';


export const loadCommentsData = () => 
    fetch(API_URL)
    .then(response => response.json())
    .then(result => result.comments.map(item => ({
        id: item.id,
        author: item.author.name,
        date: formatDateTime(new Date(item.date)),
        text: item.text,
        isLiked: item.isLiked,
        likesCount: item.likes
    })));



export const postComment = (name, text) => {      
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            text: endcodeSpecialSymbols(text),
            name: endcodeSpecialSymbols(name),
            forceError: true
        })  
    };

    const doPost = () => {
        return fetch(API_URL, requestOptions)
        .then(async response => {
            if(response.status == 500) {
                return delay(200).then(doPost);
            } else if(response.status == 400){
                const responseJson = await response.json();
                return Promise.reject(new Error(responseJson.error));
            }
        });
    };

    return doPost();
};