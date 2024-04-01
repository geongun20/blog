import HomeLink from "@/components/HomeLink";
import AutoRefresh from "./AutoRefresh";
import { serif } from "@/components/fonts";
import "./global.css";
import { ReactNode, Suspense } from "react";
import Link from "@/components/Link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AutoRefresh>
      <Suspense>
        <html lang="en" className={serif.className}>
          <body className="mx-auto max-w-2xl bg-[--bg] px-5 py-12 text-[--text]">
            <header className="mb-14 flex flex-row place-content-between">
              <HomeLink />
            </header>
            <main>{children}</main>
            <footer className="mt-14 flex flex-row gap-x-4">
              <Link
                href="mailto://leesg7975@gmail.com"
                className="text-[13px] underline"
              >
                leesg7975@gmail.com
              </Link>
              <Link
                href="https://www.linkedin.com/in/lee-seung-geon/"
                className="text-[13px] underline"
              >
                linkedin
              </Link>
              <Link
                href="https://github.com/geongun20"
                className="text-[13px] underline"
              >
                github
              </Link>
            </footer>
          </body>
        </html>
      </Suspense>
    </AutoRefresh>
  );
}
