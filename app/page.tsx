import BlogCardsList from "./components/BlogCardsList";

//By exporting a revalidate variable from our component, we can specify how many seconds we consider this data to be “fresh”.
export const revalidate = 60;

export default async function Page() {
  return (
    <>
      <BlogCardsList schluessel="homepage" wert="true" />
    </>
  );
}
