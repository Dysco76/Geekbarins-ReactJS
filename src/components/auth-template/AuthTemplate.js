import { makeStyles, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export const AuthTemplate = ({ children, link }) => {
  const classes = useStyles()
  return (
    <div className={classes.authTemplateWrapper}>
      {children}
      <div className={classes.linkWrapper}>
        <Link to={link.path} className={classes.link}>
        <Typography variant="body1">
            {link.text}
        </Typography>
        </Link>
        </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  authTemplateWrapper: {
    maxWidth: "450px",
    margin: "0 auto",
    marginTop: "15%",
  },

  linkWrapper: {
    marginTop: "30px",
    textAlign: "center",
  },
  link: {
    color: theme.palette.text.primary,
    cursor: "pointer"
  }
}))
