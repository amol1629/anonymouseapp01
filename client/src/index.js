import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

const root = ReactDOM.createRoot(document.getElementById("root"));

// Disable React Dev Tools
// disableReactDevTools();

AOS.init();

AOS.init({
  // offset : 50,
  duration: 1000, // values from 0 to 3000, with step 50ms
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>

    <Toaster
      position="top-center"
      autoClose={3000} // Auto-close the notification after 3 seconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>
);
