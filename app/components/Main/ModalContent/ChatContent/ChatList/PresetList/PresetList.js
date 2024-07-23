import { MdOutlineAddComment } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";
import useChatListStore from "../../../../zustand/useChatList";
import PresetContentList from "./PresetContentList";

export default function PresetList() {
  return (
    <div>
      <PresetContentList />
      <div className="flex justify-between">
        <PresetAddItem isSelf={false} />
        <PresetAddItem />
      </div>
    </div>
  );
}

const PresetAddItem = memo(({ isSelf = true }) => {
  const { isOpen, onOpenChange } = useDisclosure();
  const { addChatPreset } = useChatListStore();

  const [talker, setTalker] = useState(isSelf ? "我" : "");
  const [text, setText] = useState("");

  useEffect(() => {
    if (isOpen) {
      setText("");
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addChatPreset({ roleName: talker, content: text, isSelf });
      onOpenChange(false);
    },
    [talker, text, isSelf]
  );

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isSelf ? "left" : "right"}
      showArrow={true}
      backdrop="opaque"
      classNames={{
        base: ["before:bg-default-200"],
        content: ["py-3 px-4 border border-default-200"],
      }}
    >
      <PopoverTrigger>
        <Button isIconOnly size="lg" color="secondary" variant="bordered">
          <MdOutlineAddComment
            className={`text-3xl ${!isSelf && "scale-x-[-1]"}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            label="对话人"
            readOnly={isSelf}
            placeholder="e.g 客户A"
            value={talker}
            onChange={(e) => setTalker(e.target.value)}
            onClear={() => !isSelf && setTalker("")}
            autoComplete="off"
            required
            isClearable
          />
          <Input
            label="对话文本"
            placeholder="e.g Good to be here."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClear={() => setText("")}
            autoComplete="off"
            required
            isClearable
          />
          <Button type="submit" color="secondary" size="sm">
            添加
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
});
