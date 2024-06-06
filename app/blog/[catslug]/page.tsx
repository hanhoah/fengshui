import BlogCardsList from "@/app/components/BlogCardsList";

interface Params {
  catslug: string;
}

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page({ params }: { params: Params }) {
  const { catslug } = params;

  return (
    <>
      <BlogCardsList schluessel="catslug" wert={catslug} />
    </>
  );
}
