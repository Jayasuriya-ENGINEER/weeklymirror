import { supabase } from "../lib/supabase";

export const generateEdition = async (editionId: string) => {
  const response = await supabase.functions.invoke("generate-edition", {
    body: { editionId },
  });

  console.log("RAW RESPONSE:", response);

  if (response.error) {
    console.log("ERROR NAME:", response.error.name);
    console.log("ERROR MESSAGE:", response.error.message);

    if ("context" in response.error && response.error.context) {
      console.log("SERVER BODY:", await response.error.context.text());
    }

    throw response.error;
  }

  return response.data;
};
