export function getTodos() {
    return fetchPromiseGet = fetch(
        'https://wedev-api.sky.pro/api/v1/nastya-mikheykina/comments',
        {
          method: "GET"
        }
      );
      fetchPromiseGet     
        .then((response) => {
          if (!response.ok) {
            if (response.status === 500) {
              /* текст ошибки */
              throw new Error('Ошибка 500');
            }
          }
          /*при успешном выполнеии запроса возвращаем данные*/
          return response.json();
        })
}

export function postTodo( text ) {
    return fetchPromise = fetch('https://wedev-api.sky.pro/api/v1/nastya-mikheykina/comments', {
    method: 'POST',
    body: JSON.stringify({
      text: text,
      name: name.value,
      forceError: true, 
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Ошибка 500');
        } else if (response.status === 400) {
          throw new Error('Ошибка 400');
        }
      }

      return response.json();
    })
}