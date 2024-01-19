import { createContext, useState } from "react";

export const WorkOutUpdateContext = createContext();

export const WorkOutUpdateProvider = ({ children }) => {
  const [selectedWorkOut, setSelectedWorkOut] = useState(null);

  return (
    <WorkOutUpdateContext.Provider
      value={{ selectedWorkOut, setSelectedWorkOut }}
    >
      {children}
    </WorkOutUpdateContext.Provider>
  );
};
