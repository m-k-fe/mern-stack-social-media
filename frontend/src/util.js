export const dateParser = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let timestamp = Date.parse(date);
  let myDate = new Date(timestamp).toLocaleDateString("en-US", options);
  return myDate.toString();
};

export const timestampParser = (num) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  let date = new Date(num).toLocaleDateString("en-US", options);
  return date.toString();
};
