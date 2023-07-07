const getDate = () => {
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  let result = '';
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  result += `${day}.${months[month]}.${year} ${hour}:${minutes}`;
  return result;
};

const createComment = (formNameElement, formTextElement, event = null) => {
  const eventCode = event ? event.code : event;
  if (eventCode === 'Enter' || eventCode === null) {
    const oldComments = commentsElement.innerHTML;
    let name = '';
    let comment = '';

    const formNameValue = formNameElement.value;
    const formTextValue = formTextElement.value;

    formNameValue === ''
      ? formNameElement.classList.add('error')
      : formNameElement.classList.remove('error');

    formTextValue === '' || formTextValue.match(/^\s*$/)
      ? formTextElement.classList.add('error')
      : formTextElement.classList.remove('error');

    if (
      formNameValue !== '' &&
      formTextValue !== '' &&
      !formTextValue.match(/^\s*$/)
    ) {
      name = formNameValue;
      comment = formTextValue;

      commentsElement.innerHTML =
        oldComments +
        `<li class="comment">
          <div class="comment-header">
            <div>${name}</div>
            <div>${getDate()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
        </li>`;
    }
  }
};
