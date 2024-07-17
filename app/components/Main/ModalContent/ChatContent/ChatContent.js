import { IoClose } from "react-icons/io5";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useActionSWR } from "../../../../libs/swr";
import fetcher from "../../../../libs/fetcher";
import { useChatModalContext } from "../../contexts/ChatModalContext";

const ChatContent = () => {
  const { onClose } = useChatModalContext();
  const [prompt, setPrompt] = useState("");

  const { data, isLoading, error, mutate } = useActionSWR("/api/generate", () =>
    fetcher({ url: "/api/generate", body: { prompt } })
  );

  const handleSubmit = async () => {
    if (!prompt || isLoading) return;

    mutate();
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="h-14 flex items-center justify-between px-2">
        <Input placeholder="如有对话背景可在此输入" />
        <IoClose
          className="text-2xl cursor-pointer ml-2 transition hover:rotate-90"
          onClick={onClose}
        />
      </div>
      <div className="flex-1"></div>
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
