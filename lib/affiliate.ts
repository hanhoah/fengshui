import { supabase } from "@/lib/supabaseClient";

export async function fetchAffiliateLinks(postid: number) {
  const { data } = await supabase
    .from("affiliate_links_view")
    .select("*")
    .eq("blog_post_id", postid);
  return data;
}