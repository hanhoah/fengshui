"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Post } from "@/types/Post";

export default function Page() {
  const params = useParams();
  const catslug = params.catslug;
  const [categoryName, setCategoryName] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && params.catslug) {
      if (typeof params.catslug === "string") {
        fetchPosts(params.catslug);
      } else if (Array.isArray(params.catslug)) {
        fetchPosts(params.catslug[0]);
      }
    }
  }, [params]);

  const fetchPosts = async (catslug: string) => {
    const { data: postData, error: postError } = await supabase
      .from("blog_posts_categories_view")
      .select("*")
      .eq("catslug", catslug);

    if (postError) {
      console.error("Error fetching posts:", postError.message);
    } else {
      setPosts(postData);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div>
          <div className="skeleton w-32 h-4 mb-5"></div>
          <div className="skeleton w-32 h-32"></div>
        </div>
      ) : (
        <div>
          <h1>{categoryName}</h1>
          <ul className="join join-vertical">
            {posts.map((post) => (
              <li className="btn join-item" key={post.id}>
                <h2>
                  <Link href={`/blog/${params.catslug}/${post.postslug}`}>
                    {post.title}
                  </Link>
                </h2>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
