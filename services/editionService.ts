import { supabase } from "../lib/supabase";

export const createEdition = async (edition: {
  user_id: string;

  issue_number: number;

  week_key: string;

  start_date: string;

  end_date: string;

  display_month: number;

  display_year: number;

  captured_days: number;

  memory_count: number;

  status?: string;
}) => {
  return await supabase.from("weekly_editions").insert([edition]);
};

export const getEditions = async (
  userId: string,
  month: number,
  year: number,
) => {
  return await supabase
    .from("weekly_editions")
    .select("*")
    .eq("user_id", userId)
    .eq("display_month", month)
    .eq("display_year", year)
    .order("issue_number");
};

export const updateEdition = async (id: string, values: any) => {
  return await supabase.from("weekly_editions").update(values).eq("id", id);
};

export const deleteEdition = async (id: string) => {
  return await supabase.from("weekly_editions").delete().eq("id", id);
};

export const getEditionByWeekKey = async (userId: string, weekKey: string) => {
  return await supabase
    .from("weekly_editions")
    .select("*")
    .eq("user_id", userId)
    .eq("week_key", weekKey)
    .maybeSingle();
};

export const incrementEditionStats = async (
  id: string,
  capturedDays: number,
  memoryCount: number,
) => {
  return await supabase
    .from("weekly_editions")
    .update({
      captured_days: capturedDays,
      memory_count: memoryCount,
    })
    .eq("id", id);
};

export const getEdition = async (id: string) => {
  return await supabase
    .from("weekly_editions")
    .select("*")
    .eq("id", id)
    .single();
};