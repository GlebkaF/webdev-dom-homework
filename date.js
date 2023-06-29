export const commentDate = new Date().toLocaleDateString('default', {year: '2-digit', month: '2-digit', day: '2-digit'}) + " " + new Date().toTimeString().substr(0,5);

