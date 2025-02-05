import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  typography: {
    fontFamily: "monospace",
  },
});

root.render(
  <GoogleOAuthProvider clientId="118413101371-ao2hf0icafvtkrgiie3kmr7svmioj8o3.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
