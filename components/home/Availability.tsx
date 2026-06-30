"use client";

import { useState, useMemo } from "react";

// ── Availability data ────────────────────────────────────────────────
// "low" | "booked"
type Status = "low" | "booked";

function generateAvailability(year: number, month: number): Record<number, Status> {
  // Deterministic but varied per month
  const seed = year * 12 + month;
  const booked = [2, 9, 12, 17, 24, 28, 1, 5, 8, 15, 22].map((d) => ((d + seed) % 28) + 1);

  const map: Record<number, Status> = {};
  for (let d = 1; d <= 31; d++) {
    if (booked.includes(d)) map[d] = "booked";
    else map[d] = "low";
  }
  return map;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function ordinal(d: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = d % 100;
  return d + (s[(v - 20) % 10] || s[v] || s[0]);
}

const STATUS_META: Record<Status, { label: string; emoji: string; color: string; msg: string; sub: string }> = {
  booked: { label: "Fully Booked", emoji: "💍", color: "#E53E3E", msg: "Uh oh… this date is", sub: "Try another day to find your ideal spot." },
  low: { label: "Available", emoji: "🕊️", color: "#48BB78", msg: "This date is fully", sub: "Plenty of venues available — book at your pace." },
};

export default function VenueAvailability() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);

  const availability = useMemo(() => generateAvailability(viewYear, viewMonth), [viewYear, viewMonth]);

  // Days in month, and what weekday the 1st falls on (0=Mon…6=Sun)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Mon-based

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelected(null);
  };

  const selStatus = selected ? availability[selected] : null;
  const selMeta = selStatus ? STATUS_META[selStatus] : null;
  const selDateStr = selected
    ? `${ordinal(selected)} ${MONTHS[viewMonth]}, ${viewYear}`
    : null;

  // Calendar grid: leading blanks + days
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete final row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap');

        /* ── Section ── */
        .va-section {
          background: #FDEFDE;
          padding: 4rem 2rem 4rem;
          position: relative;
          overflow: hidden;
        }

        /* Soft background blobs */
        .va-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .va-blob-1 {
          width: 400px; height: 400px;
          background: rgba(196,150,106,0.08);
          top: -100px; left: -80px;
        }
        .va-blob-2 {
          width: 320px; height: 320px;
          background: rgba(217,123,138,0.07);
          bottom: -60px; right: -60px;
        }

        /* ── Inner ── */
        .va-inner {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .va-eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C4966A;
          margin: 0 0 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .va-eyebrow::before,
        .va-eyebrow::after {
          content: '';
          flex: 0 0 28px;
          height: 1px;
          background: #C4966A;
          opacity: 0.5;
        }

        .va-title {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #2A1A0E;
          margin: 0 0 0.4rem;
          line-height: 1.15;
        }
        .va-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 300;
          color: #8C6A50;
          margin: 0 0 3rem;
          letter-spacing: 0.02em;
        }

        /* ── Grid ── */
        .va-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        /* ── Calendar card ── */
        .va-cal {
          background: #fff;
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: 0 4px 32px rgba(42,26,14,0.06);
          border: 1px solid rgba(196,150,106,0.12);
        }

        /* Month nav */
        .va-cal-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .va-nav-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(196,150,106,0.3);
          background: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6B4F3A;
          transition: background 0.2s, border-color 0.2s;
        }
        .va-nav-btn:hover { background: rgba(196,150,106,0.1); border-color: #C4966A; }
        .va-nav-btn svg { width: 14px; height: 14px; }

        .va-month-label {
          display: flex; align-items: baseline; gap: 0.4rem;
        }
        .va-month-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 600;
          color: #2A1A0E; letter-spacing: 0.02em;
        }
        .va-month-year {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem; font-weight: 400;
          color: #8C6A50;
        }

        /* Day headers */
        .va-day-headers {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 0.5rem;
          gap: 2px;
        }
        .va-day-hdr {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #B8916A; text-align: center;
          padding: 0.3rem 0;
        }

        /* Date grid */
        .va-dates {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
        }
        .va-day {
          aspect-ratio: 1;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem; font-weight: 400;
          color: #6B4F3A;
          cursor: pointer;
          border: 1.5px solid transparent;
          transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
          position: relative;
        }
        .va-day.empty { pointer-events: none; }
        .va-day.outside { color: #CDB89A; font-size: 0.75rem; pointer-events: none; }

        /* Status dots */
        .va-day::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          opacity: 0;
        }

        .va-day[data-status="low"]       { background: rgba(72,187,120,0.06); }
        .va-day[data-status="low"]::after       { background: #48BB78; opacity: 1; }

        .va-day[data-status="booked"]    {
          background: rgba(229,62,62,0.05);
          color: #B8916A;
          text-decoration: line-through;
          text-decoration-color: rgba(229,62,62,0.4);
          cursor: not-allowed;
        }

        .va-day:not([data-status="booked"]):hover {
          background: rgba(196,150,106,0.15);
          border-color: #C4966A;
          color: #2A1A0E;
          transform: scale(1.08);
          z-index: 1;
        }

        .va-day.selected {
          background: #C4966A !important;
          color: #fff !important;
          border-color: #C4966A !important;
          font-weight: 600;
          text-decoration: none !important;
          transform: scale(1.1) !important;
          box-shadow: 0 4px 16px rgba(196,150,106,0.4);
          z-index: 2;
        }
        .va-day.selected::after { opacity: 0 !important; }

        /* Legend */
        .va-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1.2rem;
          margin-top: 1.4rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(196,150,106,0.12);
        }
        .va-legend-item {
          display: flex; align-items: center; gap: 0.35rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem; font-weight: 400;
          color: #8C6A50; letter-spacing: 0.03em;
        }
        .va-legend-dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }

        /* ── Info panel ── */
        .va-info {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 32px rgba(42,26,14,0.06);
          border: 1px solid rgba(196,150,106,0.12);
          overflow: hidden;
          min-height: 360px;
          display: flex; flex-direction: column;
        }

        /* Info: no selection */
        .va-info-empty {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2.5rem;
          text-align: center;
          gap: 1rem;
        }
        .va-info-empty-icon {
          font-size: 2.8rem;
          opacity: 0.4;
        }
        .va-info-empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 300;
          color: #B8916A; line-height: 1.6;
        }

        /* Info: date header */
        .va-info-header {
          padding: 1.4rem 1.8rem 1.2rem;
          border-bottom: 1px solid rgba(196,150,106,0.1);
        }
        .va-info-date {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 600;
          color: #2A1A0E; margin: 0;
        }
        .va-info-day {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.82rem; font-weight: 300;
          color: #8C6A50; letter-spacing: 0.08em; text-transform: uppercase;
          margin-top: 2px;
        }

        /* Info: body */
        .va-info-body {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem 1.8rem;
          text-align: center;
          gap: 1rem;
        }

        .va-info-emoji { font-size: 3rem; }

        .va-info-msg {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 400;
          color: #2A1A0E; margin: 0; line-height: 1.45;
        }

        .va-status-badge {
          display: inline-block;
          padding: 0.3rem 1rem;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          border: 1.5px solid;
        }

        .va-info-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.92rem; font-weight: 300;
          color: #8C6A50; margin: 0; line-height: 1.55;
        }

        /* CTA in info panel */
        .va-info-cta {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.65rem 1.4rem;
          background: #C4966A; color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.06em;
          border: none; border-radius: 100px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          margin-top: 0.3rem;
        }
        .va-info-cta:hover { background: #B8845A; transform: translateY(-1px); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .va-grid { grid-template-columns: 1fr; }
          .va-section { padding: 4rem 1.2rem 5rem; }
          .va-info { min-height: 280px; }
        }
      `}</style>

      <section className="va-section">
        <div className="va-blob va-blob-1" />
        <div className="va-blob va-blob-2" />

        <div className="va-inner">
          {/* Heading */}
          <p className="va-eyebrow">Plan Ahead</p>
          <h2 className="va-title">Check Venue Availability</h2>
          <p className="va-subtitle">Select a date to see how soon you need to book your dream celebration.</p>

          <div className="va-grid">
            {/* ── Calendar ── */}
            <div className="va-cal">
              <div className="va-cal-nav">
                <button className="va-nav-btn" onClick={prevMonth} aria-label="Previous month">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
                <div className="va-month-label">
                  <span className="va-month-name">{MONTHS[viewMonth]}</span>
                  <span className="va-month-year">{viewYear}</span>
                </div>
                <button className="va-nav-btn" onClick={nextMonth} aria-label="Next month">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="va-day-headers">
                {DAYS.map((d, i) => (
                  <div key={i} className="va-day-hdr">{d}</div>
                ))}
              </div>

              {/* Dates */}
              <div className="va-dates">
                {cells.map((day, i) => {
                  if (!day) {
                    return <div key={i} className="va-day empty" />;
                  }
                  const status = availability[day];
                  const isSelected = selected === day;
                  const isBooked = status === "booked";
                  return (
                    <button
                      key={i}
                      className={`va-day${isSelected ? " selected" : ""}${isBooked ? " booked" : ""}`}
                      data-status={status}
                      onClick={() => !isBooked && setSelected(day)}
                      disabled={isBooked}
                      aria-label={`${day} ${MONTHS[viewMonth]} — ${STATUS_META[status].label}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="va-legend">
                {[
                  { color: "#48BB78", label: "Available" },
                  { color: "rgba(229,62,62,0.3)", label: "Fully Booked" },
                ].map((l) => (
                  <div key={l.label} className="va-legend-item">
                    <div
                      className="va-legend-dot"
                      style={{
                        background: l.color,
                        border: l.dashed ? `1.5px dashed ${l.color}` : "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Info panel ── */}
            <div className="va-info">
              {!selected || !selMeta ? (
                <div className="va-info-empty">
                  <div className="va-info-empty-icon">📅</div>
                  <p className="va-info-empty-text">
                    Tap any date on the calendar to check<br />availability for your special day.
                  </p>
                </div>
              ) : (
                <>
                  <div className="va-info-header">
                    <p className="va-info-date">{selDateStr}</p>
                    <p className="va-info-day">
                      {new Date(viewYear, viewMonth, selected).toLocaleDateString("en-IN", { weekday: "long" })}
                    </p>
                  </div>
                  <div className="va-info-body">
                    <div className="va-info-emoji">{selMeta.emoji}</div>
                    <p className="va-info-msg">
                      {selMeta.msg}
                    </p>
                    <span
                      className="va-status-badge"
                      style={{
                        color: selMeta.color,
                        borderColor: selMeta.color,
                        background: `${selMeta.color}12`,
                      }}
                    >
                      {selMeta.label}
                    </span>
                    <p className="va-info-sub">{selMeta.sub}</p>
                    {selStatus !== "booked" && (
                      <a href="/rsvp" className="va-info-cta">
                        Reserve this date →
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}