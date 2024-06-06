import React from "react";
import BlogCard from "@/app/components/BlogCard";
import { supabase } from "@/lib/supabaseClient";

export default async function BlogCardsList({
  schluessel,
  wert,
}: {
  schluessel: string;
  wert: string;
}) {
  const { data: posts } = await supabase
    .from("blog_posts_categories_view")
    .select("*")
    .eq(schluessel, wert);

  console.log(schluessel, wert, posts);

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
