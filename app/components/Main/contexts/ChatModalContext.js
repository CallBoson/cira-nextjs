import { createContext, useContext } from "react";

export const ChatModalContext = createContext();

export const useChatModalContext = () => {
  return useContext(ChatModalContext);
};
