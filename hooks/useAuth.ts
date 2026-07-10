import { useEffect } from "react";
import { supabase } from "../lib/supabase";

import { useAuthStore } from "../stores/authStore";
import { useProfileStore } from "../stores/profileStore";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  const setProfile = useProfileStore((state) => state.setProfile);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name, avatar_url")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data?.name || "Your Name", data?.avatar_url || null);
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);

        await fetchProfile(data.session.user.id);
      }

      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("SESSION:", session?.user?.email);

        if (session) {
          setSession(session);
          setUser(session.user);

          await fetchProfile(session.user.id);
        } else {
          clearAuth();
          clearProfile();
        }
      },
    );

    console.log("useAuth mounted");

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
};
