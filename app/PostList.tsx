"use client";

import Color from "colorjs.io";
import Link from "@/components/Link";
import { useState } from "react";
import { CSSProperties } from "react";
import { sans } from "@/components/fonts";
import { Post } from "@/app/page";
import uniq from "lodash/uniq";
import { useRouter, useSearchParams } from "next/navigation";

export default function PostList({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams.get("tag");
  const allTags = uniq(posts.flatMap((post) => post.tags));

  console.log(allTags);

  return (
    <>
      <div className="flex gap-x-4">
        {allTags.map((tag) => (
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
            {tag}
          </a>
        ))}
      </div>
      {posts
        .filter((post) => !selectedTag || post.tags.includes(selectedTag))
        .map((post) => {
          const lightStart = new Color("lab(63 59.32 -1.47)");
          const lightEnd = new Color("lab(33 42.09 -43.19)");
          const lightRange = lightStart.range(lightEnd);
          const darkStart = new Color("lab(81 32.36 -7.02)");
          const darkEnd = new Color("lab(78 19.97 -36.75)");
          const darkRange = darkStart.range(darkEnd);
          let today = new Date();
          const timeSinceFirstPost =
            today.getTime() - new Date(2018, 10, 30).getTime();
          const timeSinceThisPost =
            today.getTime() - new Date(post.date).getTime();
          const staleness = timeSinceThisPost / timeSinceFirstPost;
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
                    "text-[--lightLink]",
                  ].join(" ")}
                  style={
                    {
                      "--lightLink": lightRange(staleness).toString(),
                      "--darkLink": darkRange(staleness).toString(),
                    } as CSSProperties
                  }
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
