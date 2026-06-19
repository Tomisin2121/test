import React, { createContext, useContext, useState } from 'react';

const DriverContext = createContext();

export function DriverProvider({ children }) {
  const [driverProfile, setDriverProfile] = useState({
    profileImage: null,
    fullName: '',
    phone: '',
    license: '',
    tricycleReg: '',
    makeModel: '',
  });

  return (
    <DriverContext.Provider value={{ driverProfile, setDriverProfile }}>
      {children}
    </DriverContext.Provider>
  );
}

export function useDriver() {
  return useContext(DriverContext);
}