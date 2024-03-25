"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

function AutoRefreshProd({ children }: { children: ReactNode }) {
  return children;
}

function AutoRefreshDev({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    ws.onmessage = (event) => {
      if (event.data === "refresh") {
        router.refresh();
      }
    };
    return () => {
      ws.close();
    };
  }, [router]);
  return children;
}

export default process.env.NODE_ENV === "development"
  ? AutoRefreshDev
  : AutoRefreshProd;
