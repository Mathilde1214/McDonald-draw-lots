const KEY = "jinhong-night-sign.v1";

export type DrawRecord = {
  day: string;
  omenId: string;
  at: number;
  trust?: boolean;
};

export function loadDraws(): DrawRecord[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is DrawRecord =>
        !!row &&
        typeof row === "object" &&
        typeof (row as DrawRecord).day === "string" &&
        typeof (row as DrawRecord).omenId === "string",
    );
  } catch {
    return [];
  }
}

export function saveDraw(day: string, omenId: string, trust = false) {
  const prev = loadDraws();
  const old = prev.find((row) => row.day === day);
  const next = prev.filter((row) => row.day !== day);
  const spent = trust || old?.trust === true;
  next.push({
    day,
    omenId,
    at: Date.now(),
    ...(spent ? { trust: true } : {}),
  });
  next.sort((a, b) => (a.day < b.day ? 1 : -1));
  localStorage.setItem(KEY, JSON.stringify(next.slice(0, 90)));
  return next;
}
