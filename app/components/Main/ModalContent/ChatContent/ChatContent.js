import { IoClose } from "react-icons/io5";
import { Input } from "@nextui-org/react";
import ChatList from "./ChatList/ChatList";
import { useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { useModalStore } from "../../zustand/useModal";

const ChatContent = () => {
  const { onClose } = useModalStore();
  const [prompt, setPrompt] = useState("");
  const { isLoading, mutate } = useFetch({
    url: "/api/generate",
    body: {
      prompt,
    },
    fetchOnMount: false,
  });

  const handleSubmit = () => {
    if (!prompt || isLoading) return;
    mutate();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="h-14 flex items-center justify-between px-2">
        <Input placeholder="如有对话背景可在此输入" />
        <IoClose
          className="text-2xl cursor-pointer ml-2 transition hover:rotate-90 md:block hidden"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>
      <div className="flex items-center h-12 m-3">
        <Input
          placeholder="描述你希望如何回答"
          onInput={(e) => setPrompt(e.target.value)}
          size="lg"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          isDisabled={isLoading}
          isClearable
          className="mr-2"
          autoComplete="off"
        />
        <img
          src="https://clay.earth/_next/static/media/flower-icon.79c37898.svg"
          className="transition duration-300 hover:scale-110 hover:rotate-45 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatContent;
