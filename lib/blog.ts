import { supabase } from "@/lib/supabaseClient";

export async function fetchBlogPosts(query: string) {
    if (!query || query.length < 3) {
        const { data } = await supabase
          .from("blog_posts_categories_view")
          .select("id,title, image_url, content, postslug, catslug")
          .eq("homepage", "true");
        return data;
      } else {
        const { data } = await supabase
          .from("blog_posts_categories_view")
          .select("id,title, image_url, content, postslug, catslug")
          .eq("homepage", "true")
          .textSearch("fts", query, { config: "german" });
        return data;
      }
    }

    export async function fetchBlogPostsByCategory(catslug: string){
        const { data } = await supabase
        .from("blog_posts_categories_view")
        .select("id,title, image_url, content, postslug, catslug")
        .eq("catslug", catslug)
        .limit(25);
        return data;
    }

    export async function fetchBlogPost(postslug: string){
        const { data } = await supabase
        .from("blog_posts_categories_view")
        .select("id,title, image_url, content, postslug, catslug")
        .eq("postslug", postslug)
        .single();
        return data;
    }

    export async function fetchSimilarBlogPosts(catslug: string, postslug: string){
        const { data } = await supabase
        .from("blog_posts_categories_view")
        .select("id,title, image_url, content, postslug, catslug")
        .eq("catslug", catslug)
        .neq("postslug", postslug)
        .limit(5);
        return data
    }