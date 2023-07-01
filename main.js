
"use strict";

import { takeDate } from "./date.js";
import { fetchGet } from "./api.js";
import renderAPP from "./render.js";
import { getListComments } from "./listComments.js";




//  Поиск элментов


let comments = [];

export let token ="Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
token = null;

export function getArr() {
    return fetchGet()
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    eachDate: takeDate(new Date(comment.date)),
                    like: comment.likes,
                    currentLike: false,
                    classLike: 'like-button -no-active-like',
                    isEdit: false,
                }
            });
            comments = appComments;
            return renderAPP (getListComments, comments);
        })
        .then(() => {
            document.body.classList.add('loaded');
        })
        .catch((error) => {

            if (error.message === "Сервер сломался") {
              alert("Сервер сломался, попробуйте позже");
              getArr();
            } else if (error.message === "Нет авторизации") {          
                console.log(error);
              } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
                console.log(error);
              }
          });

};

getArr();


console.log("It works!");
