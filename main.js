import * as api from './api.js';
import * as render from './render.js';
import * as time from './date.js';
import * as startPage from './renderStart.js';

let isLoadingAllComments;
let isLoading;
let userComment = [];

function apiGetStartPage() {
    api.getFetch()
    .then((responseData) => {
        userComment = responseData.comments.map((comment) => {
            let date = new Date(comment.date);
            date = time.formatCommentDate(date);
            return {
                id: comment.id,
                name: comment.author.name,
                date: date,
                comment: comment.text,
                likes: comment.likes,
                isLike: true,
                isEdit: false,
            };
        })
        startPage.renderStartPage({userComment, addComment});
    })
            .catch((error) => {
                api.catchFetch(error);
            })
};

apiGetStartPage();

function apiGet() {
    isLoadingAllComments = true;
    render.renderUserComments({userComment, isLoading, addComment});
    api.getFetch()
    .then((responseData) => {
        isLoading = false;
        isLoadingAllComments = false;
        userComment = responseData.comments.map((comment) => {
            let date = new Date(comment.date);
            date = time.formatCommentDate(date);
            return {
                id: comment.id,
                name: comment.author.name,
                date: date,
                comment: comment.text,
                likes: comment.likes,
                isLike: true,
                isEdit: false,
            };
        })
        render.renderUserComments({userComment, isLoading, addComment});
    })
        .catch((error) => {
            api.catchFetch(error);
        })
};

function addComment() {
    isLoading = true;
    api.postFetch()
    .then(() => {
        render.renderUserComments({userComment, isLoading, addComment,});
        return apiGet();
    })
        .catch((error) => {
            api.catchFetch(error);
        });
}