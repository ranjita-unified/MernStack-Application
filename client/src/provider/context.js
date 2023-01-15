import { createContext, useContext } from "react";

const userContext = createContext({});

export const { Provider } = userContext;

export const useDataContext = () => useContext(userContext);

