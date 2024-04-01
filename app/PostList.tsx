"use client";

import Color from "colorjs.io";
import Link from "@/components/Link";
import { useState } from "react";
import { CSSProperties } from "react";
import { sans } from "@/components/fonts";
import { Post } from "@/app/page";
import uniq from "lodash/uniq";
import { useRouter, useSearchParams } from "next/navigation";
import { groupBy, map, mapValues } from "lodash";

export default function PostList({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams.get("tag");
  const countsByTag = mapValues(
    groupBy(posts.flatMap((post) => post.tags)),
    (tags) => tags.length
  );

  console.log(countsByTag);

  return (
    <>
      <div className="flex gap-x-4">
        {map(countsByTag, (count, tag) => (
          <a
            key={tag}
            className={`underline cursor-pointer ${
              selectedTag === tag ? " font-bold" : ""
            }`}
            onClick={(e) => {
              if (tag === selectedTag) {
                router.push(`?`);
              } else {
                router.push(`?tag=${tag}`);
              }
            }}
          >
            {tag}({count})
          </a>
        ))}
      </div>
      {posts
        .filter((post) => !selectedTag || post.tags.includes(selectedTag))
        .map((post) => {
          return (
            <Link
              style={{}}
              key={post.slug}
              className="block py-4 hover:scale-[1.005]"
              href={"/blog/" + post.slug + "/"}
            >
              <article>
                <h2
                  className={[
                    sans.className,
                    "text-[28px] font-black",
                    "text-[--khaki]",
                  ].join(" ")}
                >
                  {post.title}
                </h2>
                <p className="text-[13px] text-gray-700">
                  {new Date(post.date).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-1">{post.spoiler}</p>
              </article>
            </Link>
          );
        })}
    </>
  );
}
