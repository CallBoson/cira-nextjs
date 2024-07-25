import { IoClose } from "react-icons/io5";
import { Input } from "@nextui-org/react";
import ChatList from "./ChatList/ChatList";
import { memo, useState } from "react";
import { useModalStore } from "../../zustand/useModal";
import useChatListStore from "../../zustand/useChatList";

const ChatContent = () => {
  const { onClose } = useModalStore();
  const { isLoading, handleGenerate: handleSubmitChat } = useChatListStore();
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    handleSubmitChat(prompt);
    setPrompt("");
  };

  return (
    <div className="flex flex-col flex-1 p-4 pt-2">
      <div className="h-14 flex items-center justify-end">
        {/* <Input placeholder="如有对话背景可在此输入" /> */}
        <IoClose
          className="text-2xl cursor-pointer ml-2 transition hover:rotate-90 md:block hidden"
          onClick={onClose}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>
      <div className="flex items-center h-12">
        <Input
          placeholder="描述你希望如何回答"
          onInput={(e) => setPrompt(e.target.value)}
          value={prompt}
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
          src="/flower-icon.svg"
          alt="flower"
          className="transition duration-300 hover:scale-110 hover:rotate-45 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default memo(ChatContent);
