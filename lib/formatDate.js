export const formatDateToRu = (date) => {
    return `${date.getDate() < 10 ? '0' + date.getDate() : date.get}`
}