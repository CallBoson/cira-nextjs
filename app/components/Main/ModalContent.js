import Sider from "./Sider";
import Responsive from "../Responsive";
import { IoClose } from "react-icons/io5";
import { memo } from "react";

export default function ModalContent(props) {
  return (
    <Responsive
      Mobile={<Mobile {...props} />}
      Desktop={<Desktop {...props} />}
      breakpoint="md"
    />
  );
}

const Mobile = memo(({ onClose }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Sider />
      <MainContent onClose={onClose} />
    </div>
  );
});

const Desktop = memo(({ onClose }) => {
  return (
    <div className="flex w-full h-full">
      <Sider />
      <MainContent onClose={onClose} />
    </div>
  );
});

const MainContent = memo(({ onClose }) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="h-12 flex items-center justify-end px-2">
        <IoClose className="text-2xl cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center h-12 m-3">
        <div className="bg-[rgba(255,255,255,0.1)] flex-1 h-full rounded-full mr-2">
          <input
            type="text"
            className="w-full h-full bg-transparent text-white px-3 outline-none"
            placeholder="描述你希望如何回答"
          />
        </div>
        <img
          src="https://clay.earth/_next/static/media/flower-icon.79c37898.svg"
          className="transition duration-300 hover:scale-110 hover:rotate-45 cursor-pointer"
        />
      </div>
    </div>
  );
});
