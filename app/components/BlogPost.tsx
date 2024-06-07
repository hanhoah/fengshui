import { Post } from "@/types/Post";
import Image from "next/image";
import React from "react";

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article className="prose">
      {post && post.title && <h1>{post.title}</h1>}

      {post && post.image_url && (
        <Image
          priority
          src={post.image_url}
          alt={post.title}
          width={600}
          height={600}
          quality={50}
        />
      )}

      {post && post.content && (
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </article>
  );
}
