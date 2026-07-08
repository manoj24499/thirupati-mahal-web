"use client";

const stats = [
  { value: "1,043+", label: "weddings done" },
  { value: "4.8/5", label: "google rating" },
  { value: "28,363+", label: "venue partners" },
];

export default function Hero() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');

        /* ── Hero shell ── */
        .hero {
          position: relative;
          width: 100%;
          height: 100svh;
          min-height: 560px;
          overflow: hidden;
          background: #1A0F07;
        }

        /* ── Video Background ── */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* ── Gradient overlays ── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          background:
            linear-gradient(to top, rgba(10,5,2,0.82) 0%, rgba(10,5,2,0.3) 45%, rgba(10,5,2,0.1) 100%),
            linear-gradient(to right, rgba(10,5,2,0.45) 0%, transparent 60%);
        }

        /* ── Content layer ── */
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 4vw 4vh;
          max-width: 1400px;
          margin: 0 auto;
          left: 0; right: 0;
        }

        /* ── Couple tag (centre) ── */
        .hero-couple-tag {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          z-index: 5;
        }

        .couple-name-pill {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.75rem, 1.5vw, 0.9rem);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.18em;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .couple-name-pill span.dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #C4966A;
          display: inline-block;
        }



        /* ── Bottom content row ── */
        .hero-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: flex-end;
          gap: 2rem;
          width: 100%;
        }

        /* Headline */
        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hero-headline-top {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3.5vw, 2.6rem);
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          line-height: 1.15;
          letter-spacing: 0.01em;
          margin: 0;
        }
        .hero-headline-main {
          font-family: 'Playfair Display', serif;
          font-size: 85px;
          font-weight: 700;
          font-style: italic;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin: 0;
          position: relative;
          display: inline-flex;
          align-items: flex-end;
          gap: 0.2em;
          margin-bottom: 30px;
        }

        /* Sparkle ✦ next to "Weddings" */
        .hero-sparkle {
          color: #C4966A;
          font-style: normal;
          font-size: 0.35em;
          font-weight: 400;
          letter-spacing: 0;
          margin-bottom: 0.5em;
          display: inline-flex;
          flex-direction: column;
          gap: 0.3em;
        }

        /* ── Right side: stats + CTA ── */
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.6rem;
          min-width: 260px;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          align-items: flex-end;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.15rem;
        }
        .stat-value {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1;
        }
        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.62rem, 1vw, 0.72rem);
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* CTA button */
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #4a233c;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.9rem, 1.5vw, 1.05rem);
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 0.85rem 2rem;
          border-radius: 100px;
          text-decoration: none;
          border: none; cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(196,150,106,0.35);
        }
        .hero-cta:hover {
          background: #B8845A;
          transform: translateY(-1px);
          box-shadow: 0 6px 28px rgba(196,150,106,0.45);
        }
        .hero-cta svg {
          width: 16px; height: 16px; flex-shrink: 0;
        }

        /* ── Scroll chevron ── */
        .hero-scroll {
          position: absolute;
          bottom: 1.8rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          opacity: 0.5;
          animation: heroScrollBounce 2s ease-in-out infinite;
        }
        .hero-scroll svg {
          width: 22px; height: 22px;
          color: #fff;
        }
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* ── Entry animations ── */
        .hero-animate {
          opacity: 0;
          transform: translateY(18px);
          animation: heroFadeUp 0.8s ease forwards;
        }
        .hero-animate:nth-child(1) { animation-delay: 0.2s; }
        .hero-animate:nth-child(2) { animation-delay: 0.35s; }
        .hero-animate:nth-child(3) { animation-delay: 0.5s; }
        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-bottom {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .hero-right {
            align-items: flex-start;
            min-width: unset;
          }
          .hero-stats { gap: 1.2rem; }
          .hero-content { padding: 0 5vw 6vh; }
        }
      `}</style>

      <section className="hero">

        {/* Video Background */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
        >
          {/* Replace this src with your local video path */}
          <source src="/videos/banner-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="hero-overlay" />

        {/* Centre couple tag */}
        {/* <div className="hero-couple-tag">
          <p className="couple-name-pill">
            Sofia & James
            <span className="dot" />
            Mumbai
            <span className="dot" />
            Sep '25
          </p>
        </div> */}

        {/* Bottom content */}
        <div className="hero-content">
          <div className="hero-bottom">

            {/* Left: headline */}
            <div className="hero-headline">
              <p className="hero-headline-top hero-animate">Crafting Memorable</p>
              <p className="hero-headline-main hero-animate">
                Weddings
                <span className="hero-sparkle">✦<br />✦</span>
              </p>
            </div>

            {/* Right: stats + CTA */}
            <div className="hero-right hero-animate">
              <div className="hero-stats">
                {stats.map((s) => (
                  <div className="hero-stat" key={s.label}>
                    <span className="stat-value">{s.value}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <a href="/rsvp" className="hero-cta">
                Start my wedding planning
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

          </div>
        </div>

        {/* Scroll chevron */}
        <div className="hero-scroll">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

      </section>
    </>
  );
}