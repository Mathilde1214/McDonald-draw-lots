import {
  campaignTextFromRpc,
  parseTodayCampaign,
  rpcFailed,
  type CampaignResult,
} from "@/lib/campaign-parse";

const ENDPOINT = "https://mcp.mcd.cn";
const TOOLS = ["campaign-calendar", "campaign-calender"] as const;

function parseRpc(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    const dataLines = trimmed
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .filter((line) => line && line !== "[DONE]");
    for (let i = dataLines.length - 1; i >= 0; i--) {
      try {
        return JSON.parse(dataLines[i] ?? "") as unknown;
      } catch {
        continue;
      }
    }
    return null;
  }
}

async function callTool(token: string, name: string, day: string) {
  const bodies = [{ specifiedDate: day }, {}];
  let last: { status: number; payload: unknown } = { status: 0, payload: null };
  for (const arguments_ of bodies) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name, arguments: arguments_ },
      }),
      signal: AbortSignal.timeout(12000),
    });
    const payload = parseRpc(await response.text());
    last = { status: response.status, payload };
    if (response.status === 401 || response.status === 403) return last;
    if (!rpcFailed(payload)) return last;
  }
  return last;
}

export async function loadTodayCampaign(token: string, day: string): Promise<CampaignResult> {
  try {
    let outcome = await callTool(token, TOOLS[0], day);
    if (outcome.status === 401 || outcome.status === 403) {
      return { ok: false, reason: "unauthorized" };
    }
    if (rpcFailed(outcome.payload)) {
      outcome = await callTool(token, TOOLS[1], day);
    }
    if (outcome.status === 401 || outcome.status === 403) {
      return { ok: false, reason: "unauthorized" };
    }
    if (outcome.status >= 400 || rpcFailed(outcome.payload)) {
      return { ok: false, reason: "unavailable" };
    }
    const text = campaignTextFromRpc(outcome.payload);
    if (!text) return { ok: true, campaign: null };
    return { ok: true, campaign: parseTodayCampaign(text, day) };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
