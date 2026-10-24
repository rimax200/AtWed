"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const EVENT_TITLE = "AtWED - About To Wed";
const VENUE_NAME = "ParkInn By Radisson Hotel";
// TODO: the client must supply the full street address. While empty, only VENUE_NAME is used as the location.
const VENUE_ADDRESS = "";
/** Lagos time (WAT) is UTC+1 all year, with no daylight saving */
const WAT_OFFSET_HOURS = 1;
const START_HOUR_WAT = 14;
const END_HOUR_WAT = 16;
/** true: repeats on the last Sunday of every month. false: a single event. */
const RECURRING = true;
const ALARMS = [
  { trigger: "-P1D", label: "tomorrow" },
  { trigger: "-PT1H", label: "in 1 hour" },
];
const DESCRIPTION =
  "AtWED holds every last Sunday of the month. Preparing The Unmarried. Strengthening Marriages. Building Families.";
const SITE_URL = "https://atwed.org";

/** Show the "Next: ..." line under "Holds Every Last Sunday of the Month" */
const SHOW_NEXT_DATE = true;
/** How long the button label stays "Added" after a click */
const FEEDBACK_MS = 2500;

const RRULE = "FREQ=MONTHLY;BYDAY=-1SU";
// Longest possible date line. Rendered invisibly until the real date is known, so nothing shifts.
const NEXT_DATE_PLACEHOLDER = "Next: Wednesday, 30 September 2026";

/**
 * The next last-Sunday event that has not finished yet. All maths is in UTC, so the
 * visitor's timezone never matters. Call it at click time, never at build time.
 */
export function getNextOccurrence(now: Date) {
  let year = now.getUTCFullYear();
  let month = now.getUTCMonth();
  for (;;) {
    // Last day of the month, then step back to Sunday (getUTCDay() === 0)
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const sunday = lastDay.getUTCDate() - lastDay.getUTCDay();
    const start = new Date(Date.UTC(year, month, sunday, START_HOUR_WAT - WAT_OFFSET_HOURS));
    const end = new Date(Date.UTC(year, month, sunday, END_HOUR_WAT - WAT_OFFSET_HOURS));
    if (now.getTime() <= end.getTime()) return { start, end };
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
}

/** 2026-10-25T13:00:00.000Z -> 20261025T130000Z */
const toIcsDate = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

const location = () => (VENUE_ADDRESS ? `${VENUE_NAME}, ${VENUE_ADDRESS}` : VENUE_NAME);

// RFC 5545 text escaping
const escapeText = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

// RFC 5545 line folding: no line longer than 75 octets, continuation lines start with a space
function fold(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > (parts.length === 0 ? 75 : 74)) {
      parts.push(current);
      current = "";
      bytes = 0;
    }
    current += char;
    bytes += size;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function buildIcs(now: Date) {
  const { start, end } = getNextOccurrence(now);
  const uid = RECURRING
    ? "atwed-lastsunday@atwed.org"
    : `atwed-${toIcsDate(start).slice(0, 8)}@atwed.org`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AtWED//Meeting//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDate(now)}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    ...(RECURRING ? [`RRULE:${RRULE}`] : []),
    `SUMMARY:${escapeText(EVENT_TITLE)}`,
    `LOCATION:${escapeText(location())}`,
    `DESCRIPTION:${escapeText(`${DESCRIPTION}\n${SITE_URL}`)}`,
    `URL:${SITE_URL}`,
    ...ALARMS.flatMap(({ trigger, label }) => [
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeText(`${EVENT_TITLE} is ${label}`)}`,
      `TRIGGER:${trigger}`,
      "END:VALARM",
    ]),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function buildGoogleCalendarUrl(now: Date) {
  const { start, end } = getNextOccurrence(now);
  const params = [
    "action=TEMPLATE",
    `text=${encodeURIComponent(EVENT_TITLE)}`,
    `dates=${toIcsDate(start)}/${toIcsDate(end)}`,
    `details=${encodeURIComponent(`${DESCRIPTION}\n${SITE_URL}`)}`,
    `location=${encodeURIComponent(location())}`,
    ...(RECURRING ? [`recur=RRULE:${RRULE}`] : []),
  ];
  return `https://calendar.google.com/calendar/render?${params.join("&")}`;
}

function downloadIcs(content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "atwed-meeting.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const dateFormat = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** "Next: Sunday, 25 October 2026", in Lagos time. Empty on the server and during hydration. */
const getNextDateText = () => {
  const { start } = getNextOccurrence(new Date());
  const parts = dateFormat().formatToParts(start);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `Next: ${get("weekday")}, ${get("day")} ${get("month")} ${get("year")}`;
};
const noSubscription = () => () => {};

export function NextDate({ className = "" }: { className?: string }) {
  // Client-only value (like an effect would give), without setState in an effect
  const text = useSyncExternalStore(noSubscription, getNextDateText, () => "");

  if (!SHOW_NEXT_DATE) return null;
  // Both spans share one grid cell: the invisible placeholder always sets the height,
  // so the real date appearing cannot move anything.
  return (
    <p className={`grid ${className}`}>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {NEXT_DATE_PLACEHOLDER}
      </span>
      {text && <span className="[grid-area:1/1]">{text}</span>}
    </p>
  );
}

export default function SetReminderButton({ linkClassName = "" }: { linkClassName?: string }) {
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = () => {
    downloadIcs(buildIcs(new Date()));
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), FEEDBACK_MS);
  };

  return (
    <div className="flex flex-col items-center gap-[clamp(0.25rem,1.4cqw,0.375rem)]">
      <button
        type="button"
        onClick={onClick}
        className="flex h-[max(2.75rem,11.52cqw)] w-[max(8.5rem,36.18cqw)] items-center justify-center rounded-card bg-reminder font-body text-[clamp(0.9375rem,4.378cqw,1.1875rem)] leading-[1.2] font-medium tracking-[-0.01em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-reminder-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-strong active:translate-y-0 active:bg-reminder-dark"
      >
        {added ? "Added" : "Set Reminder"}
      </button>
      <span className="sr-only" aria-live="polite">
        {added ? "Calendar event downloaded. Check your calendar." : ""}
      </span>
      {/* href is rebuilt at click time, so a page left open never holds a stale date */}
      <a
        href="https://calendar.google.com/calendar/render?action=TEMPLATE"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.currentTarget.href = buildGoogleCalendarUrl(new Date());
        }}
        className={linkClassName}
      >
        Google Calendar
      </a>
    </div>
  );
}
