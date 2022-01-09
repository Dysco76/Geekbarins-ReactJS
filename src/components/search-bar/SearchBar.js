import { alpha, InputBase, makeStyles } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { useContext } from "react"
import { SearchContext } from "../../pages/chat"

export const SearchBar = () => {
    const classes = useStyles()
    const {searchString, setSearchString} = useContext(SearchContext)

    return <div className={classes.root}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              startAdornment={<Search />}
              value={searchString}
              onChange={e => setSearchString(e.target.value)}
            />
          </div>
}

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      paddingLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.35),
      },
      width: "100%"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: theme.spacing(1),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}))