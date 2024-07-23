import useChatListStore from "../../zustand/useChatList";
import ChatListItem from "../ChatListItem";
import { Button } from "@nextui-org/react";
import { FaPenToSquare } from "react-icons/fa6";

const SiderDesktop = () => {
  const { chatList, addChat, setCurrentChatById } = useChatListStore();

  const handleAddChat = () => {
    const newChatId = addChat();
    setCurrentChatById({ chatId: newChatId });
  };
  return (
    <div className="w-[180px] border-r border-[rgba(255,255,255,0.1)] flex flex-col">
      <div className="flex justify-end m-2">
        <Button
          onClick={handleAddChat}
          isIconOnly
          color="warning"
          variant="light"
          aria-label="Add a chat"
          size="sm"
        >
          <FaPenToSquare className="text-xl" />
        </Button>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {chatList.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default SiderDesktop;
