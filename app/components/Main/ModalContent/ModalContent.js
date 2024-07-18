import Responsive from "../../Responsive";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

export default function ModalContent() {
  return (
    <Responsive Mobile={<Mobile />} Desktop={<Desktop />} breakpoint="md" />
  );
}
