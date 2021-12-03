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
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      "@media (min-width:600px)": {
        minHeight: 56,
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
