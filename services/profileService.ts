import { supabase } from "../lib/supabase";
import { File } from "expo-file-system";


export const uploadProfileImage = async (userId: string, imageUri: string) => {
  try {
    const path = `${userId}/profile.jpg`;

    const file = new File(imageUri);

    const arrayBuffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

      if (error) {
        console.log("UPLOAD ERROR:", error);
      }

    if (error) {
      return {
        error,
        avatarUrl: null,
      };
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);

    return {
      error: null,
      avatarUrl: data.publicUrl,
    };
  } catch (error) {
    console.log(error);

    return {
      error,
      avatarUrl: null,
    };
  }
};

export const saveProfile = async (
  userId: string,
  name: string,
  avatarUrl: string | null,
) => {
  try {

    const existing = await supabase
  .from("profiles")
  .select("id")
  .eq("id", userId)
  .maybeSingle();

console.log("Existing profile:", existing.data);

    const response = await supabase.from("profiles").upsert(
  {
    id: userId,
    name,
    avatar_url: avatarUrl,
  },
  {
    onConflict: "id",
  }
);

    if (response.error) {
      console.log("SAVE PROFILE ERROR:", response.error);
    }

    return response;
  } catch (err) {
    console.log("SAVE PROFILE ERROR:", err);
    return { error: err } as any;
  }
};




export const getProfile = async (userId: string) => {
  return await supabase.from("profiles").select("*").eq("id", userId).single();
};

export const updateProfileName = async (userId: string, name: string) => {
  return await supabase
    .from("profiles")
    .update({
      name,
    })
    .eq("id", userId);
};
