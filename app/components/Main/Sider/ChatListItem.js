import { memo } from "react";
import useChatListStore from "../zustand/useChatList";
import { MdDelete } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

const ChatListItem = ({ chat }) => {
  const { currentChatId, setCurrentChatById, getChatContentList, removeChat } =
    useChatListStore();

  const lastMessage = (() => {
    const chatContentList = getChatContentList({ chatId: chat.id });
    if (!chatContentList.length) return "";
    return chatContentList.at(0)?.content;
  })();

  const isActive = currentChatId === chat.id;

  const handleClick = () => {
    if (isActive) return;
    setCurrentChatById({ chatId: chat.id });
  };

  const handleRemoveChat = () => {
    removeChat({ chatId: chat.id });
    setCurrentChatById();
  };

  return (
    <div
      className={`group/chat-list-item flex items-center cursor-pointer mx-2 my-1 p-2 rounded ${
        isActive && "bg-[rgba(255,255,255,.1)]"
      }`}
      onClick={handleClick}
    >
      <div className="flex-1 overflow-hidden">
        <div className="text-base truncate">{chat.id}</div>
        <div className="text-sm text-gray-300 truncate">
          {lastMessage || "空对话"}
        </div>
      </div>

      <div className="group-hover/chat-list-item:block hidden">
        <Popover placement="bottom" showArrow={true} color="danger">
          <PopoverTrigger>
            <div className="hover:bg-[rgba(0,0,0,.3)] p-1 rounded">
              <MdDelete className="text-xl" />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Button color="danger" size="sm" onClick={handleRemoveChat}>
              确认删除
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default memo(ChatListItem);
