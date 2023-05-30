
function renderMessages(messages,getCommentList,element) {
  const messagesHtml = messages.map((message, index) => getCommentList(message, index)).join("");
  element.innerHTML = messagesHtml;
}
export default renderMessages;