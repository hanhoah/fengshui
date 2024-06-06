"use client";

import { getPosts } from "@/utils/supabase/posts";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import BlogCard from "./components/BlogCard";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts("homepage", true).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="m-0 p-0 w-full">
        {loading ? (
          <div>
            <div className="skeleton w-32 h-4 mb-5"></div>
            <div className="skeleton w-32 h-32"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-5">
            {posts.map((post) => (
              <BlogCard key={post.postslug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
