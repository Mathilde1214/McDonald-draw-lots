import { createServerFn } from "@tanstack/react-start";
import type { CampaignResult } from "@/lib/campaign-parse";

const TOKEN = /^[A-Za-z0-9._\-+=/]{8,400}$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export type { CampaignResult };

export const fetchTodayCampaign = createServerFn({ method: "POST" })
  .validator((input: { token: string; day: string }) => {
    const token = input.token.trim().replace(/^Bearer\s+/i, "");
    if (!TOKEN.test(token) || !DAY.test(input.day)) {
      throw new Error("bad campaign request");
    }
    return { token, day: input.day };
  })
  .handler(async ({ data }): Promise<CampaignResult> => {
    const { loadTodayCampaign } = await import("./mcd-campaign.server");
    return loadTodayCampaign(data.token, data.day);
  });
