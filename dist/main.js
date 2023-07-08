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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\n\r\n    const buttonElement = document.getElementById('add-button');\r\n    const addingAComment = document.getElementById('adding');\r\n    const commentsLoader = document.getElementById('loader');\r\n    const nameElement = document.getElementById('name');\r\n    const commentsElement = document.getElementById('comments');\r\n    const linkButtonElement = document.getElementById('link-button');\r\n    const commentEntrance = document.getElementById('entrance');\r\n    let auth = document.getElementById('auth');\r\n    let registrationElement = document.getElementById('form-registration');\r\n    let registrationButton = document.getElementById('registration-button');\r\n    let entranceElement = document.getElementById('form-entrance');\r\n    let button = document.getElementById('button');\r\n    let exitButton = document.getElementById('exit-button');\r\n    let buttonButton = document.getElementById('button-button');\r\n\r\n\r\n\r\n    \r\n\r\n    let commentList = []\r\n   \r\n    addingAComment.classList.add(\"_hidden\");\r\n\r\n\r\n    console.log(commentsLoader);\r\n    commentsLoader.classList.add(\"_hidden\");\r\n   \r\n    buttonElement.addEventListener(\"click\", () => {\r\n    \r\n      if (commentsElement.value === \"\"){\r\n        alert(\"Пожалуйста введите коментарий!\");\r\n        return;\r\n      };\r\n      addingAComment.classList.add(\"_hidden\");\r\n      commentsLoader.classList.remove(\"_hidden\");\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    });\r\n\r\nlinkButtonElement.addEventListener(\"click\", () =>{\r\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n  registrationElement = document.getElementById('form-registration');\r\n  button = document.getElementById('button');\r\n  exitButton = document.getElementById('exit-button');\r\n  buttonButton = document.getElementById('button-button');\r\n  buttonButton.addEventListener(\"click\", (user) => {\r\n    const loginValue = document.getElementById('login').value;\r\n    const passwordValue = document.getElementById('password').value;\r\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(loginValue, passwordValue).then((user) => {\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(`Bearer ${user.user.token}`);\r\n      auth = document.getElementById('auth');\r\n      auth.classList.add(\"_hidden\");\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n      addingAComment.classList.remove(\"_hidden\");\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    });\r\n  })\r\n\r\n  registrationButton = document.getElementById('registration-button')\r\n  registrationButton.addEventListener(\"click\", () => {\r\n    registrationElement.classList.remove(\"_hidden\");\r\n    entranceElement = document.getElementById('form-entrance');\r\n    entranceElement.classList.add(\"_hidden\");\r\n    buttonButton = document.getElementById('button-button');\r\n    buttonButton.classList.add(\"_hidden\");\r\n    button = document.getElementById('button');\r\n    button.classList.remove(\"_hidden\");\r\n    exitButton = document.getElementById('exit-button');\r\n    exitButton.classList.remove(\"_hidden\");\r\n    registrationButton = document.getElementById('registration-button');\r\n    registrationButton.classList.add(\"_hidden\");\r\n    exitButton = document.getElementById('exit-button');\r\n\r\n    button.addEventListener(\"click\", () => {\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n      addingAComment.classList.remove(\"_hidden\");\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    });\r\n\r\n    exitButton.addEventListener(\"click\", () => {\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n      registrationElement = document.getElementById('form-registration');\r\n      button = document.getElementById('button');\r\n      exitButton = document.getElementById('exit-button');\r\n      registrationButton = document.getElementById('registration-button');\r\n      commentEntrance.classList.add(\"_hidden\");\r\n      registrationElement.classList.add(\"_hidden\");\r\n      button.classList.add(\"_hidden\");\r\n      exitButton.classList.add(\"_hidden\");\r\n    })\r\n  })\r\n  commentEntrance.classList.add(\"_hidden\");\r\n  registrationElement.classList.add(\"_hidden\");\r\n  button.classList.add(\"_hidden\");\r\n  exitButton.classList.add(\"_hidden\");\r\n });\r\n \r\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n  Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './api.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n\r\n  \r\n\r\n    \r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;