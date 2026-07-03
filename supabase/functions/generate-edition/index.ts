import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenAI } from "https://esm.sh/@google/genai";




function cleanJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}


serve(async (req) => {
  try {
    const { editionId } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const ai = new GoogleGenAI({
      apiKey: Deno.env.get("GEMINI_API_KEY")!,
    });

    const { data: edition, error: editionError } = await supabase
      .from("weekly_editions")
      .select("*")
      .eq("id", editionId)
      .single();

    if (editionError) throw editionError;

    const { data: memories, error: memoryError } = await supabase
      .from("memories")
      .select("*")
      .eq("user_id", edition.user_id)
      .gte("memory_date", edition.start_date)
      .lte("memory_date", edition.end_date)
      .order("memory_date");


 
      const coverImage = memories.find((m) => m.image_url)?.image_url ?? null;




      const imageMap = new Map<string, string | null>();

for (const memory of memories) {
  if (memory.image_url) {
    imageMap.set(memory.memory_date, memory.image_url);
  }
}




    if (memoryError) throw memoryError;


 const grouped = new Map<string, any[]>();

 for (const memory of memories) {
   if (!grouped.has(memory.memory_date)) {
     grouped.set(memory.memory_date, []);
   }

   grouped.get(memory.memory_date)!.push(memory);
 }

 let memoryText = "";

 for (const [date, dayMemories] of grouped) {
   memoryText += `\n=========================\n`;
   memoryText += `DATE: ${date}\n\n`;
   dayMemories.forEach((memory, index) => {
     memoryText += `Memory ${index + 1}\n`;
     memoryText += `${memory.content}\n`;
     memoryText += `Photo Attached: ${memory.image_url ? "Yes" : "No"}\n\n`;
   });
 }

    console.log(memoryText);


    const prompt = `
You are the personal editor of WeeklyMirror.

Your job is to transform one week's memories into a beautifully written personal weekly newspaper.

IMPORTANT WRITING STYLE

- Write entirely in FIRST PERSON.
- Always use "I", "me", and "my".
- Never write "he", "she", "they", or "the user".
- Write as if these are my own reflections.

Tone

- Warm
- Personal
- Reflective
- Optimistic
- Natural

Do not invent events.

Improve grammar and storytelling, but stay faithful to the memories.

If several memories happen on the same day, combine them into one natural story instead of listing each memory.

The result should feel like reading my own weekly diary that has been professionally edited.


Return exactly this structure:

{
  "weekTitle": "",
  "weekSummary": "",
  "quote": "",
  "mood": "",
  "reflection": "",
  "days": [
    {
      "date": "",
      "title": "",
      "summary": "",
       "mood": "",
       "highlight": ""
    }
  ]
}

Weekly Memories

${memoryText}
`;



const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

const aiResponse = cleanJson(result.text ?? "");
const editionJson = JSON.parse(aiResponse);

await supabase
  .from("weekly_editions")
  .update({
    title: editionJson.weekTitle,
    summary: editionJson.weekSummary,
    quote: editionJson.quote,
    reflection: editionJson.reflection,
    status: "completed",
    ai_generated: true,
    generated_at: new Date().toISOString(),
    cover_image: coverImage,
  })
  .eq("id", editionId);

  await supabase
    .from("weekly_day_articles")
    .delete()
    .eq("edition_id", editionId);

console.log(JSON.stringify(editionJson.days, null, 2));

for (const day of editionJson.days) {
  console.log("INSERTING:", day);

const { data, error } = await supabase.from("weekly_day_articles").insert({
  edition_id: editionId,
  article_date: day.date,
  title: day.title,
  summary: day.summary,
  image_url: imageMap.get(day.date) ?? null,
});

  console.log(data, error);
}

    return new Response(
  JSON.stringify({
    success: true,
    editionJson,
  }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
