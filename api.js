export function commentsGet () {
    return fetch('https://wedev-api.sky.pro/api/v1/:Evgeny-Onotskiy/comments', {
        method: 'GET'
      })
      .then((response) => response.json())
}


export function commentPost ({text, name}) {
   return fetch('https://wedev-api.sky.pro/api/v1/:Evgeny-Onotskiy/comments', {
        method: 'POST',
        body: JSON.stringify({
          name: name.value,
          text: text.value,
          forceError: true,
        })
        })
        .then((response) =>{
            if (response.status === 400){
              throw new Error('некорректный запрос');
            }
            if (response.status === 500 ) {
              throw new Error('ошибка сервера');
            }
            if (response.status === 201) {
              return response.json();
            } 
          })
}