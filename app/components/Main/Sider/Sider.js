import Responsive from "../../Responsive";
import SiderDesktop from "./Desktop/Desktop";
import SiderMobile from "./Mobile/Mobile";

const Sider = () => {
  return (
    <Responsive
      Mobile={<SiderMobile />}
      Desktop={<SiderDesktop />}
      breakpoint="md"
    />
  );
};

export default Sider;
