import { supabase } from "@/lib/supabaseClient";
import BlogCardsList from "@/app/components/BlogCardsList";

interface Params {
  catslug: string;
}

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({ params }: { params: Params }) {
  const { catslug } = params;

  const { data } = await supabase
    .from("blog_posts_categories_view")
    .select("id,title, image_url, content, postslug, catslug")
    .eq("catslug", catslug)
    .limit(25);

  return (
    <>
      <BlogCardsList posts={data} direction="horizontal" />
    </>
  );
}
