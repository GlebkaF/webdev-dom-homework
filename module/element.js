"use strict";

// Получеаем доступ к разметке html в JS

export const elementName = document.getElementById('nameInput');
export const elementComment = document.getElementById('commentInput');
export const listElement = document.getElementById('listComments');
export const buttonElement = document.getElementById('buttonComment');
export const loadingListElement = document.getElementById('loadingList');
;
export const loadingCommentElement = document.getElementById('loadingComment');
export const addFormElement = document.getElementById('addForm');
export let comments = [];

// elementName, elementComment, listElement, buttonElement, loadingListElement, deleteComment, loadingCommentElement,addFormElement, comments 