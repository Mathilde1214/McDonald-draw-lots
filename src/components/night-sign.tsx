import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, ScrollText } from "lucide-react";
import type { TodayCampaign } from "@/lib/campaign-parse";
import { fetchTodayCampaign } from "@/lib/campaigns";
import { loadDraws, saveDraw, type DrawRecord } from "@/lib/draws";
import {
  clearCampaignCache,
  clearMcdToken,
  loadCampaignCache,
  loadMcdToken,
  saveCampaignCache,
  saveMcdToken,
} from "@/lib/mcd-token";
import { dayKey, drawOmen, formatDay, omenById, type Omen } from "@/lib/omens";

type Phase = "sealed" | "opening" | "open";
type CampaignState = "need" | "loading" | "ready" | "empty" | "unauthorized" | "unavailable";

const MCD_HOME = "https://www.mcdonalds.com.cn/";
const TOKEN_PAGE = "https://open.mcd.cn/mcp";

export function NightSign() {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [today, setToday] = useState<string | null>(null);
  const [draws, setDraws] = useState<DrawRecord[]>([]);
  const [archive, setArchive] = useState(false);
  const [pastDay, setPastDay] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [linkTick, setLinkTick] = useState(0);
  const [linked, setLinked] = useState(false);
  const [booted, setBooted] = useState(false);
  const [campaign, setCampaign] = useState<TodayCampaign | null>(null);
  const [campaignState, setCampaignState] = useState<CampaignState>("need");

  useEffect(() => {
    const sync = () => {
      const day = dayKey();
      const rows = loadDraws();
      setToday(day);
      setDraws(rows);
      setPhase(rows.some((row) => row.day === day) ? "open" : "sealed");
    };
    sync();
    const id = window.setInterval(sync, 30000);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    setLinked(!!loadMcdToken());
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const todayRow = today ? draws.find((row) => row.day === today) : null;
  const todayOmen = todayRow ? omenById(todayRow.omenId) : null;
  const trustSpent = todayRow?.trust === true;
  const past = pastDay ? draws.find((row) => row.day === pastDay) : null;
  const pastOmen = past ? omenById(past.omenId) : null;
  const readingPast = !archive && !!pastDay && !!pastOmen;
  const shown: Omen | null = readingPast ? pastOmen : phase === "open" ? todayOmen : null;

  useEffect(() => {
    if (!today || phase !== "open" || readingPast) return;
    const token = loadMcdToken();
    if (!token) {
      setLinked(false);
      setCampaign(null);
      setCampaignState("need");
      return;
    }
    const cached = loadCampaignCache(today);
    if (cached) {
      setCampaign(cached.campaign);
      setCampaignState(cached.campaign ? "ready" : "empty");
      return;
    }
    let cancel = false;
    setCampaignState("loading");
    void fetchTodayCampaign({ data: { token, day: today } })
      .then((result) => {
        if (cancel) return;
        if (!result.ok) {
          setCampaign(null);
          setCampaignState(result.reason);
          return;
        }
        saveCampaignCache(today, result.campaign);
        setCampaign(result.campaign);
        setCampaignState(result.campaign ? "ready" : "empty");
      })
      .catch(() => {
        if (!cancel) setCampaignState("unavailable");
      });
    return () => {
      cancel = true;
    };
  }, [today, phase, readingPast, linkTick]);

  function openBag() {
    if (!today || phase === "opening") return;
    const omen = drawOmen();
    const next = saveDraw(today, omen.id);
    setDraws(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("open");
      return;
    }
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 1700);
  }

  async function copyText(text: string, note: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast(note);
    } catch {
      setToast("没有抄上。餐名就在卡片上，可以自己选中。");
    }
  }

  function redraw() {
    if (!today || !todayOmen || trustSpent || phase !== "open" || readingPast) return;
    const omen = drawOmen(todayOmen.id);
    const next = saveDraw(today, omen.id, true);
    setDraws(next);
    setToast("麦神收下了这一点信任。今日换了一张签。");
  }

  function goEat(dish: string) {
    void copyText(dish, `已抄下「${dish}」。到官网搜这一份，再自己下单付款。`);
    window.open(MCD_HOME, "_blank", "noopener,noreferrer");
  }

  function copySlip(omen: Omen, day: string) {
    const lines = [
      `金拱夜签 · ${formatDay(day)}`,
      `征兆：${omen.title}`,
      `咒：${omen.spell}`,
      `今日宜食：${omen.dish}`,
      omen.whisper,
      omen.warmth,
    ];
    if (!readingPast && campaign) {
      lines.push(`今日真活动：${campaign.title}`);
      if (campaign.blurb) lines.push(campaign.blurb);
    }
    lines.push(`今日小奇迹：${omen.miracle}`);
    void copyText(lines.join("\n"), "这张签已抄好，可以贴给自己或别人。");
  }

  function saveToken() {
    const token = draft.trim().replace(/^Bearer\s+/i, "");
    if (!/^[A-Za-z0-9._\-+=/]{8,400}$/.test(token)) {
      setToast("这串密钥不像麦当劳给的那一串。");
      return;
    }
    saveMcdToken(token);
    setDraft("");
    setLinked(true);
    setTokenOpen(false);
    setLinkTick((tick) => tick + 1);
    setToast("已接上。密钥只留在这台手机。");
  }

  return (
    <main className="night-stage min-h-dvh text-paper">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-8 safe-pad">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-2xl tracking-wide text-balance">金拱夜签</p>
            <p className="mt-1 text-sm text-mist">{today ? formatDay(today) : "每日一只，午夜更换"}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setArchive(true);
              setPastDay(null);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-gold/40 px-4 text-sm text-paper"
          >
            <ScrollText className="size-4" aria-hidden />
            往日
          </button>
        </header>

        <div className="flex flex-1 flex-col py-6">
          {!readingPast && phase === "sealed" && (
            <section className="my-auto text-center">
              <img
                src="/omens/takeout-bag.png"
                alt="一只印着黄色拱门的红色外卖纸袋"
                className="mx-auto h-80 w-auto object-contain"
              />
              <p className="mt-8 font-serif text-3xl text-balance">今日尚未开袋</p>
              <p className="mx-auto mt-3 max-w-xs text-pretty leading-relaxed text-mist">
                袋子只在你亲手打开时才算数。同一天再来，仍是这一只。午夜之后，才换新的。
              </p>
              <button
                type="button"
                onClick={openBag}
                disabled={!today}
                className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-wax text-base font-medium text-paper disabled:opacity-60"
              >
                开今日之袋
              </button>
            </section>
          )}

          {!readingPast && phase === "opening" && (
            <section className="my-auto text-center" aria-live="polite">
              <p className="line-in font-serif text-2xl">灯还亮着。</p>
              <p className="line-in mt-4 font-serif text-2xl">袋子认得出你的手。</p>
              <p className="line-in mt-4 font-serif text-2xl">今日的份，热好了。</p>
            </section>
          )}

          {shown && (phase === "open" || readingPast) && (
            <FortuneCard
              key={`${shown.id}-${todayRow?.at ?? past?.at ?? ""}`}
              omen={shown}
              dayLabel={readingPast && pastDay ? formatDay(pastDay) : "今夜"}
              past={!!readingPast}
              onEat={() => goEat(shown.dish)}
              onCopy={() => copySlip(shown, readingPast && pastDay ? pastDay : (today ?? ""))}
              onRedraw={!readingPast && !trustSpent ? redraw : undefined}
              onBack={
                readingPast
                  ? () => {
                      setPastDay(null);
                      setArchive(false);
                    }
                  : undefined
              }
              campaign={
                booted && !readingPast ? (
                  <CampaignNote
                    state={linked ? campaignState : "need"}
                    campaign={campaign}
                    onConnect={() => {
                      setDraft("");
                      setTokenOpen(true);
                    }}
                    onRefresh={() => {
                      clearCampaignCache();
                      setLinkTick((tick) => tick + 1);
                    }}
                  />
                ) : null
              }
            />
          )}
        </div>

        <footer className="pb-2 text-center text-xs leading-relaxed text-mist/80">
          民间夜签，与麦当劳无关。点餐和付款在官方完成。真活动只在你贴上自己的密钥后出现，价格以官方原文为准。
        </footer>
      </div>

      {archive && (
        <Archive
          draws={draws}
          today={today}
          onClose={() => {
            setArchive(false);
            setPastDay(null);
          }}
          onOpen={(day) => {
            setPastDay(day);
            setArchive(false);
          }}
        />
      )}

      {tokenOpen && (
        <TokenSheet
          draft={draft}
          linked={linked}
          onDraft={setDraft}
          onClose={() => setTokenOpen(false)}
          onSave={saveToken}
          onClear={() => {
            clearMcdToken();
            setLinked(false);
            setCampaign(null);
            setCampaignState("need");
            setTokenOpen(false);
            setToast("已断开。这台手机不再代你询问活动。");
          }}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed inset-x-4 top-4 z-20 mx-auto max-w-md rounded-2xl bg-paper px-4 py-3 text-sm leading-relaxed text-ink shadow-lg"
        >
          {toast}
        </div>
      )}
    </main>
  );
}

function FortuneCard({
  omen,
  dayLabel,
  past,
  onEat,
  onCopy,
  onBack,
  onRedraw,
  campaign,
}: {
  omen: Omen;
  dayLabel: string;
  past: boolean;
  onEat: () => void;
  onCopy: () => void;
  onBack?: () => void;
  onRedraw?: () => void;
  campaign?: ReactNode;
}) {
  return (
    <article className="slip slip-in overflow-hidden rounded-2xl bg-paper text-ink">
      <div className="relative">
        <img
          src={`/omens/${omen.image}.jpg`}
          alt={omen.dish}
          className="omen-photo w-full"
        />
        <p className="absolute left-4 top-4 rounded-full bg-night/80 px-3 py-1 text-xs text-paper">
          {past ? `往日 · ${dayLabel}` : dayLabel}
        </p>
      </div>
      <div className="px-5 pb-6 pt-5">
        <p className="text-center text-xs tracking-widest text-wax">咒</p>
        <p className="mt-2 text-center font-serif text-2xl tracking-widest text-wax">{omen.spell}</p>
        <p className="mt-6 text-center text-xs tracking-widest text-ink-soft">今日征兆</p>
        <h1 className="mt-1 text-center font-serif text-3xl text-balance">{omen.title}</h1>
        <p className="mt-3 text-center text-pretty leading-relaxed text-ink-soft">{omen.whisper}</p>
        <p className="mt-6 text-center text-xs tracking-widest text-wax">今日宜食</p>
        <p className="mt-1 text-center font-serif text-2xl">{omen.dish}</p>
        <p className="mt-4 text-pretty text-base leading-relaxed">{omen.warmth}</p>
        {campaign}
        <div className="mt-5 rounded-xl bg-paper-deep px-4 py-3">
          <p className="text-xs tracking-widest text-ink-soft">今日小奇迹</p>
          <p className="mt-1 text-pretty leading-relaxed">{omen.miracle}</p>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={onEat}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-wax text-base font-medium text-paper"
          >
            去吃这个
            <ArrowUpRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="flex h-12 items-center justify-center rounded-full border border-ink/15 text-ink"
          >
            抄下这张签
          </button>
          {onRedraw && (
            <button
              type="button"
              onClick={onRedraw}
              className="rounded-full border border-wax/40 px-4 py-3 text-center text-sm leading-snug text-wax"
            >
              花费麦神对你的一点信任来重新抽签
            </button>
          )}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-11 items-center justify-center text-sm text-ink-soft"
            >
              回到今夜
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-ink-soft">
          {past
            ? "这只袋子已经合上，不能重抽。"
            : onRedraw
              ? "每人今日先得一张，和别人不必相同。这一点信任，一天只能用一次。"
              : "这一点信任今天已经用过。午夜之后，才换新的袋子。"}
        </p>
      </div>
    </article>
  );
}

function Archive({
  draws,
  today,
  onClose,
  onOpen,
}: {
  draws: DrawRecord[];
  today: string | null;
  onClose: () => void;
  onOpen: (day: string) => void;
}) {
  const rows = draws.filter((row) => omenById(row.omenId));
  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-night/80 sm:items-center">
      <section
        role="dialog"
        aria-labelledby="archive-title"
        className="sheet safe-pad w-full max-w-md overflow-y-auto rounded-t-2xl bg-night-2 px-5 pt-6 text-paper sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 id="archive-title" className="font-serif text-2xl">
            往日的袋子
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 items-center px-2 text-sm text-mist"
          >
            关闭
          </button>
        </div>
        {rows.length === 0 ? (
          <p className="py-10 text-pretty leading-relaxed text-mist">
            还没有往日。今夜是第一只袋子。
          </p>
        ) : (
          <ul className="mt-4 flex flex-col pb-4">
            {rows.map((row) => {
              const omen = omenById(row.omenId);
              if (!omen) return null;
              const isToday = row.day === today;
              return (
                <li key={row.day} className="border-t border-gold/20">
                  <button
                    type="button"
                    onClick={() => onOpen(row.day)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <img
                      src={`/omens/${omen.image}.jpg`}
                      alt=""
                      className="size-14 rounded-xl object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-mist">
                        {formatDay(row.day)}
                        {isToday ? " · 今夜" : ""}
                      </span>
                      <span className="mt-0.5 block truncate font-serif text-lg">{omen.dish}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}

function CampaignNote({
  state,
  campaign,
  onConnect,
  onRefresh,
}: {
  state: CampaignState;
  campaign: TodayCampaign | null;
  onConnect: () => void;
  onRefresh: () => void;
}) {
  return (
    <div className="mt-5 rounded-xl bg-paper-deep px-4 py-3">
      <p className="text-xs tracking-widest text-wax">今日真活动</p>
      {state === "need" && (
        <>
          <p className="mt-1 text-pretty leading-relaxed">
            接上你自己的麦当劳密钥后，这里显示今天官方日历上的活动，不编价格。
          </p>
          <button type="button" onClick={onConnect} className="mt-3 text-sm text-wax">
            接入密钥
          </button>
        </>
      )}
      {state === "loading" && <p className="mt-1 leading-relaxed">正在问官方日历。</p>}
      {state === "ready" && campaign && (
        <>
          <p className="mt-1 font-serif text-lg text-balance">{campaign.title}</p>
          {campaign.blurb && (
            <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-soft">{campaign.blurb}</p>
          )}
          <button type="button" onClick={onRefresh} className="mt-3 text-sm text-wax">
            再问一次
          </button>
        </>
      )}
      {state === "empty" && (
        <>
          <p className="mt-1 text-pretty leading-relaxed">今天的官方日历上，没有标成今日的活动。</p>
          <button type="button" onClick={onRefresh} className="mt-3 text-sm text-wax">
            再问一次
          </button>
        </>
      )}
      {state === "unauthorized" && (
        <>
          <p className="mt-1 text-pretty leading-relaxed">密钥不被承认。到开放平台重新复制一次。</p>
          <button type="button" onClick={onConnect} className="mt-3 text-sm text-wax">
            换一把密钥
          </button>
        </>
      )}
      {state === "unavailable" && (
        <>
          <p className="mt-1 text-pretty leading-relaxed">活动日历这会儿没接上。签还是有效的。</p>
          <button type="button" onClick={onRefresh} className="mt-3 text-sm text-wax">
            再问一次
          </button>
        </>
      )}
    </div>
  );
}

function TokenSheet({
  draft,
  linked,
  onDraft,
  onClose,
  onSave,
  onClear,
}: {
  draft: string;
  linked: boolean;
  onDraft: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  onClear: () => void;
}) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-night/80 sm:items-center">
      <section
        role="dialog"
        aria-labelledby="token-title"
        className="sheet safe-pad w-full max-w-md rounded-t-2xl bg-night-2 px-5 pt-6 text-paper sm:rounded-2xl"
      >
        <h2 id="token-title" className="font-serif text-2xl">
          接入今日真活动
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-mist">
          打开麦当劳开放平台，登录后在控制台复制 MCP Token。它只保存在这台手机，不会写进应用，别人打开也用不了你的账号。
        </p>
        <a
          href={TOKEN_PAGE}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex h-11 items-center text-sm text-gold"
        >
          去 open.mcd.cn 取密钥
        </a>
        <label className="mt-4 block text-sm text-mist" htmlFor="mcd-token">
          MCP Token
        </label>
        <input
          id="mcd-token"
          type="password"
          autoComplete="off"
          spellCheck={false}
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-gold/40 bg-night px-4 text-paper"
        />
        <div className="mt-5 flex flex-col gap-3 pb-2">
          <button
            type="button"
            onClick={onSave}
            className="flex h-12 items-center justify-center rounded-full bg-wax font-medium text-paper"
          >
            保存并查看今日活动
          </button>
          {linked && (
            <button
              type="button"
              onClick={onClear}
              className="flex h-12 items-center justify-center rounded-full border border-gold/40 text-paper"
            >
              断开这台手机
            </button>
          )}
          <button type="button" onClick={onClose} className="flex h-11 items-center justify-center text-sm text-mist">
            关闭
          </button>
        </div>
      </section>
    </div>
  );
}
