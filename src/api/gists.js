import { request } from "./request"

export const getGistsApi = (page) =>
  request.get(`https://api.github.com/gists/public?page=${page}`)

export const getUserGistsApi = (user) =>
  request.get(`https://api.github.com/users/${user}/gists`)
