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

const MENUS = [
  { href: "/blog", label: "Blog" },
  { href: "/book-reviews", label: "Book Reviews" },
  { href: "/about-me", label: "About me" },
];

export default async function Home() {
  return (
    <div className="relative -top-[10px] flex flex-col gap-8">
      <div>
        <p>소프트웨어 개발자 입니다.</p>
        <p>기술을 통해 좋은 세상을 만들고 싶습니다.</p>
        <p>사이트가 아직 미완성입니다. 양해 부탁드립니다.</p>
      </div>
      {MENUS.map(({ href, label }) => (
        <Link href={href} key={label}>
          <span className="underline">{label}</span>
        </Link>
      ))}
    </div>
  );
}
