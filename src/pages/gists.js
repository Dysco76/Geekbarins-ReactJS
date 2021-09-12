import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getGistsFromStore,
  getGistsThunk,
  searchGistsThunk,
} from "../store/gists"

const randomPage = () => Math.trunc(Math.random() * 20) + 1
export function Gists() {
  const dispatch = useDispatch()

  const [search, setSearch] = useState("")

  const { gists, gistsError, gistsPending } = useSelector(getGistsFromStore)

  useEffect(() => {
    if (search) {
      dispatch(searchGistsThunk(search))
    }
  }, [dispatch, search])

  if (gistsError)
    return (
      <>
        <h1>Something went wrong!</h1>
        {gistsError.message}
      </>
    )

  return (
    <div>
      <input
        value={search}
        placeholder="Search user gists..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => dispatch(getGistsThunk(randomPage()))}>
        Fetch random gists page 1-20
      </button>
      {gistsPending ? (
        <h1>Fetching data...</h1>
      ) : (
        gists.map((gist) => <h5 key={gist.id}>{gist.description}</h5>)
      )}
    </div>
  )
}
