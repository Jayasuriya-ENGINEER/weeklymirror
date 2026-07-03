import { supabase } from "../lib/supabase";
import * as FileSystem from "expo-file-system";
import { File } from "expo-file-system";

export const createMemory = async (
  userId: string,
  content: string,
  imageUrl?: string,
  memoryDate?: string,
) => {
  return await supabase.from("memories").insert([
    {
      user_id: userId,
      content,
      image_url: imageUrl ?? null,
      memory_date: memoryDate,
    },
  ]);
};

export const uploadImage = async (imageUri: string) => {
  try {
    const fileName = `${Date.now()}.jpg`;

    const file = new File(imageUri);

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("memories")
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
      });

    if (error) {
      return {
        error,
        publicUrl: null,
      };
    }

    const { data } = supabase.storage.from("memories").getPublicUrl(fileName);

    return {
      error: null,
      publicUrl: data.publicUrl,
    };
  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    return {
      error,
      publicUrl: null,
    };
  }
};

// this is for takeing the home feed highlights
export const getMemories = async (userId: string, limit = 10) => {
  return await supabase
    .from("memories")
    .select("*")
    .eq("user_id", userId)
    .order("memory_date", {
      ascending: false,
    })
    .limit(limit);
};

//this is just for getting the date they uploaded with descending order ( that is last in first out)

export const getUserMemoryDates = async (userId: string) => {
  return await supabase.from("memories").select("memory_date");
};

export const getWeeklyMemories = async (userId: string) => {
  return await supabase
    .from("memories")
    .select("memory_date")
    .eq("user_id", userId);
};

export const getMemoryById = async (memoryId: string) => {
  return await supabase
    .from("memories")
    .select("*")
    .eq("id", memoryId)
    .single();
};

//this is for getting the memory by day sorting and this is used in the week tracker section
export const getMemoriesByDate = async (userId: string, memoryDate: string) => {
  return await supabase
    .from("memories")
    .select("*")
    .eq("user_id", userId)
    .eq("memory_date", memoryDate)
    .order("created_at", {
      ascending: true,
    });
};

export const deleteMemory = async (memoryId: string) => {
  return await supabase.from("memories").delete().eq("id", memoryId).select();
};

export const updateMemory = async (memoryId: string, content: string) => {
  return await supabase
    .from("memories")
    .update({
      content,
    })
    .eq("id", memoryId)
    .select();
};


//from here it isx allocated for the rack section

export const getMemoriesForMonth = async (
  userId: string,
  year: number,
  month: number,
) => {
  const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

  const lastDay = new Date(year, month, 0).getDate();

  const endDate = `${year}-${String(month).padStart(2, "0")}-${String(
    lastDay,
  ).padStart(2, "0")}`;

  return await supabase
    .from("memories")
    .select("*")
    .eq("user_id", userId)
    .gte("memory_date", startDate)
    .lte("memory_date", endDate)
    .order("memory_date", {
      ascending: true,
    });
};

//this is reorde the rack with the specific func, i.e memory_count == caputure days
export const getWeekMemories = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  return await supabase
    .from("memories")
    .select("memory_date")
    .eq("user_id", userId)
    .gte("memory_date", startDate)
    .lte("memory_date", endDate);
};

export const getMemoriesBetweenDates = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  return await supabase
    .from("memories")
    .select("*")
    .eq("user_id", userId)
    .gte("memory_date", startDate)
    .lte("memory_date", endDate)
    .order("memory_date", { ascending: true })
    .order("created_at", { ascending: true });
};

