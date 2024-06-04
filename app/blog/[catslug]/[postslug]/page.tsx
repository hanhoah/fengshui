"use client";

import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import ProductCard from "@/app/components/ProductCard";

export default function Page() {
  const { postslug } = useParams();
  const { catslug } = useParams<{ catslug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [affiliateLinks, setAffiliateLinks] = useState<any>([]);

  useEffect(() => {
    if (typeof catslug === "string" && typeof postslug === "string") {
      fetchPost(catslug, postslug).then((res) => {
        console.log("res", res);
      });
    } else if (Array.isArray(catslug) && Array.isArray(postslug)) {
      fetchPost(catslug[0], postslug[0]).then((res) => {
        console.log("res", res);
      });
    }
  }, [catslug, postslug]);

  useEffect(() => {
    console.log("post has changed, ", post);
    if (post) {
      fetchAffiliateLinks(post).then((res) => {
        console.log("res", res);
      });
    }
  }, [post]);

  const fetchPost = async (catslug: string, postslug: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", postslug)
      .single();

    if (error) {
      console.error("Error fetching post:", error.message);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  const fetchAffiliateLinks = async (post: Post) => {
    console.log("fetching affiliate links");
    console.log("post", post);
    const { data, error } = await supabase
      .from("affiliate_links_view")
      .select("*")
      .eq("blog_post_id", post.id);
    if (error) {
      console.error("Error fetching affiliate links:", error.message);
    } else {
      setAffiliateLinks(data);
    }
  };

  interface Post {
    id: number;
    title: string;
    image_url: string;
    content: string;
  }

  return (
    <>
      {loading ? (
        <div>lade ...</div>
      ) : (
        <div className="flex flex-col lg:flex-row space-x-5">
          <article className="prose">
            {post && post.title && <h1>{post.title}</h1>}

            {post && post.image_url && (
              <Image
                priority
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

          <article className="prose">
            <h2>Passende Produkte</h2>
            {affiliateLinks.map((el: any) => (
              <ProductCard
                key={el.link}
                title={el.title}
                link={el.link}
                image_url={el.image_url}
              />
            ))}
          </article>
        </div>
      )}
    </>
  );
}
