"use client";

import Link from "@/components/Link";
import { sans } from "@/components/fonts";
import { Post } from "@/app/blog/page";
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

  return (
    <div>
      <div className="flex gap-x-4 py-4">
        {map(countsByTag, (count, tag) => (
          <a
            key={tag}
            className={`text-[14px] underline cursor-pointer ${
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
      <div className="">
        {posts
          .filter((post) => !selectedTag || post.tags.includes(selectedTag))
          .map((post) => {
            return (
              <Link
                style={{}}
                key={post.slug}
                className="block py-8 hover:scale-[1.005] border-b-[1px] border-gray-200"
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
      </div>
    </div>
  );
}
