import { notFound } from "next/navigation";
import ProductCardsList from "@/app/components/ProductCardsList";
import BlogPost from "@/app/components/BlogPost";
import BlogCardsList from "@/app/components/BlogCardsList";
import { Metadata } from "next";
import { fetchBlogPost, fetchSimilarBlogPosts } from "@/lib/blog";

interface Params {
  postslug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { postslug } = params;
  let post = await fetchBlogPost(postslug);
  if (!post) {
    notFound();
  }
  return {
    title: post.title,
    description: post.content,
  };
}

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({ params }: { params: Params }) {
  const { postslug } = params;

  let post = await fetchBlogPost(postslug);
  if (!post) {
    notFound();
  }

  const similarBlogPosts = await fetchSimilarBlogPosts(post.catslug, postslug);

  return (
    <>
      <div className="flex flex-col lg:flex-row space-x-5">
        <BlogPost key={postslug} post={post} />
        <div className="">
          <ProductCardsList postid={post.id} />
          <div className="prose m-5">
            <h2>Weitere Posts: </h2>
          </div>
          <BlogCardsList posts={similarBlogPosts} />
        </div>
      </div>
    </>
  );
}
