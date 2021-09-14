import debounce from "lodash.debounce"
import { getGistsApi, getUserGistsApi } from "../../api/gists"
import {
  getGistsStart,
  getGistsSuccess,
  getGistsError,
  searchGistsStart,
  searchGistsSuccess,
  searchGistsError,
} from "./actions"

const debouncedSearchQuery = debounce(async (user, dispatch) => {
  dispatch(searchGistsStart())

  try {
    const res = await getUserGistsApi(user)
    dispatch(searchGistsSuccess(res.data))
  } catch (e) {
    dispatch(searchGistsError(e))
  }
}, 1000)

export const getGistsThunk = (page) => async (dispatch) => {
  dispatch(getGistsStart())

  try {
    const res = await getGistsApi(page)

    dispatch(getGistsSuccess(res.data))
  } catch (e) {
    dispatch(getGistsError(e))
  }
}

export const searchGistsThunk = (user) => async (dispatch) => {
  debouncedSearchQuery(user, dispatch)
}
