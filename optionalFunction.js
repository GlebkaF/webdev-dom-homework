//рендер даты

export const myDate = (date) => {
    const getDate = new Date(date);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      timezone: "UTC",
      hour: "numeric",
      minute: "2-digit"
    };
    
    options.hour = "2-digit";
    return getDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');
  }
// export const myDate = () => {
//     const getDate = new Date();
//     const options = {
//       year: "2-digit",
//       month: "2-digit",
//       day: "2-digit",
//       timezone: "UTC",
//       hour: "numeric",
//       minute: "2-digit"
//     };
    
//     options.hour = "2-digit";
//     return getDate.toLocaleDateString("ru-Ru", options).split(', ').join(' ');
//   }

  //обезопасить ввод данных пользователя
  
  // export const secureInput = (safeText) => {
  //   return safeText.replaceAll("<", "&lt;")
  //     .replaceAll(">", "&gt;")
  //   //.replaceAll("&", "&amp;")
  //   //.replaceAll('"', "&quot;");
  // }
  export function secureInput(safeText){
    return safeText.replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
    //.replaceAll("&", "&amp;")
    //.replaceAll('"', "&quot;");
  }