import Responsive from "../Responsive";

const Sider = () => {
  return (
    <Responsive
      Mobile={<SiderMobile />}
      Desktop={<SiderDesktop />}
      breakpoint="md"
    />
  );
};

const SiderDesktop = () => {
  return (
    <div className="w-[180px] border-r border-[rgba(255,255,255,0.1)]"></div>
  );
};

const SiderMobile = () => {
  return (
    <div className="h-[100px] border-b border-[rgba(255,255,255,0.1)]"></div>
  );
};

export default Sider;
