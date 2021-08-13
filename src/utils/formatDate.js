export const formatDate = (time) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short", // also numeric
    year: "numeric",
  }
  const locale = navigator.language

  const formatedDate = new Intl.DateTimeFormat(locale, options).format(time)

  return formatedDate
}
