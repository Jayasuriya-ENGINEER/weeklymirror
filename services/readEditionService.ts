import { supabase } from "../lib/supabase";

export const getEdition = async (id: string) => {
  return await supabase
    .from("weekly_editions")
    .select("*")
    .eq("id", id)
    .single();
};

export const getEditionArticles = async (editionId: string) => {
  return await supabase
    .from("weekly_day_articles")
    .select("*")
    .eq("edition_id", editionId)
    .order("article_date", {
      ascending: true,
    });
};
