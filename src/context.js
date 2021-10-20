import React from "react";

const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const temp = "temp";
  return <AppContext.Provider value={temp}>{children}</AppContext.Provider>;
}

export const useGlobalContext = () => React.useContext(AppContext);
