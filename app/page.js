import Spline from "@splinetool/react-spline";

import { cn } from "./lib/utils";
import AnimatedGradientText from "./components/AnimatedGradientText";
import SparklesText from "./components/SparklesText";
import Main from "./components/Main/Main";

export default function Home() {
  return (
    <main className="flex-none fixed left-0 top-0 h-screen w-full">
      <Spline scene="https://prod.spline.design/n8IBG1sTVWBPkWiU/scene.splinecode" />

      <div className="custom-width fixed top-0 left-1/2 -translate-x-1/2">
        <div className="mt-36 flex flex-col items-center">
          <AnimatedGradientText className="text-lg">
            🎉
            <span
              className={cn(
                `ml-2 inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Made with Magic UI
            </span>
          </AnimatedGradientText>
          <SparklesText text="Chat better with" className="mt-4" />
          <SparklesText text="GlobalChatPro" className="mt-4" />
        </div>
      </div>

      <Main />
    </main>
  );
}
