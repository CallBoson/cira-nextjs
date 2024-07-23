import Sider from "../Sider/Sider";
import ChatContent from "./ChatContent/ChatContent";

const Mobile = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Sider />
      <ChatContent />
    </div>
  );
};

export default Mobile;
