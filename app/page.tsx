"use client";

import { getPosts } from "@/utils/supabase/posts";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import extractFirstParagraph from "@/utils/helper";
import Image from "next/image";

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
              <div key={post.id}>
                <a href={`/blog/${post.catslug}/${post.postslug}`}>
                  <div className="card card-compact w-80 bg-base-100 shadow-xl mb-10">
                    <figure>
                      <Image
                        width={350}
                        height={350}
                        src={post.image_url}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{post.title}</h2>
                      <p>{extractFirstParagraph(post.content)}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
