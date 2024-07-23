import { memo } from "react";
import useChatListStore from "../../../../zustand/useChatList";
import { Avatar } from "@nextui-org/react";

export default memo(function PresetContentList() {
  const { getChatPresetList } = useChatListStore();
  const chatPresetList = getChatPresetList();
  return (
    <div>
      {chatPresetList.map((c, i) => (
        <div
          key={i}
          className={`${
            c.isSelf ? "flex-row-reverse" : "flex-row"
          } flex items-start gap-2`}
        >
          <Avatar
            className="relative top-[2px]"
            size="sm"
            color="secondary"
            name={c.isSelf ? "" : c.roleName}
          />
          <div className="mb-2 p-2 bg-purple-200 text-purple-500 rounded-lg text-sm max-w-[80%]">
            {c.content}
          </div>
        </div>
      ))}
    </div>
  );
});
