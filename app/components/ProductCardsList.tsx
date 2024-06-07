import React from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductCardsList({ postid }: { postid: number }) {
  const { data: afflinks } = await supabase
    .from("affiliate_links_view")
    .select("*")
    .eq("blog_post_id", postid);

  return (
    <>
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
    </>
  );
}
