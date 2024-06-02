"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function Page() {
  const { id } = useParams();
  const { catid } = useParams<{ catid: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof catid === "string" && typeof id === "string") {
      fetchPost(catid, id);
    } else if (Array.isArray(catid) && Array.isArray(id)) {
      fetchPost(catid[0], id[0]);
    }
  }, [catid, id]);

  const fetchPost = async (catid: string, id: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", id)
      .single();

    if (error) {
      console.error("Error fetching post:", error.message);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  interface Post {
    title: string;
    image_url: string;
    content: string;
  }

  return (
    <div>
      {loading ? (
        <div>lade ...</div>
      ) : (
        <article className="prose">
          {post && post.title && <h1>{post.title}</h1>}

          {post && post.image_url && (
            <Image
              src={post.image_url}
              alt={post.title}
              width={500}
              height={500}
            />
          )}

          {post && post.content && (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </article>
      )}
    </div>
  );
}
