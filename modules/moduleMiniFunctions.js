// Это блок для Вспомогательных функций________________________________________________________________________
// |                                                                                                          |
// V                                                                                                          V

//  (1) __ Функция Эстетичного создания и отображения времени           
export const letTime = () => {

  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() - 2000;
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let formattedDate = day + "." + month + "." + year + " " + hours + ":" + minutes;

  return formattedDate;
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