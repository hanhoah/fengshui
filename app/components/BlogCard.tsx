import React from "react";
import { Post } from "@/types/Post";
import Image from "next/image";
import extractFirstParagraph from "@/utils/helper";

function BlogCard({ post }: { post: Post }) {
  return (
    <div key={post.postslug}>
      <a href={`/blog/${post.catslug}/${post.postslug}`}>
        <div className="card card-compact w-80 bg-base-100 shadow-xl mb-10">
          <figure>
            <Image
              width={350}
              height={350}
              src={post.image_url}
              alt="Shoes"
              quality={20}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p>{extractFirstParagraph(post.content)}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default BlogCard;