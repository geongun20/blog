import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "../Link";
import { sans } from "../fonts";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkMdxEvalCodeBlock } from "./mdx";
import overnight from "overnight/themes/Overnight-Slumber.json";
import "./markdown.css";
import { Metadata } from "@/app/page";

overnight.colors["editor.background"] = "var(--code-bg)";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const filename = "./public/" + params.slug + "/index.md";
  const file = await readFile(filename, "utf8");
  let postComponents = {};
  try {
    postComponents = await import(
      "../../public/" + params.slug + "/components.js"
    );
  } catch (e) {
    if (!e || e.code !== "MODULE_NOT_FOUND") {
      throw e;
    }
  }
  const { content, data } = matter(file);
  const discussUrl = `https://x.com/search?q=${encodeURIComponent(
    `https://geongun.me/${params.slug}/`
  )}`;
  const editUrl = `https://github.com/geongun20/blog/edit/main/public/${encodeURIComponent(
    params.slug
  )}/index.md`;
  return (
    <article>
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        {data.title}
      </h1>
      <p className="mt-2 text-[13px] text-gray-700 dark:text-gray-300">
        {new Date(data.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="markdown mt-10">
        <MDXRemote
          source={content}
          components={{
            a: Link,
            ...postComponents,
          }}
          options={{
            mdxOptions: {
              useDynamicImport: true,
              remarkPlugins: [
                remarkSmartpants,
                [remarkMdxEvalCodeBlock, filename],
              ],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: overnight,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./public/", { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  return dirs.map((dir) => ({ slug: dir }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const file = await readFile("./public/" + params.slug + "/index.md", "utf8");
  let { data } = matter(file);
  return {
    title: data.title + " — Lee Seung Geon",
    description: data.spoiler,
  };
}
