import { sans } from "@/components/fonts";
import "./blog/[slug]/markdown.css";

export default function NotFound() {
  return (
    <article className="markdown">
      <h1
        className={[
          sans.className,
          "text-[40px] font-black leading-[44px] text-[--title]",
        ].join(" ")}
      >
        404 Not Found
      </h1>
      <div className="markdown mt-10">
        <p>아직 준비 중 이거나 잘못된 페이지 입니다.</p>
      </div>
    </article>
  );
}
