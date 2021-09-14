import {
  GISTS_START,
  GISTS_SUCCESS,
  GISTS_ERROR,
  GISTS_SEARCH_START,
  GISTS_SEARCH_SUCCESS,
  GISTS_SEARCH_ERROR,
} from "./types"

export const getGistsStart = () => ({
  type: GISTS_START,
})

export const getGistsSuccess = (data) => ({
  type: GISTS_SUCCESS,
  payload: data,
})

export const getGistsError = (data) => ({
  type: GISTS_ERROR,
  payload: data,
})

export const searchGistsStart = () => ({
  type: GISTS_SEARCH_START,
})

export const searchGistsSuccess = (data) => ({
  type: GISTS_SEARCH_SUCCESS,
  payload: data,
})

export const searchGistsError = (data) => ({
  type: GISTS_SEARCH_ERROR,
  payload: data,
})
