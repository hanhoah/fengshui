import { supabase } from "@/lib/supabaseClient";

export async function getCategories() {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*");

  if (error) {
    throw new Error("Error fetching categories: " + error.message);
  }

  return data;
}
