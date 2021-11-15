import { makeStyles } from "@material-ui/core"

export const AuthTemplate = ({ children, link }) => {
  const classes = useStyles()
  return (
    <div className={classes.authTemplateWrapper}>
      {children}
      <div className={classes.link}>{link}</div>
    </div>
  )
}

const useStyles = makeStyles({
  authTemplateWrapper: {
    maxWidth: "450px",
    margin: "0 auto",
    marginTop: "15%",
  },

  link: {
    marginTop: "30px",
    textAlign: "center",
  },
})
