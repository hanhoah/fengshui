import Image from "next/image";

type Product = {
  image_url: string;
  title: string;
  link: string;
};

export default function ProductCard(product: Product) {
  return (
    <a href={product.link} target="_blank">
      <div className="card w-96 bg-base-100 hover:border-2 shadow-xl mt-5 z-0">
        <figure>
          <Image
            src={product.image_url}
            alt={product.title}
            width={200}
            height={200}
            className="w-auto h-full"
            quality={40}
            placeholder="blur"
            blurDataURL={product.image_url}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
        </div>
      </div>
    </a>
  );
}
