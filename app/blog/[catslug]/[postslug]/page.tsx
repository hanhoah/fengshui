import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductCardsList from "@/app/components/ProductCardsList";
import BlogPost from "@/app/components/BlogPost";
import BlogCardsList from "@/app/components/BlogCardsList";

interface Params {
  postslug: string;
}

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({ params }: { params: Params }) {
  const { postslug } = params;

  const { data: post } = await supabase
    .from("blog_posts_categories_view")
    .select("id,title, image_url, content, postslug, catslug")
    .eq("postslug", postslug)
    .single();

  if (!post) {
    notFound();
  }

  const { data: moreposts } = await supabase
    .from("blog_posts_categories_view")
    .select("id,title, image_url, content, postslug, catslug")
    .eq("catslug", post.catslug)
    .neq("postslug", postslug)
    .limit(5);

  return (
    <>
      <div className="flex flex-col lg:flex-row space-x-5">
        <BlogPost key={postslug} post={post} />
        <div className="">
          <ProductCardsList postid={post.id} />
          <div className="prose m-5">
            <h2>Weitere Posts: </h2>
          </div>
          <BlogCardsList posts={moreposts} />
        </div>
      </div>
    </>
  );
}
