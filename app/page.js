import Spline from "@splinetool/react-spline";

import { cn } from "./libs/utils";
import AnimatedGradientText from "./components/AnimatedGradientText";
import SparklesText from "./components/SparklesText";
import Main from "./components/Main/Main";

export default function Home() {
  return (
    <main>
      <Spline
        scene="https://prod.spline.design/k17mzYq2EHsMIqB8/scene.splinecode"
        className="fixed left-0 top-0 z-0"
      />

      <div className="absolute left-1/2 -translate-x-1/2 top-0 custom-width">
        <div className="mt-24 flex flex-col items-center">
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
          <SparklesText
            text="Chat better with"
            className="mt-4 sm:text-6xl text-4xl"
          />
          <SparklesText
            text="GlobalChatPro"
            className="mt-4 sm:text-6xl text-4xl"
          />
        </div>
      </div>

      <Main />
    </main>
  );
}
