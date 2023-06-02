"use strict";

import { getComments } from "./api.js";
import { renderUsers } from "./render.js";
import { token } from "./render.js"


    let currentDate = new Date();


    const textAreaText = document.getElementById('input-text');
    let quoteText = '';


    export let allUsersAndComments = [];


    export function getUsers({ token }) {
        return getComments({ token }).then((responseData) => {
                        allUsersAndComments = responseData.comments;
                        renderUsers();
                    });
            };




    getUsers({ token });

