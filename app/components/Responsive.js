import useWindowSize from "../hooks/useWindowSize";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export default function Responsive({ Mobile, Desktop, breakpoint = "sm" }) {
  const { windowWidth } = useWindowSize();

  return windowWidth >= breakpoints[breakpoint] ? Desktop : Mobile;
}
