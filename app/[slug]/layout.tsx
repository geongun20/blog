import { ReactNode } from "react";
import HomeLink from "../HomeLink";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <footer className="mt-12">
        <HomeLink />
      </footer>
    </>
  );
}
