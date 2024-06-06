import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import ProductCard from "@/app/components/ProductCard";

interface Params {
  postslug: string;
}

export default async function Page({ params }: { params: Params }) {
  const { postslug } = params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, title, image_url, content")
    .eq("slug", postslug)
    .single();

  if (!post) {
    notFound();
  }

  const { data: afflinks } = await supabase
    .from("affiliate_links_view")
    .select("*")
    .eq("blog_post_id", post.id);

  return (
    <div className="flex flex-col lg:flex-row space-x-5">
      <div>
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
      </div>
      <div className="relative -left-6 md:left-0">
        <article className="prose">
          <h2>Passende Produkte</h2>
          {afflinks?.map((el: any) => (
            <ProductCard
              key={el.link}
              title={el.title}
              link={el.link}
              image_url={el.image_url}
            />
          ))}
        </article>
      </div>
    </div>
  );
}
