import { metadata } from "../page";
import { generateFeed } from "../feed";
import { getPosts } from "@/app/page";

export async function GET() {
  const posts = await getPosts();
  const feed = generateFeed(posts, metadata);
  return new Response(feed.atom1());
}
