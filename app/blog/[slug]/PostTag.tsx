"use client";

import { useRouter } from "next/navigation";

export default function PostTag({ tag }: { tag: string }) {
  const router = useRouter();

  return (
    <a
      className="underline cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/?tag=${tag}`);
      }}
    >
      <span>#{tag}</span>
    </a>
  );
}
