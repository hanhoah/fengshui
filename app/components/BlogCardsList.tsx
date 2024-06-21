import React from "react";
import BlogCard from "@/app/components/BlogCard";
import { Post } from "@/types/Post";

export default async function BlogCardsList({
  posts,
  direction = "vertical",
}: {
  posts: Post[] | null;
  direction?: "horizontal" | "vertical";
}) {
  // vertical as default
  let coltailwindClasses = "flex flex-col md:flex-col";

  if (direction == "horizontal") {
    coltailwindClasses =
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4";
  }
  return (
    <>
      <section className="m-0 p-0 w-full ">
        <div className={coltailwindClasses}>
          {posts?.map((post) => (
            <div key={post.postslug}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
