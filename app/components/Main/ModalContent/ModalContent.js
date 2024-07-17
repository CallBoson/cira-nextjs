import Responsive from "../../Responsive";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { ChatModalContext } from "../contexts/ChatModalContext";

export default function ModalContent(props) {
  return (
    <ChatModalContext.Provider value={props}>
      <Responsive Mobile={<Mobile />} Desktop={<Desktop />} breakpoint="md" />
    </ChatModalContext.Provider>
  );
}
