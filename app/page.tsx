import Link from "@/components/Link";

export type Metadata = {
  title: string;
  description: string;
  alternates: {
    types: Record<string, string>;
  };
};

export const metadata: Metadata = {
  title: "이승건의 블로그",
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
    <div className="relative -top-[10px] flex flex-col gap-y-4">
      <div className="w-full border-b-[1px] border-gray-400 pb-8">
        <p>소프트웨어 개발자 입니다.</p>
        <p>기술을 통해 좋은 세상을 만듭니다.</p>
        <p>
          현재는 AI 스타트업 Blux 에서 Head of Engineering로 일하고 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-y-8 pt-6">
        <Link
          href="/blog"
          className="text-[20px] font-bold underline text-[--khaki]"
        >
          블로그
        </Link>
      </div>
    </div>
  );
}
