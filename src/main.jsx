import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import {ProfileProvider} from "./utils/UserProfileContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProfileProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProfileProvider>
);
