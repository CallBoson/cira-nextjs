import Image from "next/image";

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 w-full h-[110px] flex items-center justify-center z-10"
      style={{
        filter: "invert(1)",
      }}
    >
      <Image
        src="/logo.png"
        width={223}
        height={84}
        className="h-10 w-auto"
        alt="Logo"
      />
    </nav>
  );
}
