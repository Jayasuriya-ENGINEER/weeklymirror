import { useEffect } from "react";
import { supabase } from "../lib/supabase";

import { useAuthStore } from "../stores/authStore";
import { useProfileStore } from "../stores/profileStore";

const SESSION_RESTORE_TIMEOUT_MS = 5_000;

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setSession = useAuthStore((state) => state.setSession);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  const setProfile = useProfileStore((state) => state.setProfile);
  const clearProfile = useProfileStore((state) => state.clearProfile);

  const fetchProfile = async (userId: string) => {
    try {
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
      console.log("PROFILE FROM DB:", data);
    } catch (error) {
      console.warn("Unable to load the user profile:", error);
    }
  };

  useEffect(() => {
    let sessionRestoreTimeout: ReturnType<typeof setTimeout> | undefined;

    const loadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.warn("Unable to restore the saved session:", error);
          clearAuth();
          clearProfile();
          return;
        }

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          void fetchProfile(data.session.user.id);
        } else {
          clearAuth();
          clearProfile();
        }
      } catch (error) {
        console.warn("Unable to restore the saved session:", error);
        clearAuth();
        clearProfile();
      } finally {
        if (sessionRestoreTimeout) clearTimeout(sessionRestoreTimeout);
        setLoading(false);
      }
    };

    // Never leave the startup UI blocked if local storage or an expired-token
    // refresh stalls. A later auth event can still restore the session.
    sessionRestoreTimeout = setTimeout(() => {
      setLoading(false);
    }, SESSION_RESTORE_TIMEOUT_MS);

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("SESSION:", session?.user?.email);

        if (session) {
          setSession(session);
          setUser(session.user);
          void fetchProfile(session.user.id);
        } else {
          clearAuth();
          clearProfile();
        }

        if (sessionRestoreTimeout) clearTimeout(sessionRestoreTimeout);
        setLoading(false);
      },
    );

    return () => {
      if (sessionRestoreTimeout) clearTimeout(sessionRestoreTimeout);
      listener.subscription.unsubscribe();
    };
  }, []);
};
