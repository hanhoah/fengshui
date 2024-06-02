"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default function Page() {
  const { catid, id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (catid && id) {
      fetchPost(catid, id);
    }
  }, [catid, id]);

  const fetchPost = async (catid, id) => {
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

  return (
    <div>
      {loading ? (
        <div>lade ...</div>
      ) : (
        <article class="prose">
          <h1>{post.title}</h1>
          <Image
            src={post.image_url}
            alt={post.title}
            width={500}
            height={500}
          />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      )}
    </div>
  );
}
