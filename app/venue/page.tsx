import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppContact from "@/components/layout/whatsapp";

export default function VenuePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", background: "#FDEFDE" }}>
        <VenueSection />
      </main>
      <Footer />
      <WhatsAppContact />
    </>
  );
}

function VenueSection() {
  const MAPS_URL = "https://maps.google.com/?q=Tirupati+Mahaal+Venue";

  const locations = [
    { name: "MUNNAR",      km: 86,  pos: "left-top",    icon: "mountain" },
    { name: "KODAIKANAL", km: 99,  pos: "left-bottom",  icon: "forest"   },
    { name: "OOTY",       km: 160, pos: "right-top",    icon: "cloud"    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');

        /* ── Page shell ── */
        .vp-wrap {
          background: #FDEFDE;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* ── Parchment texture layer ── */
        .vp-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(ellipse at 20% 20%, rgba(196,150,106,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(196,150,106,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Corner ornaments (pure CSS) ── */
        .vp-corner {
          position: absolute;
          width: 90px; height: 90px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.55;
        }
        .vp-corner svg { width: 100%; height: 100%; }
        .vp-corner-tl { top: 16px; left: 16px; }
        .vp-corner-tr { top: 16px; right: 16px; transform: scaleX(-1); }
        .vp-corner-bl { bottom: 16px; left: 16px; transform: scaleY(-1); }
        .vp-corner-br { bottom: 16px; right: 16px; transform: scale(-1); }

        /* ── Inner container ── */
        .vp-inner {
          position: relative;
          z-index: 2;
          max-width: 1120px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ── Eyebrow ── */
        .vp-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: #8C6A50;
          margin: 0 0 0.7rem;
          display: flex; align-items: center; gap: 0.7rem;
        }
        .vp-eyebrow::before, .vp-eyebrow::after {
          content: '◆';
          font-size: 0.45rem;
          color: #C4966A;
          opacity: 0.7;
        }

        /* Top gold divider */
        .vp-divider {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .vp-divider-line {
          width: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, #C4966A);
        }
        .vp-divider-line.rev { background: linear-gradient(90deg, #C4966A, transparent); }
        .vp-divider-gem {
          width: 8px; height: 8px;
          background: #C4966A;
          transform: rotate(45deg);
          opacity: 0.8;
        }

        /* ── Title block ── */
        .vp-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 700;
          color: #2A1A0E;
          text-align: center;
          line-height: 1.1;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .vp-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 400;
          font-style: italic;
          color: #6B4F3A;
          text-align: center;
          margin: 0 0 3.5rem;
          letter-spacing: 0.03em;
        }

        /* ── Map diagram ── */
        .vp-diagram {
          width: 100%;
          max-width: 860px;
          position: relative;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-rows: auto auto;
          gap: 1.5rem 2rem;
          align-items: center;
          margin-bottom: 3.5rem;
        }

        /* Center medallion */
        .vp-medallion-wrap {
          grid-column: 2;
          grid-row: 1 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vp-medallion {
          width: clamp(170px, 22vw, 220px);
          height: clamp(170px, 22vw, 220px);
          border-radius: 50%;
          background: #3B0D24;
          border: 3px solid #C4966A;
          box-shadow:
            0 0 0 6px rgba(196,150,106,0.15),
            0 0 0 10px rgba(196,150,106,0.07),
            0 8px 48px rgba(59,13,36,0.35);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          padding: 1.4rem;
          position: relative;
        }

        /* Monogram TM inside medallion */
        .vp-medallion-monogram {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          font-style: italic;
          color: #C4966A;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .vp-medallion-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem, 1.5vw, 0.92rem);
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C4966A;
          line-height: 1.45;
        }

        .vp-medallion-ornament {
          color: #C4966A;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          opacity: 0.7;
          margin-top: 0.4rem;
        }

        /* ── Location cards ── */
        .vp-loc {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .vp-loc.right { flex-direction: row-reverse; }

        /* Photo circle */
        .vp-loc-photo-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .vp-loc-photo {
          width: clamp(90px, 12vw, 130px);
          height: clamp(90px, 12vw, 130px);
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #C4966A;
          display: block;
          filter: sepia(10%) saturate(0.95);
        }
        /* Floral badge on photo */
        .vp-loc-badge {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: #3B0D24;
          border: 1.5px solid #C4966A;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem;
          color: #C4966A;
        }

        /* Info card */
        .vp-loc-card {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(196,150,106,0.25);
          border-radius: 10px;
          padding: 1rem 1.2rem;
          backdrop-filter: blur(4px);
          min-width: 130px;
        }
        .vp-loc-icon {
          color: #C4966A;
          margin-bottom: 0.35rem;
        }
        .vp-loc-icon svg { width: 22px; height: 22px; stroke: #C4966A; fill: none; stroke-width: 1.5; }

        .vp-loc-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #2A1A0E;
          margin: 0 0 0.2rem;
        }
        .vp-loc-divider {
          width: 28px; height: 1px;
          background: #C4966A; opacity: 0.5;
          margin-bottom: 0.3rem;
        }
        .vp-loc-km {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #2A1A0E;
          line-height: 1;
          display: flex; align-items: baseline; gap: 0.15em;
        }
        .vp-loc-km span {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: #8C6A50;
        }

        /* Dotted connector lines */
        .vp-connector {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .vp-connector-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C4966A;
          opacity: 0.4;
          flex-shrink: 0;
        }
        .vp-connector-dot.big { opacity: 0.8; width: 7px; height: 7px; }

        /* Right side description */
        .vp-desc-wrap {
          grid-column: 3;
          grid-row: 2;
          display: flex; flex-direction: column;
          align-items: flex-start;
          gap: 0.6rem;
          padding-left: 0.5rem;
        }
        .vp-desc-divider {
          display: flex; align-items: center; gap: 0.5rem;
        }
        .vp-desc-divider-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, #C4966A, transparent);
        }
        .vp-desc-gem {
          font-size: 0.5rem; color: #C4966A; opacity: 0.7;
        }
        .vp-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.15rem);
          font-weight: 400;
          color: #4A2E1A;
          line-height: 1.75;
          font-style: italic;
          max-width: 260px;
        }

        /* ── Google Maps bar ── */
        .vp-maps-bar {
          width: 100%;
          max-width: 680px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(196,150,106,0.2);
          border-radius: 12px;
          padding: 1.1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.2rem;
          box-shadow: 0 4px 24px rgba(42,26,14,0.06);
          backdrop-filter: blur(4px);
        }

        .vp-maps-icon {
          flex-shrink: 0;
          width: 42px; height: 42px;
        }

        .vp-maps-text { flex: 1; }
        .vp-maps-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #2A1A0E;
          margin: 0 0 0.15rem;
        }
        .vp-maps-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          color: #8C6A50;
          margin: 0;
        }

        .vp-maps-divider {
          width: 1px; height: 36px;
          background: rgba(196,150,106,0.25);
          flex-shrink: 0;
        }

        .vp-maps-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #3B0D24;
          color: #C4966A;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0.7rem 1.3rem;
          border-radius: 8px;
          border: none; cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .vp-maps-btn:hover { background: #2A0819; color: #DDB98A; transform: translateY(-1px); }
        .vp-maps-btn svg { width: 14px; height: 14px; fill: currentColor; flex-shrink: 0; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .vp-diagram {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            max-width: 380px;
            gap: 1.2rem;
          }
          .vp-medallion-wrap { grid-column: 1; grid-row: auto; }
          .vp-loc { justify-content: center; }
          .vp-loc.right { flex-direction: row; }
          .vp-desc-wrap { grid-column: 1; padding: 0; align-items: center; text-align: center; }
          .vp-desc { max-width: 100%; }
          .vp-maps-bar { flex-direction: column; text-align: center; }
          .vp-maps-divider { width: 60px; height: 1px; }
          .vp-corner { width: 55px; height: 55px; }
        }
      `}</style>

      <div className="vp-wrap">
        {/* Corner ornaments */}
        {["tl","tr","bl","br"].map(pos => (
          <div key={pos} className={`vp-corner vp-corner-${pos}`}>
            <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4 L4 30 M4 4 L30 4" stroke="#C4966A" strokeWidth="1.5"/>
              <path d="M4 4 L20 20" stroke="#C4966A" strokeWidth="0.8" strokeDasharray="2 3"/>
              <circle cx="4" cy="4" r="2.5" fill="#C4966A"/>
              <circle cx="30" cy="4" r="1.2" fill="#C4966A" opacity="0.5"/>
              <circle cx="4" cy="30" r="1.2" fill="#C4966A" opacity="0.5"/>
              <path d="M15 4 Q15 15 4 15" stroke="#C4966A" strokeWidth="0.8" fill="none" opacity="0.4"/>
              <path d="M22 8 L8 22" stroke="#C4966A" strokeWidth="0.6" opacity="0.3"/>
              <circle cx="26" cy="26" r="1" fill="#C4966A" opacity="0.3"/>
            </svg>
          </div>
        ))}

        <div className="vp-inner">
          {/* Eyebrow + title */}
          <p className="vp-eyebrow">Our Venue</p>
          <div className="vp-divider">
            <div className="vp-divider-line rev" />
            <div className="vp-divider-gem" />
            <div className="vp-divider-line" />
          </div>
          <h1 className="vp-title">Explore the Western Gates</h1>
          <p className="vp-tagline">Rich India's Heritage in Hills</p>

          {/* ── Diagram ── */}
          <div className="vp-diagram">

            {/* Left top — Munnar */}
            <div className="vp-loc" style={{ gridColumn: 1, gridRow: 1 }}>
              <div className="vp-loc-card">
                <div className="vp-loc-icon">
                  {/* Mountain icon */}
                  <svg viewBox="0 0 24 24"><polyline points="3 20 9 8 13 14 16 10 21 20"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
                </div>
                <p className="vp-loc-name">Munnar</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">86 <span>km</span></div>
              </div>
              {/* Connector */}
              <div className="vp-connector">
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot big" />
              </div>
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80"
                  alt="Munnar hills"
                />
                <div className="vp-loc-badge">✦</div>
              </div>
            </div>

            {/* Centre medallion */}
            <div className="vp-medallion-wrap">
              <div className="vp-medallion">
                <div className="vp-medallion-monogram">TM</div>
                <p className="vp-medallion-name">TIRUPATI<br />MAHAAL</p>
                <p className="vp-medallion-ornament">❧ ✦ ❧</p>
              </div>
            </div>

            {/* Right top — Ooty */}
            <div className="vp-loc right" style={{ gridColumn: 3, gridRow: 1 }}>
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1580289143186-03f54224aad4?w=300&q=80"
                  alt="Ooty hills"
                />
                <div className="vp-loc-badge">✦</div>
              </div>
              <div className="vp-connector">
                <div className="vp-connector-dot big" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
              </div>
              <div className="vp-loc-card">
                <div className="vp-loc-icon">
                  {/* Cloud icon */}
                  <svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
                </div>
                <p className="vp-loc-name">Ooty</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">160 <span>km</span></div>
              </div>
            </div>

            {/* Left bottom — Kodaikanal */}
            <div className="vp-loc" style={{ gridColumn: 1, gridRow: 2 }}>
              <div className="vp-loc-card">
                <div className="vp-loc-icon">
                  {/* Forest icon */}
                  <svg viewBox="0 0 24 24"><polygon points="12 2 2 19 22 19"/><polygon points="12 8 5 19 19 19"/></svg>
                </div>
                <p className="vp-loc-name">Kodaikanal</p>
                <div className="vp-loc-divider" />
                <div className="vp-loc-km">99 <span>km</span></div>
              </div>
              <div className="vp-connector">
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot" />
                <div className="vp-connector-dot big" />
              </div>
              <div className="vp-loc-photo-wrap">
                <img
                  className="vp-loc-photo"
                  src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=300&q=80"
                  alt="Kodaikanal hills"
                />
                <div className="vp-loc-badge">✦</div>
              </div>
            </div>

            {/* Right bottom — description */}
            <div className="vp-desc-wrap">
              <div className="vp-desc-divider">
                <div className="vp-desc-divider-line" />
                <span className="vp-desc-gem">◆</span>
              </div>
              <p className="vp-desc">
                A timeless venue surrounded<br />
                by nature, heritage and<br />
                serenity.
              </p>
              <div className="vp-desc-divider">
                <div className="vp-desc-divider-line" />
                <span className="vp-desc-gem">◆</span>
              </div>
            </div>
          </div>

          {/* ── Google Maps bar ── */}
          <div className="vp-maps-bar">
            {/* Official Google Maps pin colours */}
            <svg className="vp-maps-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 4C16.268 4 10 10.268 10 18c0 11 14 26 14 26s14-15 14-26c0-7.732-6.268-14-14-14z" fill="#EA4335"/>
              <path d="M24 4C28.418 4 32.418 5.79 35.314 8.686L24 20V4z" fill="#FBBC04"/>
              <path d="M24 4C19.582 4 15.582 5.79 12.686 8.686L24 20V4z" fill="#34A853"/>
              <path d="M24 20C27.314 20 30 17.314 30 14s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" fill="#fff"/>
              <path d="M10 18c0 7.732 4 15 8 20l6-18H10z" fill="#C5221F"/>
            </svg>
            <div className="vp-maps-text">
              <p className="vp-maps-title">Find us on Google Maps</p>
              <p className="vp-maps-sub">Get directions to Tirupati Mahaal and start your journey with ease.</p>
            </div>
            <div className="vp-maps-divider" />
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="vp-maps-btn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </>
  );
}