import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main className="flex-none fixed left-0 top-0 h-screen w-full">
      <Spline scene="https://prod.spline.design/n8IBG1sTVWBPkWiU/scene.splinecode" />

      <div className="custom-width fixed top-0 left-1/2 -translate-x-1/2">
        <div className="mt-44 flex flex-col items-center">
          <div className="text-center text-7xl">Chat better with</div>
          <div className="text-center text-6xl mt-4">GlobalChatPro</div>
        </div>
      </div>
    </main>
  );
}
