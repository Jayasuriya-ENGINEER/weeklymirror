import {
  getWeekStart,
  getWeekEnd,
  getWeekNumber,
  getWeekKey,
  formatDate,
} from "../utils/weekUtils";

import {
  createEdition,
  getEditionByWeekKey,
  incrementEditionStats,
} from "../services/editionService";
import { getWeekMemories } from "@/services/memoryService";



export const syncEdition = async (userId: string, memoryDate: string) => {

    const date = new Date(memoryDate);

    const weekStart = getWeekStart(date);

    const weekEnd = getWeekEnd(date);

    const issueNumber = getWeekNumber(date);

    const weekKey = getWeekKey(date);


    console.log("===============");
    console.log("TODAY:", memoryDate);
    console.log("WEEK KEY:", weekKey);
    console.log("ISSUE:", issueNumber);
    console.log("START:", formatDate(weekStart));
    console.log("END:", formatDate(weekEnd));


    const { data: edition } = await getEditionByWeekKey(userId, weekKey);

    console.log("FOUND EDITION:", edition);

    const { data: weekMemories } = await getWeekMemories(
      userId,
      formatDate(weekStart),
      formatDate(weekEnd),
    );

    const memoryCount = weekMemories?.length ?? 0;

    const uniqueDays = new Set(
      weekMemories?.map((memory) => memory.memory_date),
    );

    const capturedDays = uniqueDays.size;

    if (!edition) {
      const { data, error } = await createEdition({
        user_id: userId,

        issue_number: issueNumber,

        week_key: weekKey,

        start_date: formatDate(weekStart),

        end_date: formatDate(weekEnd),

        display_month: weekEnd.getMonth() + 1,

        display_year: weekEnd.getFullYear(),

        captured_days: capturedDays,
        memory_count: memoryCount,

        status: "draft",
      });

      console.log("Created new edition:", data, error);
    } else {
      if (edition.status === "completed") {
        console.log("Edition already published. Skipping update.");
        return;
      }

      const { data, error } = await incrementEditionStats(
        edition.id,
        capturedDays,
        memoryCount,
      );

      console.log("Updated edition:", data, error);
    }
      
      


  console.log({
    weekKey,
    issueNumber,
    capturedDays,
    memoryCount,
  });

};



export const syncCurrentEdition = async (userId: string) => {
  const today = new Date();

  await syncEdition(userId, formatDate(today));
};
