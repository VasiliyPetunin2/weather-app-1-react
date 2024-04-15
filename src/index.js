import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CityDataProvider } from "context/CityDataContext";
import { LoadingProvider } from "context/LoadingContext";
import { AlertProvider } from "context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <CityDataProvider>
      <LoadingProvider>
         <AlertProvider>
            <App />
         </AlertProvider>
      </LoadingProvider>
   </CityDataProvider>
);

reportWebVitals();
