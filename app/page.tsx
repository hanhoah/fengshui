import BlogCardsList from "./components/BlogCardsList";
import { supabase } from "@/lib/supabaseClient";

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
  console.log("query", query);
  let posts; // Variable außerhalb der Bedingung definieren

  if (!query || query.length < 3) {
    const { data } = await supabase
      .from("blog_posts_categories_view")
      .select("id,title, image_url, content, postslug, catslug")
      .eq("homepage", "true");
    posts = data; // post in beiden Zweigen definieren
  } else {
    const { data } = await supabase
      .from("blog_posts_categories_view")
      .select("id,title, image_url, content, postslug, catslug")
      .eq("homepage", "true")
      .textSearch("fts", query, { config: "german" });
    posts = data; // post in beiden Zweigen definieren
  }

  console.log("posts", posts);

  return (
    <>
      <BlogCardsList direction="horizontal" posts={posts} />
    </>
  );
}
