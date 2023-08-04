export const addDate = (value) => {
    let nowDate = new Date(value);
    let time = {
        hour: "numeric",
        minute: "numeric",
    };
    let date = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };

    return (
        nowDate.toLocaleDateString("ru", date) +
        " " +
        nowDate.toLocaleTimeString("ru", time)
    );
};
