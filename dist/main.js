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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   appComments: () => (/* binding */ appComments),\n/* harmony export */   getCommentsFromAPI: () => (/* binding */ getCommentsFromAPI),\n/* harmony export */   sendCommentToServer: () => (/* binding */ sendCommentToServer)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _rendering_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering.js */ \"./rendering.js\");\n\n\n\nlet appComments = [];\n\n\nfunction getCommentsFromAPI() {\n  return fetch('https://webdev-hw-api.vercel.app/api/v1/andrey-zibin/comments', {\n    method: 'GET',\n  })\n    .then((response) => response.json())\n    .then((responseData) => {\n      appComments = responseData.comments.map((comment) => {\n        return {\n          name: comment.author.name,\n          dates: new Date(comment.date),\n          text: comment.text,\n          like: comment.likes,\n          Iliked: false,\n        };\n      });\n      _main_js__WEBPACK_IMPORTED_MODULE_0__.loading.style.display = 'none'\n      ;(0,_rendering_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n    });\n}\n\ngetCommentsFromAPI()\n\n// Отправка комментария\nfunction sendCommentToServer(comment, addForm, loading, userName, textComment, button, appComments) {\n\n  if (addForm) {\n    addForm.style.display = 'none';\n    loading.style.display = 'block';\n  }\n\n  const userNameValue = userName.value;\n  const textCommentValue = textComment.value;\n\n  return fetch('https://webdev-hw-api.vercel.app/api/v1/andrey-zibin/comments', {\n    method: 'POST',\n    body: JSON.stringify(comment),\n  })\n    .then((response) => {\n      if (!response.ok) {\n        if (response.status === 500) {\n          throw new Error('Server Error');\n        }\n        throw new Error('Ошибка сервера: ' + response.status);\n      }\n      return response.json();\n    })\n\n    .then((responseData) => {\n      if (addForm) {\n        addForm.style.display = 'block';\n        loading.style.display = 'none';\n      }\n\n      console.log('Комментарий успешно отправлен на сервер:', responseData);\n      appComments.push(responseData);\n\n      getCommentsFromAPI();\n      (0,_rendering_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n\n      textComment.value = '';\n      userName.value = '';\n      button.setAttribute('disabled', '');\n    })\n    .catch((error) => {\n      console.error('Ошибка при отправке комментария на сервер:', error);\n      if (comment.name.length < 3 || comment.text.length < 3) {\n        alert('Введите не менее 3 символов');\n      } else if (error.message === 'Server Error') {\n        alert('Сервер сломался, попробуйте позже');\n      } else {\n        alert('Кажется, у вас сломался интернет, попробуйте позже');\n      }\n      userName.value = userNameValue;\n      textComment.value = textCommentValue;\n      addForm.style.display = 'block';\n      loading.style.display = 'none';\n    });\n}\n\n\n\n\n\n\n//# sourceURL=webpack://format-date/./api.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCommentListener: () => (/* binding */ addCommentListener),\n/* harmony export */   addForm: () => (/* binding */ addForm),\n/* harmony export */   button: () => (/* binding */ button),\n/* harmony export */   commentList: () => (/* binding */ commentList),\n/* harmony export */   initLikeClick: () => (/* binding */ initLikeClick),\n/* harmony export */   loading: () => (/* binding */ loading),\n/* harmony export */   textComment: () => (/* binding */ textComment),\n/* harmony export */   userName: () => (/* binding */ userName)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _rendering_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering.js */ \"./rendering.js\");\n\n\n\nconst loading = document.querySelector('.loading');\nconst commentList = document.querySelector('.comments');\nconst addForm = document.querySelector('.add-form');\nconst userName = document.querySelector('.add-form-name');\nconst textComment = document.querySelector('.add-form-text');\nconst button = document.querySelector('.add-form-button');\n\n\n// Добавляем лайк\nconst addLikes = (e) => {\n  const comment = _api_js__WEBPACK_IMPORTED_MODULE_0__.appComments[e.target.dataset.id];\n  comment.like++;\n  comment.Iliked = true;\n};\n\n// Удаляем лайк\nconst delLikes = (e) => {\n  const comment = _api_js__WEBPACK_IMPORTED_MODULE_0__.appComments[e.target.dataset.id];\n  comment.like--;\n  comment.Iliked = false;\n};\n\n// Функция проверки был ли поставлен лайк\nconst initLikeClick = () => {\n  const likeClickElements = document.querySelectorAll('.likes');\n  for (const likeClickElement of likeClickElements) {\n    likeClickElement.addEventListener('click', (e) => {\n      e.stopPropagation();\n      const comment = _api_js__WEBPACK_IMPORTED_MODULE_0__.appComments[e.target.dataset.id];\n      if (comment.Iliked) {\n        delLikes(e);\n      } else {\n        addLikes(e);\n      }\n      (0,_rendering_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n    });\n  }\n};\n\n(0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsFromAPI)()\n\n\n\n\n// Добавление комментария\nconst addComment = (userName, textComment) => {\n  const date = new Date();\n\n  if (validate()) {\n    const day = ('0' + date.getDate()).slice(-2);\n    const month = ('0' + (date.getMonth() + 1)).slice(-2);\n    const year = date.getFullYear().toString().slice(-2);\n    const hours = ('0' + date.getHours()).slice(-2);\n    const minutes = ('0' + date.getMinutes()).slice(-2);\n    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;\n\n    const newComment = {\n      name: userName.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),\n      date: formattedDate,\n      text: textComment.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),\n      like: 0,\n    };\n\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.sendCommentToServer)(newComment, addForm, loading, userName, textComment, button, _api_js__WEBPACK_IMPORTED_MODULE_0__.appComments); // Отправка комментария на сервер\n    (0,_rendering_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n    textComment.value = '';\n    userName.value = '';\n    button.setAttribute('disabled', '');\n  }\n};\n\n// Проверка форм на введенные данные\nconst validate = () => {\n  const userNameValue = userName.value.trim();\n  const textCommentValue = textComment.value.trim();\n\n  const isUserNameValid = userNameValue.length >= 3;\n  const isTextCommentValid = textCommentValue.length >= 3;\n\n  userName.classList.toggle('error', !isUserNameValid);\n  textComment.classList.toggle('error', !isTextCommentValid);\n\n  if (!isUserNameValid) {\n    if (userNameValue === 'Напишите не менее 3 символов') {\n      userName.placeholder = 'Напишите не менее 3 символов';\n    } else {\n      userName.placeholder = 'Напишите не менее 3 символов';\n      console.log('Напишите не менее 3 символов (Имя)');\n    }\n  }\n\n  if (!isTextCommentValid) {\n    if (textCommentValue === 'Напишите не менее 3 символов') {\n      textComment.placeholder = 'Напишите не менее 3 символов';\n    } else {\n      textComment.placeholder = 'Напишите не менее 3 символов';\n      console.log('Напишите не менее 3 символов (Текст комментария)');\n    }\n  }\n\n  if (!isUserNameValid || !isTextCommentValid) {\n    alert('Введите не менее 3 символов');\n    return false; // Добавляем эту строку, чтобы прервать выполнение функции\n  }\n\n  return true;\n};\n\n// Слушаем кнопку и добавляем комментарий\nbutton.addEventListener('click', (event) => {\n  addComment(userName, textComment);\n});\n\n// Слушаем ввод в поле и добавляем комментарий\naddForm.addEventListener('input', (event) => {\n  if (validate) {\n    button.removeAttribute('disabled');\n    button.classList.remove('add-form-button-disabled');\n  }\n});\n\n// Слушаем нажатие Enter\naddForm.addEventListener('keydown', (event) => {\n  if (event.ctrlKey && event.key === 'Enter') {\n    event.preventDefault();\n    addComment();\n  }\n});\n\n(0,_rendering_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)();\n\n// Функция добавляет ответ на комментарий\nfunction addCommentListener() {\n  const comments = document.querySelectorAll('.comment');\n  comments.forEach((comment) => {\n    comment.addEventListener('click', () => {\n      const answer = comment.querySelector('.comment-body').textContent;\n      const nameUser = comment.querySelector('.comment-name').textContent;\n      textComment.value = `>${answer}${nameUser}.,`;\n    });\n  });\n}\n\n\n//# sourceURL=webpack://format-date/./main.js?");

/***/ }),

/***/ "./rendering.js":
/*!**********************!*\
  !*** ./rendering.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\n\nfunction renderComments() {\n  const commentHtmlResult = _api_js__WEBPACK_IMPORTED_MODULE_1__.appComments\n    .map((comment, id) => {\n      let Iliked = '';\n      let dates = '';\n\n      if (comment.Iliked) {\n        Iliked = '-active-like';\n      }\n\n      if (comment.date) {\n        dates = comment.date;\n      } else {\n        const date = new Date();\n        const day = ('0' + date.getDate()).slice(-2);\n        const month = ('0' + (date.getMonth() + 1)).slice(-2);\n        const year = date.getFullYear().toString().slice(-2);\n        const hours = ('0' + date.getHours()).slice(-2);\n        const minutes = ('0' + date.getMinutes()).slice(-2);\n        dates = `${day}.${month}.${year} ${hours}:${minutes}`;\n      }\n\n      return `<li class=\"comment\" data-id=\"${id}\">\n        <div class=\"comment-header\">\n          <div class=\"comment-name\">${comment.name}</div>\n          <div>${dates}</div>\n        </div>\n        <div class=\"comment-body\">\n          <div class=\"comment-text\">${comment.text}</div>\n        </div>\n        <div class=\"comment-footer\">\n          <div class=\"likes\">\n            <span class=\"likes-counter\">${comment.like}</span>\n            <button class=\"like-button ${Iliked}\" data-id=\"${id}\"></button>\n          </div>\n        </div>\n      </li>`;\n    })\n    .join('');\n\n  _main_js__WEBPACK_IMPORTED_MODULE_0__.commentList.innerHTML = commentHtmlResult;\n  (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.initLikeClick)();\n  (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.addCommentListener)();\n}\n\n//# sourceURL=webpack://format-date/./rendering.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;