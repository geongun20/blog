import PostList from "@/app/PostList";
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

export type Metadata = {
  title: string;
  description: string;
  alternates: {
    types: Record<string, string>;
  };
};

export const metadata: Metadata = {
  title: "geongun.me",
  description: "A personal blog by lee seung geon",
  alternates: {
    types: {
      "application/atom+xml": "https://geongun.me/atom.xml",
      "application/rss+xml": "https://geongun.me/rss.xml",
    },
  },
};

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
      tags: data.tags
        .split(",")
        .map((tag) => trim(tag))
        .filter((tag) => tag.length > 0),
    };
  });
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      <div>
        <p>소프트웨어 개발자 입니다.</p>
        <p>기술을 통해 좋은 세상을 만듭니다.</p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
