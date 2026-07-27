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
  // Inclusive calendar bounds for the selected month (1-based month).
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  // Show any week that overlaps this month (not only display_month).
  // A week like Jul 27–Aug 2 must appear under July while it is in progress;
  // filtering only on display_month (previously week-end month) hid it.
  return await supabase
    .from("weekly_editions")
    .select("*")
    .eq("user_id", userId)
    .lte("start_date", endDate)
    .gte("end_date", startDate)
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