import PostList from "@/app/blog/PostList";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import trim from "lodash/trim";

export type Post = {
  date: Date;
  spoiler: string;
  slug: string;
  title: string;
  tags: string[];
};

export function refineTags(tags: string): string[] {
  return tags
    .split(",")
    .map((tag) => trim(tag))
    .filter((tag) => tag.length > 0);
}

export async function getPosts(): Promise<Post[]> {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  const fileContents = await Promise.all(
    dirs.map((dir) => readFile("./public/" + dir + "/index.md", "utf8"))
  );
  const posts = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const data = matter(fileContent).data as Record<
      keyof Omit<Post, "slug">,
      string
    >;
    return {
      slug,
      ...data,
      date: new Date(data.date),
      tags: refineTags(data.tags),
    };
  });
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="relative -top-[10px] flex flex-col gap-y-4">
      <PostList posts={posts} />
    </div>
  );
}
