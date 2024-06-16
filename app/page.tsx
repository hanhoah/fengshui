import BlogCardsList from "./components/BlogCardsList";
import { fetchBlogPosts } from "@/lib/blog";

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const posts = await fetchBlogPosts(query);

  return (
    <>
      <BlogCardsList direction="horizontal" posts={posts} />
    </>
  );
}
