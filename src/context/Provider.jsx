import { createContext, useState, useContext } from "react";
import PropsTypes from "prop-types";

const ContextProvider = createContext();

export const UseContext = () => {
  return useContext(ContextProvider);
};

const Provider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sidebarToggle = () => {
    setOpen((prev) => !prev);
  };

  const values = {
    open,
    sidebarToggle,
  };

  return (
    <ContextProvider.Provider value={values}>
      {!loading && children}
    </ContextProvider.Provider>
  );
};

export default Provider;

Provider.propTypes = {
  children: PropsTypes.node,
};
