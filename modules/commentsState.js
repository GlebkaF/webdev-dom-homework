import { loadCommentsData } from "./api.js";

export let comments = [];
export const setComments = (value) => {
    comments = value;    
};

export const reloadComments = () => 
    loadCommentsData()
    .then(data => setComments(data));
