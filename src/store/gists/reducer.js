import {
  GISTS_START,
  GISTS_SUCCESS,
  GISTS_ERROR,
  GISTS_SEARCH_START,
  GISTS_SEARCH_SUCCESS,
  GISTS_SEARCH_ERROR,
} from "./types"

const initialState = {
  gists: [],
  gistsPending: false,
  gistsError: null,
}

export const gistsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GISTS_START:
    case GISTS_SEARCH_START:
      return {
        ...state,
        gistsPending: true,
      }

    case GISTS_SUCCESS:
    case GISTS_SEARCH_SUCCESS:
      return {
        ...state,
        gistsPending: false,
        gists: payload,
      }

    case GISTS_ERROR:
    case GISTS_SEARCH_ERROR:
      return {
        ...state,
        gistsPending: false,
        gistsError: payload,
      }
    default:
      return state
  }
}
