import BlogCardsList from "./components/BlogCardsList";
import { supabase } from "@/lib/supabaseClient";

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page() {
  const { data: posts } = await supabase
    .from("blog_posts_categories_view")
    .select("id,title, image_url, content, postslug, catslug")
    .eq("homepage", "true");

  return (
    <>
      <BlogCardsList direction="horizontal" posts={posts} />
    </>
  );
}
