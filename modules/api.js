import { formatDateTime, endcodeSpecialSymbols } from "./utils.format.js";
import { delay } from './utils.promise.js';


const API_URL = 'https://wedev-api.sky.pro/api/v2/pogozhiyag/comments';
const API_USER_URL = 'https://wedev-api.sky.pro/api/user';

export let user = localStorage.user ? JSON.parse(localStorage.user) : null; 

export const setUser = value => {
    user = value;
    if(user){
        localStorage.user = JSON.stringify(user);
    }else{
        delete localStorage.user;
    }
}

export const signOut = () => setUser(null);


const getAuthHeader = () => {
    if(user){
        return {
            Authorization: `Bearer ${user.token}`
        };
    }
    return {};
}

export const loadCommentsData = () => 
    fetch(API_URL, {
        headers: getAuthHeader()
    })
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
        headers: getAuthHeader(),
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



export const login = (login, password) => 
    fetch(API_USER_URL + '/login', {
        method: 'POST',
        body: JSON.stringify({login, password})
    })
    .then(async r => {
        if(r.ok){
            const j = await r.json();
            setUser(j.user);
        } else if (r.status === 400){
            throw new Error("Неправильный логин или пароль");
        }
    });



export const register = (name, login, password) => 
    fetch(API_USER_URL, {
        method: 'POST',
        body: JSON.stringify({name, login, password})
    })
    .then(async r => {
        if(r.ok){
            const j = await r.json();
            setUser(j.user);
        }
    });

