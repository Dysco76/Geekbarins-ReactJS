import { Button } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { getSessionInfo, logoutThunk } from "../../store/authentication"

export const Logout = ({ style }) => {
  const session = useSelector(getSessionInfo)
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logoutThunk())

  return (
    <div style={style}>
      <Button
        variant="outlined"
        style={{ color: "red" }}
        onClick={handleLogout}
        disabled={session.sessionPending}
      >
        Logout
      </Button>
      {session.sessionError && (
        <p style={{ color: "red" }}>{session.sessionError}</p>
      )}
    </div>
  )
}
