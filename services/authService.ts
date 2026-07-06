import { supabase } from "../lib/supabase";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const signInWithGoogle = async () => {
  const redirectTo = AuthSession.makeRedirectUri({
    scheme: "weeklymirror",
  });

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

  if (result.type === "success") {
    const { url } = result;

    const { data, error } = await supabase.auth.exchangeCodeForSession(url);

    console.log("Exchange:", data, error);
  }

  return result;
};

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "weeklymirror://reset-password",
  });
};