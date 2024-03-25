import Link from "../components/Link";

export type Post = {
  date: string;
  spoiler: string;
  slug: string;
  title: string;
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

export default async function Home() {
  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      <Link href="/blog">
        <span>Blog</span>
      </Link>
      <Link href="/notd">
        <span>Blog</span>
      </Link>
      <Link href="/blog">
        <span>Blog</span>
      </Link>
    </div>
  );
}
