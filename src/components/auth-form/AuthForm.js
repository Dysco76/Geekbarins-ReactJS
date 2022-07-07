import { Input, Button, makeStyles } from "@material-ui/core"
import { useState } from "react"
import { useSelector } from "react-redux"
import { getSessionInfo } from "../../store/authentication"

export const AuthForm = ({ title, handleSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()
  const sessionInfo = useSelector(getSessionInfo)

  return (
    <div className={classes.formWrapper}>
      <h1>{title}</h1>
      {sessionInfo.sessionError && (
        <p style={{ color: "red" }}>{sessionInfo.sessionError}</p>
      )}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        fullWidth={true}
        onChange={(e) => setEmail(e.target.value)}
        className={classes.input}
        required={true}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        fullWidth={true}
        onChange={(e) => setPassword(e.target.value)}
        className={classes.input}
        required={true}
      />

      <Button
        fullWidth={true}
        variant="outlined"
        color="primary"
        onClick={() => handleSubmit(email, password)}
        disabled={sessionInfo.sessionPending}
      >
        {title}
      </Button>
    </div>
  )
}

const useStyles = makeStyles({
  formWrapper: {
    textAlign: "center",
    "& h1": {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 50,
    },
  },

  input: {
    padding: "10px 15px",
    marginBottom: "20px",
    '&:-webkit-autofill,&:-webkit-autofill:hover,&:-webkit-autofill:focus,&:-webkit-autofill:active': {
      '-webkit-box-shadow': '0 0 0 30px transparent inset !important',
    }
  },
})
