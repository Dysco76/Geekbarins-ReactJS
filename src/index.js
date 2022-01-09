import { createTheme, ThemeProvider } from "@material-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { App } from "./App"
import { persistor, store } from "./store"

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#7986CB",
    },
    grey: {
      "1000": "#141414"
    }
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:600px)": {
        minHeight: 56,
      },
    },
    scrollbar: {
      // Make background color apply only to scroll bar
      "-webkit-background-clip": "text",
      transition: "background-color .2s",
      "&:hover":{
      // Make scroll bar appear on hover
      backgroundColor: "#757575"
      },
      "&::-webkit-scrollbar": {
      width: "7px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        backgroundColor: "inherit",
      },
    },
  },
  typography: {
    fontSize: 12,
  },
  shape: {
    borderRadius: 10,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root"),
)
