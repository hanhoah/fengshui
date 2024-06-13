import React from "react";
import ProductCard from "@/app/components/ProductCard";
import { fetchAffiliateLinks } from "@/lib/affiliate";

export default async function ProductCardsList({ postid }: { postid: number }) {
  const afflinks = await fetchAffiliateLinks(postid);
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
