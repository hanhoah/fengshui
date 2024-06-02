"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Post } from "@/types/Post";

export default function Page() {
  const params = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params && params.catid) {
      if (typeof params.catid === "string") {
        fetchCategory(params.catid);
        fetchPosts(params.catid);
      } else if (Array.isArray(params.catid)) {
        fetchCategory(params.catid[0]);
        fetchPosts(params.catid[0]);
      }
    }
  }, [params]);

  const fetchCategory = async (catid: string) => {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("name")
      .eq("slug", catid)
      .single();

    if (error) {
      console.error("Error fetching category:", error.message);
    } else {
      setCategoryName(data.name);
    }
  };

  const fetchPosts = async (catid: string) => {
    const { data: categoryData, error: categoryError } = await supabase
      .from("blog_categories")
      .select("id")
      .eq("slug", catid)
      .single();

    if (categoryError) {
      console.error("Error fetching category ID:", categoryError.message);
      setLoading(false);
      return;
    }

    const categoryId = categoryData.id;

    const { data: postData, error: postError } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category_id", categoryId);

    if (postError) {
      console.error("Error fetching posts:", postError.message);
    } else {
      setPosts(postData);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>{categoryName}</h1>
      {loading ? (
        <div role="alert" className="alert alert-info w-36">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Bitte warten...</span>
        </div>
      ) : (
        <ul className="join join-vertical">
          {posts.map((post) => (
            <li className="btn join-item" key={post.id}>
              <h2>
                <Link href={`/blog/${params.catid}/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
