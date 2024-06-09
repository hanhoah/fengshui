// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
// import { Database } from "../types/supabase";
// import { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function searchPosts(searchTerm) {
  // prüfen ob mehrere Suchbegriffe eingegeben wurden
  let anzahl = searchTerm.split(" ").length;
  // wenn mehr als ein begriff dann mit & verknüpfen
  if (anzahl > 1) searchTerm = searchTerm.split(" ").join(" | ");
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .textSearch("fts", searchTerm, { type: "websearch", config: "german" })
    .limit(30);

  if (error) {
    throw error;
  }

  return data;
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
