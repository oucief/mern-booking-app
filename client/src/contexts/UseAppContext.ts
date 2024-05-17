import React from "react";
import { useContext } from "react";

export type ToastMessage = {
  type: "SUCCESS" | "ERROR";
  message: string;
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

export const AppContext = React.createContext<AppContextType | undefined>(
  undefined
);

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
