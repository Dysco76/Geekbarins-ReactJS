export const formatDate = (date) => {
  const time = new Date(date).getTime()
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

export const getTimeFromDate = (date) => {
  const time = new Date(date).getTime()
  const options = {
    hour: "numeric",
    minute: "numeric",
  }
  const locale = navigator.language
  const formatedTime = new Intl.DateTimeFormat(locale, options).format(time)

  return formatedTime
}