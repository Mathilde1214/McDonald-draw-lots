import type { TodayCampaign } from "@/lib/campaign-parse";

const TOKEN_KEY = "jinhong-mcd-token.v1";
const CACHE_KEY = "jinhong-campaign.v1";

export type CampaignCache = {
  day: string;
  campaign: TodayCampaign | null;
};

export function loadMcdToken() {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function saveMcdToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token.trim());
  localStorage.removeItem(CACHE_KEY);
}

export function clearMcdToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CACHE_KEY);
}

export function clearCampaignCache() {
  localStorage.removeItem(CACHE_KEY);
}

export function loadCampaignCache(day: string): CampaignCache | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CampaignCache;
    if (parsed.day !== day) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveCampaignCache(day: string, campaign: TodayCampaign | null) {
  const value: CampaignCache = { day, campaign };
  localStorage.setItem(CACHE_KEY, JSON.stringify(value));
}
