import PresetList from "./PresetList/PresetList";
import ContentList from "./ContentList/ContentList";

export default function ChatList() {
  return (
    <div className="w-full h-full py-4">
      <PresetList />
      <div className="py-2 text-sm flex gap-2 items-center text-slate-400 before:h-[1px] before:bg-slate-400 before:flex-1 after:h-[1px] after:bg-slate-400 after:flex-1">
        上面为预设对话列表
      </div>
      <ContentList />
    </div>
  );
}
