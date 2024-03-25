import HomeLink from "@/components/HomeLink";
import AutoRefresh from "./AutoRefresh";
import { serif } from "@/components/fonts";
import "./global.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AutoRefresh>
      <html lang="en" className={serif.className}>
        <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
          <header className="mb-14 flex flex-row place-content-between">
            <HomeLink />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </AutoRefresh>
  );
}
