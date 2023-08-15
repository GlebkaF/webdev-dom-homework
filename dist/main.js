/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postComments: () => (/* binding */ postComments),\n/* harmony export */   regNewUser: () => (/* binding */ regNewUser),\n/* harmony export */   setToken: () => (/* binding */ setToken),\n/* harmony export */   token: () => (/* binding */ token)\n/* harmony export */ });\nconst commentsUrl = 'https://wedev-api.sky.pro/api/v2/adam-batukaev/comments';\nconst userUrl = 'https://wedev-api.sky.pro/api/user/login';\nconst newUser = 'https://wedev-api.sky.pro/api/user';\n\nlet token;\n\nconst setToken = (newToken) => {\n    token = newToken;\n}\n\n\n\nfunction getComments() {\n    return fetch(commentsUrl, {\n        method: \"GET\",\n    })\n        .then((response) => {\n            return response.json();\n        })\n}\n\n\nfunction postComments(newComment) {\n    return fetch(commentsUrl, {\n        method: \"POST\",\n        body: JSON.stringify(newComment),\n        headers: {\n            Authorization: `Bearer ${token}`,\n        }\n    })\n        .then((response) => {\n            // Code handling errors\n            if (response.status === 201) {\n                return response.json();\n            } else if (response.status === 400) {\n                return Promise.reject(\"Bad request\");\n            } else {\n                return Promise.reject(\"Bad connection\");\n            }\n        })\n}\n\n\nfunction login({ login, password }) {\n    return fetch(userUrl, {\n        method: \"POST\",\n        body: JSON.stringify({\n            login,\n            password,\n        }),\n    }).then((response) => {\n        return response.json();\n    });\n}\n\nfunction regNewUser({ login, name, password }) {\n    return fetch(newUser, {\n        method: \"POST\",\n        body: JSON.stringify({\n            login,\n            name,\n            password,\n        }),\n    }).then((response) => {\n        return response.json();\n    });\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./like.js":
/*!*****************!*\
  !*** ./like.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   likeComment: () => (/* binding */ likeComment)\n/* harmony export */ });\nfunction likeComment(comments, renderComments) {\n    const likeButtonElements = document.querySelectorAll('.like-button');\n\n    for (const likeButtonElement of likeButtonElements) {\n        likeButtonElement.addEventListener('click', (event) => {\n            event.stopPropagation();\n            const index = likeButtonElement.dataset.index;\n\n            if (comments[index].isLiked) {\n                comments[index].isLiked = false;\n                comments[index].likes--;\n            } else {\n                comments[index].isLiked = true;\n                comments[index].likes++;\n            }\n            renderComments();\n        });\n    }\n};\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./like.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _like_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./like.js */ \"./like.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n\n\n\n\nlet comments = [];\n\nconst loadingMessageTop = document.querySelector('.loading-message-top');\nconst loadingMessageBottom = document.querySelector('.loading-message-bottom');\nlet loginLoadingMessage = document.querySelector('.login-loading-message');\nconst addButton = document.querySelector('.add-form-button');\nlet addCommentElement;\n\n\nconst showComments = () => {\n    // Show loading message when fetching comments begins\n\n    loadingMessageTop.style.display = 'block';\n\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)().then((responseData) => {\n        comments = responseData.comments;\n        renderComments();\n    })\n        .then(() => {\n            // Hide loading message when comments are rendered \n            loadingMessageTop.style.display = 'none';\n        });\n};\n\nconst generateHtml = (comments) => {\n    const commentsListHtml = comments.map((comment, index) => {\n        const likeButtonClass = comment.isLiked ? 'like-button liked' : 'like-button';\n        const formattedDate = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'date-fns'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Date(), 'dd/MM/yyyy hh:mm');\n        return `\n    <li class=\"comment\">      \n      <div class=\"comment-header\">        \n        <div class=\"commentator-name\" data-name='${comment.author.name}'>${comment.author.name}</div>\n        <div>${formattedDate}</div>\n      </div>\n      <div class=\"comment-body\">\n        <div class=\"comment-text\" data-text=\"${comment.text}\">${comment.text}</div>\n      </div>\n      <div class=\"comment-footer\">\n        <div class=\"likes\">\n          <span class=\"likes-counter\">${comment.likes}</span>\n          <button class=\"${likeButtonClass}\" data-index=\"${index}\"></button>\n        </div>\n      </div>\n    </li>\n    `;\n\n    }).join('');\n    return commentsListHtml;\n};\n\nconst renderComments = () => {\n    const commentsList = document.querySelector('.comments');\n    commentsList.innerHTML = generateHtml(comments);\n\n    const commentElements = document.querySelectorAll('.comment');\n\n    for (const commentElement of commentElements) {\n        const commentTextElement = commentElement.querySelector('.comment-text');\n        const commentatorNameElement = commentElement.querySelector('.commentator-name');\n\n        commentElement.addEventListener('click', () => {\n            const comment = commentTextElement.dataset.text;\n            const name = commentatorNameElement.dataset.name;\n\n            document.querySelector('.add-form-text').value = `${comment}\\n> ${name}`;\n        });\n    }\n\n    (0,_like_js__WEBPACK_IMPORTED_MODULE_1__.likeComment)(comments, renderComments);\n};\n\n\nconst addComment = () => {\n    const name = document.querySelector('.add-form-name').value;\n    const comment = document.querySelector('.add-form-text').value;\n\n    if (name === '' || comment === '') {\n        return; // Validation failed, do not add the comment\n    }\n\n    // Show loading message when adding comment begins\n    loadingMessageBottom.style.display = 'block';\n\n    addCommentElement = document.querySelector('.add-form');\n    addCommentElement.style.display = 'none';\n\n    const newComment = {\n        text: comment.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),\n        name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),\n        forceError: false\n    };\n\n    // POST the new comment to the server\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postComments)(newComment).then(() => (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)())\n        .then((responseData) => {\n            comments = responseData.comments;\n            renderComments();\n        })\n        .then(clearFields)\n        .catch(catchErrors)\n};\n\naddButton.addEventListener('click', addComment);\n\nconst catchErrors = (error) => {\n    loadingMessageBottom.style.display = 'none';\n    addCommentElement.style.display = 'flex';\n    if (error === \"Bad request\") {\n        alert('Сообщение не может быть короче трех символов')\n    } else {\n        alert(\"Проверьте подключение к сети Интернет\");\n    }\n\n    //TODO Caught Errors \n    console.warn(error);\n}\n\nconst clearFields = () => {\n    // Clear input\n    document.querySelector('.add-form-name').value = '';\n    document.querySelector('.add-form-text').value = '';\n    // Hide loading message when comments are rendered \n    loadingMessageBottom.style.display = 'none';\n    addCommentElement.style.display = 'flex';\n}\n\n// Fetch initial comments from the server\nshowComments();\n// showLoginElement();\n\n\n// Set up event listeners\n\n\ndocument.addEventListener('click', (event) => {\n    const target = event.target;\n\n    if (target.classList.contains('register')) {\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_2__.renderRegistration)();\n    }\n\n    if (target.classList.contains('enter')) {\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)();\n    }\n\n    if (target.classList.contains('login')) {\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin)();\n    }\n});\n\nloginLoadingMessage.addEventListener('click', () => {\n    loginLoadingMessage.style.display = 'none';\n});\n\n\n\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./renderLogin.js":
/*!************************!*\
  !*** ./renderLogin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin),\n/* harmony export */   renderRegistration: () => (/* binding */ renderRegistration)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\n\n// renderLogin.js\n\nconst attachRegisterEventListener = () => {\n  const newUserName = document.getElementById(\"register-name\");\n  const newUserLogin = document.getElementById(\"register-login\");\n  const newUserPassword = document.getElementById(\"register-password\");\n  const registerNewUser = document.getElementById(\"register-new-user\");\n\n  registerNewUser.addEventListener('click', () => {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.regNewUser)({\n      login: newUserLogin.value,\n      name: newUserName.value,\n      password: newUserPassword.value,\n    }).then((responseData) => {\n\n      console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\n      console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n    });\n\n    const showCommentsInput = document.querySelector('.add-form');\n    const hideRegistrationForm = document.querySelector(\".register-form\");\n    showCommentsInput.style.display = 'flex';\n    hideRegistrationForm.style.display = 'none';\n\n\n    // Set the value of .add-form-name to the user's name\n    const userNameInput = document.querySelector(\".add-form-name\");\n    if (userNameInput) {\n      userNameInput.value = newUserName.value;\n      userNameInput.readOnly = true;\n    }\n  });\n};\n\n\n\nconst appElement = document.getElementById(\"app\");\nconst registrationElement = document.getElementById(\"registration\");\n\nconst attachLoginEventListener = () => {\n  const loginButtonElement = document.getElementById(\"submit-account\");\n  const loginInputElement = document.getElementById(\"login-input\");\n  const passwordInputElement = document.getElementById(\"password-input\");\n\n  loginButtonElement.addEventListener('click', () => {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.login)({\n      login: loginInputElement.value,\n      password: passwordInputElement.value,\n    }).then((responseData) => {\n\n      console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(responseData.user.token);\n      console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n    });\n    const showCommentsInput = document.querySelector('.add-form');\n    const hideLoginForm = document.querySelector(\".login-form\");\n    showCommentsInput.style.display = 'flex';\n    hideLoginForm.style.display = 'none';\n\n\n    // Set the value of .add-form-name to the user's name\n    const userNameInput = document.querySelector(\".add-form-name\");\n    if (userNameInput) {\n      userNameInput.value = loginInputElement.value;\n      userNameInput.readOnly = true;\n    }\n  });\n};\n\nconst renderLogin = () => {\n  const loginHtml = `\n    <div class=\"login-form\" style=\"display: flex;\"> Форма входа\n        <input type=\"text\" class=\"enter-login\" id=\"login-input\" placeholder=\"Логин\" />\n        <input type=\"text\" class=\"enter-password\" id=\"password-input\" placeholder=\"Пароль\" />\n        <div class=\"submit-button\">\n            <button  class=\"submit-account\" id=\"submit-account\">Войти</button>\n        </div>      \n        <a class=\"register\">Зарегистрироваться</a>\n    </div>\n  `;\n\n  appElement.innerHTML = loginHtml;\n  registrationElement.innerHTML = ''; // Clear registration form  \n\n  // Call the function to attach the event listener\n  attachLoginEventListener();\n};\n\n\n// renderLogin.js\n\n\nconst renderRegistration = () => {\n  const registrationFormHtml = `\n        <div class=\"register-form\" style=\"display: flex;\"> Форма регистрации\n            <input type=\"text\" class=\"register-name\" id=\"register-name\" placeholder=\"Введите имя\" />\n            <input type=\"text\" class=\"register-login\" id=\"register-login\" placeholder=\"Введите логин\" />\n            <input type=\"text\" class=\"register-password\" id=\"register-password\" placeholder=\"Введите пароль\" />\n            <div class=\"submit-button\">\n                <button class=\"submit-login_password\" id=\"register-new-user\">Зарегистрироваться</button>\n            </div>\n            <a class=\"enter\">Войти</a>\n        </div>\n    `;\n\n  appElement.innerHTML = ''; // Clear login form\n  registrationElement.innerHTML = registrationFormHtml;\n\n  attachRegisterEventListener();\n}\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./renderLogin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;