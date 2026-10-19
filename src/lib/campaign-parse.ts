export type TodayCampaign = {
  title: string;
  blurb: string;
};

export type CampaignResult =
  | { ok: true; campaign: TodayCampaign | null }
  | { ok: false; reason: "unauthorized" | "unavailable" };

function clean(value: string) {
  return value
    .replace(/\\/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pickField(block: string, name: string) {
  const patterns = [
    new RegExp(`\\*\\*${name}\\*\\*\\s*\\n?\\s*[：:]\\s*([^\\n]+)`),
    new RegExp(`${name}\\s*[：:]\\s*([^\\n]+)`),
  ];
  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match?.[1]) return match[1];
  }
  return "";
}

function dayLabel(day: string) {
  const [, month, date] = day.split("-");
  return `${Number(month)}月${Number(date)}日`;
}

function headingOf(part: string) {
  return part.split("\n")[0] ?? "";
}

export function parseTodayCampaign(text: string, day: string): TodayCampaign | null {
  const label = dayLabel(day);
  const sections = text.split(/\n(?=####\s)/);
  const section =
    sections.find((part) => {
      const heading = headingOf(part);
      return heading.includes(label) && heading.includes("今日");
    }) ??
    sections.find((part) => headingOf(part).includes(label)) ??
    sections.find((part) => {
      const heading = headingOf(part);
      return heading.includes("今日") && !heading.includes("往期");
    }) ??
    "";
  if (!section) return null;

  const chunks = section.split(/\n-\s*(?:\n|$)/).filter((chunk) => chunk.includes("活动标题"));
  const source = chunks.length > 0 ? chunks : [section];
  for (const chunk of source) {
    const title = clean(pickField(chunk, "活动标题")).slice(0, 48);
    if (!title) continue;
    const blurb = clean(pickField(chunk, "活动内容介绍")).slice(0, 90);
    return { title, blurb };
  }
  return null;
}

export function campaignTextFromRpc(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const result = (payload as { result?: unknown }).result;
  if (!result || typeof result !== "object") return "";
  const content = (result as { content?: unknown }).content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (!part || typeof part !== "object") return "";
      const text = (part as { text?: unknown }).text;
      return typeof text === "string" ? text : "";
    })
    .filter(Boolean)
    .join("\n");
}

export function rpcFailed(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;
  if ("error" in payload && (payload as { error?: unknown }).error) return true;
  const result = (payload as { result?: { isError?: boolean } }).result;
  return !!result?.isError;
}
