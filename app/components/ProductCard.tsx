import Image from "next/image";

type Product = {
  image_url: string;
  title: string;
  link: string;
};

export default function ProductCard(product: Product) {
  return (
    <a href={product.link} target="_blank">
      <div className="card w-96 bg-base-100 shadow-xl mt-5">
        <figure>
          <Image src={product.image_url} alt={product.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Amazon</button>
          </div>
        </div>
      </div>
    </a>
  );
}
