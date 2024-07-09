import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "语境智能回应助手",
  description: "Contextual Intelligent Response Assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <NextUIProvider>
        <body className={inter.className}>{children}</body>
      </NextUIProvider>
    </html>
  );
}
