import BlogCardsList from "@/app/components/BlogCardsList";
import { fetchBlogPostsByCategory } from "@/lib/blog";

interface Params {
  catslug: string;
}

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({ params }: { params: Params }) {
  const { catslug } = params;
  let data = await fetchBlogPostsByCategory(catslug);

  return (
    <>
      <BlogCardsList posts={data} direction="horizontal" />
    </>
  );
}
