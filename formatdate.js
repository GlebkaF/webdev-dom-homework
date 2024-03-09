export function formatDate(date) {
  const options1 = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };
  const options2 = {
    hour: "numeric",
    minute: "numeric",
  };

  return (
    date.toLocaleString("ru", options1) +
    " " +
    date.toLocaleString("ru", options2)
  );
}
