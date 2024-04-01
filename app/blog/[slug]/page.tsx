import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "../../../components/Link";
import { sans } from "../../../components/fonts";
import remarkSmartpants from "remark-smartypants";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkMdxEvalCodeBlock } from "./mdx";
import overnight from "overnight/themes/Overnight-Slumber.json";
import "./markdown.css";
import { refineTags } from "@/app/page";
import PostTag from "@/app/blog/[slug]/PostTag";

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
  const replacedContent = content
    .replaceAll("\b", "")
    .replaceAll(String.fromCharCode(29), "");
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
      <p className="mt-2 text-[13px] text-gray-700">
        {new Date(data.date).toLocaleDateString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="markdown mt-10">
        <MDXRemote
          source={replacedContent}
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
      <div className="mt-2 text-[13px] text-gray-700 gap-x-2 flex">
        {refineTags(data.tags).map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
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
    alternates: { types: {} },
  };
}
