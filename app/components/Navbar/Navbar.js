import Image from "next/image";
import ShimmerButton from "../ShimmerButton";
import { FaGithub } from "react-icons/fa";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-[110px] z-10">
      <div className="custom-width h-full flex items-center justify-between">
        <Image
          src="/logo.png"
          width={223}
          height={84}
          className="h-10 w-auto"
          alt="Logo"
          style={{
            filter: "invert(1)",
          }}
        />

        <ShimmerButton className="shadow-2xl flex items-center">
          <FaGithub className="text-2xl text-white mr-2" />
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
            Source Code
          </span>
        </ShimmerButton>
      </div>
    </nav>
  );
}
