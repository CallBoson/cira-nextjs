import useChatListStore from "../../../../zustand/useChatList";
import { MdEdit } from "react-icons/md";
import { memo, useState } from "react";
import { Button } from "@nextui-org/react";

export default memo(function ContentList() {
  const { getChatContentList, removeChatContent, handleGenerate } =
    useChatListStore();
  const contentList = getChatContentList();

  const [currentEditContentId, setCurrentEditContentId] = useState(undefined);

  function handleEditContent(contentId) {
    setCurrentEditContentId(contentId);
  }

  function handleSubmitEditContent(contentId, content) {
    // 删除contentList中本条及以后的所有content
    const pointer = contentList.findIndex((c) => c.id === contentId);
    if (pointer !== -1) {
      const slicedArray = contentList.slice(pointer);
      for (const { id } of slicedArray) {
        removeChatContent({ contentId: id });
      }

      handleGenerate(content);
    }
  }

  return (
    <div>
      {contentList.map((c, i) => (
        <div
          key={i}
          className={`${
            c.isSelf ? "flex-row-reverse" : "flex-row"
          } flex items-start gap-1`}
        >
          {currentEditContentId === c.id ? (
            <EditContent
              c={c}
              onSubmit={(newContent) =>
                handleSubmitEditContent(c.id, newContent)
              }
              onCancel={() => setCurrentEditContentId(undefined)}
            />
          ) : (
            <Content c={c} handleEditContent={handleEditContent} />
          )}
        </div>
      ))}
    </div>
  );
});

const Content = memo(({ c, handleEditContent }) => {
  return (
    <div
      className={`${
        c.isSelf ? "flex-row-reverse" : "flex-row"
      } flex items-start gap-1 group/content-item w-full`}
    >
      <div className="bg-[rgba(255,255,255,.1)] p-2 mb-2 rounded-lg max-w-[80%] whitespace-pre-wrap">
        {c.content}
      </div>
      {c.isSelf && (
        <div
          className="group-hover/content-item:block hidden p-2 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,.1)]"
          onClick={() => handleEditContent(c.id)}
        >
          <MdEdit className="text-xl" />
        </div>
      )}
    </div>
  );
});

const EditContent = memo(({ c, onCancel, onSubmit }) => {
  const [content, setContent] = useState(c.content);

  return (
    <div className="bg-[rgba(255,255,255,.1)] p-2 mb-2 rounded-lg max-w-[80%] whitespace-pre-wrap w-full">
      <div className="grid">
        <textarea
          className="bg-transparent outline-none resize-none col-start-1 col-end-2 row-start-1 row-end-2 overflow-hidden focus:ring-0 focus-visible:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          autoComplete="off"
          autoFocus
        />
        <span className="invisible col-start-1 col-end-2 row-start-1 row-end-2 whitespace-pre-wrap">
          {content}
        </span>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button size="sm" color="danger" variant="flat" onClick={onCancel}>
          取消
        </Button>
        <Button size="sm" color="primary" onClick={() => onSubmit(content)}>
          确认
        </Button>
      </div>
    </div>
  );
});
