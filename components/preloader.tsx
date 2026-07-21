"use client";

import { useState, useEffect } from "react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "done" | "exit"

  // Count 0 → 100
  useEffect(() => {
    let start: number | null = null;
    const duration = 2800; // ms for 0→100

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out curve so it slows near 100
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setPhase("done");
        // Small pause at 100, then exit
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => onComplete?.(), 900);
        }, 500);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400&display=swap');

        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FDEFDE;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s cubic-bezier(.77,0,.18,1),
                      transform 0.8s cubic-bezier(.77,0,.18,1);
        }

        .preloader.exit {
          opacity: 0;
          transform: translateY(-12px);
          pointer-events: none;
        }

        /* ── Image frame ── */
        .pre-image-wrap {
          position: relative;
          width: min(340px, 78vw);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border-radius: 2px;
          margin-bottom: 2.8rem;
        }

        /* Reveal mask: slides up as count rises */
        .pre-image-mask {
          position: absolute;
          inset: 0;
          background: #FDEFDE;
          transform-origin: bottom;
          transition: transform 0.05s linear;
          z-index: 2;
        }

        .pre-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: sepia(15%) saturate(0.9);
        }

        /* Thin gold border that draws in */
        .pre-image-border {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }
        .pre-image-border::before,
        .pre-image-border::after {
          content: '';
          position: absolute;
          background: #C4966A;
        }
        /* Top + Bottom */
        .pre-image-border::before {
          top: 0; left: 0; right: 0; height: 1.5px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1.2s cubic-bezier(.77,0,.18,1) 0.2s;
        }
        .pre-image-border::after {
          bottom: 0; left: 0; right: 0; height: 1.5px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 1.2s cubic-bezier(.77,0,.18,1) 0.5s;
        }
        .pre-image-wrap.reveal .pre-image-border::before,
        .pre-image-wrap.reveal .pre-image-border::after {
          transform: scaleX(1);
        }

        /* Left + Right borders via extra divs */
        .border-left, .border-right {
          position: absolute;
          width: 1.5px;
          background: #C4966A;
          z-index: 3;
          transform: scaleY(0);
        }
        .border-left {
          left: 0; top: 0; bottom: 0;
          transform-origin: top;
          transition: transform 1s cubic-bezier(.77,0,.18,1) 0.8s;
        }
        .border-right {
          right: 0; top: 0; bottom: 0;
          transform-origin: bottom;
          transition: transform 1s cubic-bezier(.77,0,.18,1) 1s;
        }
        .pre-image-wrap.reveal .border-left,
        .pre-image-wrap.reveal .border-right {
          transform: scaleY(1);
        }

        /* ── Text below image ── */
        .pre-names {
          font-family: 'Playfair Display', serif;
          font-size: 25px;
          font-weight: 500;
          color: #3B2A1A;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s;
        }
        .pre-names.show { opacity: 1; transform: translateY(0); }

        .pre-date {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: #C4966A;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          margin-bottom: 2.8rem;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        }
        .pre-date.show { opacity: 1; transform: translateY(0); }

        /* ── Progress bar area ── */
        .pre-progress-wrap {
          width: min(340px, 78vw);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .pre-count-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .pre-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.72rem;
          font-weight: 400;
          color: #B8916A;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .pre-count {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 400;
          color: #3B2A1A;
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
          min-width: 3ch;
          text-align: right;
        }

        /* Track */
        .pre-bar-track {
          width: 100%;
          height: 1px;
          background: rgba(196, 150, 106, 0.2);
          position: relative;
          overflow: visible;
        }

        /* Fill */
        .pre-bar-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          background: linear-gradient(90deg, #DDB98A 0%, #C4966A 100%);
          transition: width 0.05s linear;
        }

        /* Glowing dot at tip */
        .pre-bar-dot {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #C4966A;
          box-shadow: 0 0 8px 2px rgba(196,150,106,0.5);
          transition: left 0.05s linear;
        }

        /* ── Decorative ornament ── */
        .pre-ornament {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: rgba(196,150,106,0.35);
          letter-spacing: 0.5em;
          white-space: nowrap;
          user-select: none;
        }
      `}</style>

      <div className={`preloader${phase === "exit" ? " exit" : ""}`}>

        {/* Image with reveal mask */}
        <div className={`pre-image-wrap${count > 5 ? " reveal" : ""}`}>
          <img
            src="/images/preloader.png"
            alt="Wedding"
            className="pre-image"
          />
          {/* Mask slides up as loading progresses */}
          <div
            className="pre-image-mask"
            style={{ transform: `scaleY(${1 - count / 100})`, transformOrigin: "top" }}
          />
          <div className="pre-image-border" />
          <div className="border-left" />
          <div className="border-right" />
        </div>

        {/* Names + date */}
        <p className={`pre-names${count > 10 ? " show" : ""}`}>Tirupati Mahal</p>
        {/* <p className={`pre-date${count > 20 ? " show" : ""}`}>Est.2026</p> */}

        {/* Progress */}
        <div className="pre-progress-wrap">
          <div className="pre-count-row">
            <span className="pre-label">Loading</span>
            <span className="pre-count">{count}%</span>
          </div>
          <div className="pre-bar-track">
            <div className="pre-bar-fill" style={{ width: `${count}%` }} />
            <div className="pre-bar-dot" style={{ left: `${count}%` }} />
          </div>
        </div>

        {/* Ornament */}
        <div className="pre-ornament">✦ &nbsp; ✦ &nbsp; ✦</div>
      </div>
    </>
  );
}