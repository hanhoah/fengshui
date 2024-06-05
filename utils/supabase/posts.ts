import { supabase } from "@/lib/supabaseClient";

export async function getPosts(field: string, value: any) {
  const { data, error } = await supabase
    .from("blog_posts_categories_view")
    .select("*")
    .eq(field, value);

  if (error) {
    throw new Error("Error fetching posts: " + error.message);
  }

  return data;
}
