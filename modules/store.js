let comments = [];

export const getComments = () => {
    return comments;
}

export const setComments = (data) => {
    if (!data) return;
    comments = data;
}