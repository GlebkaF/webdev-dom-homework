// Это блок для Вспомогательных функций________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

//  (1) __ Функция Эстетичного создания и отображения времени           
export const letTime = () => {

  let date = new Date();

  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;

};

// (2) __ Функция Исправления ошибки при получении отсутствующего текста

export const errorTextChecking = (checkingText) => {

  if (checkingText === undefined) {
    return "";
  } else {
    return checkingText;
  };

};


// |                                                                                                          |
// Это блок для Вспомогательных функций_______________________________________________________________________|