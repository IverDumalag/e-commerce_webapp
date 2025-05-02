import React, { createContext, useContext, useState } from 'react';

// Create a Context
const GlobalDataContext = createContext();

// Create a Provider Component
export const GlobalDataProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global state for logged-in user

  return (
    <GlobalDataContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

// Custom Hook to use Global Data
export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};