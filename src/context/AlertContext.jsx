import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
   const [isAlert, setIsAlert] = useState({
      active: false,
      isRequested: false,
      error: ""
   });

   return (
      <AlertContext.Provider value={{ isAlert, setIsAlert }}>
         {children}
      </AlertContext.Provider>
   );
};
