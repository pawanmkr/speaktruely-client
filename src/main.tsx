import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="flex justify-center bg-sublime_darkblue">
      <App />
    </div>
  </React.StrictMode>
);
