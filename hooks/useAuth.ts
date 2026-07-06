import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const setSession = useAuthStore((state) => state.setSession);

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const setLoading = useAuthStore((state) => state.setLoading);
  
  useEffect(() => {
    const loadSession = async () => {
     
      const { data } = await supabase.auth.getSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("AUTH EVENT:", event);
        console.log("SESSION:", session?.user?.email);

        if (session) {
          setSession(session);
          setUser(session.user);
        } else {
          clearAuth();
        }
      },
    );

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

       setLoading(false);
    };

    loadSession();

 const { data: listener } = supabase.auth.onAuthStateChange(
   (event, session) => {
     console.log("AUTH EVENT:", event);
     console.log("SESSION:", session?.user?.email);

     if (session) {
       setSession(session);
       setUser(session.user);
     } else {
       clearAuth();
     }
   },
 );

   console.log("useAuth mounted");

    return () => {
      listener.subscription.unsubscribe();
    };

    
  }, []);
};
