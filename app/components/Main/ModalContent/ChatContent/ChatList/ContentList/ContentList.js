import useChatListStore from "../../../../zustand/useChatList";

export default function ContentList() {
  const { getChatContentList } = useChatListStore();
  const contentList = getChatContentList();

  return (
    <div>
      {contentList.map((c, i) => (
        <div
          key={i}
          className={`${c.isSelf ? "flex-row-reverse" : "flex-row"} flex`}
        >
          <div className="bg-[rgba(255,255,255,.1)] p-2 mb-2 rounded-lg max-w-[80%]">
            {c.content}
          </div>
        </div>
      ))}
    </div>
  );
}
