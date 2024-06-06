import { supabase } from "@/lib/supabaseClient";
import BlogCard from "@/app/components/BlogCard";

interface Params {
  catslug: string;
}

export default async function Page({ params }: { params: Params }) {
  const { catslug } = params;

  const { data: posts } = await supabase
    .from("blog_posts_categories_view")
    .select("*")
    .eq("catslug", catslug);

  return (
    <>
      <section className="m-0 p-0 w-full">
        <div className="flex flex-col md:flex-row md:space-x-5">
          {posts?.map((post) => (
            <BlogCard key={post.postslug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
