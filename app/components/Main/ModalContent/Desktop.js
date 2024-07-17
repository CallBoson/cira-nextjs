import Sider from "../Sider";
import ChatContent from "./ChatContent/ChatContent";

const Desktop = () => {
  return (
    <div className="flex w-full h-full">
      <Sider />
      <ChatContent />
    </div>
  );
};

export default Desktop;
