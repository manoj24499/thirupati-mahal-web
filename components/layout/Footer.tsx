"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "Venues", href: "/venues" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Pinterest",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400&display=swap');

        .footer {
          background: #FDEFDE;
          border-top: 1px solid rgba(196, 150, 106, 0.15);
        }

        /* ── Top divider line ── */
        .footer-accent {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #DDB98A 30%, #C4966A 50%, #DDB98A 70%, transparent 100%);
          opacity: 0.5;
        }

        /* ── Main footer grid ── */
        .footer-main {
          margin: 0 auto;
          padding: 4rem 2.5rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* ── Left: Contact ── */
        .footer-col-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .footer-section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 400;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8C6A50;
          margin-bottom: 0.9rem;
        }

        .footer-divider {
          width: 28px;
          height: 1px;
          background: #C4966A;
          opacity: 0.5;
          margin-bottom: 1.4rem;
        }

        .footer-contact-email {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: #C4966A;
          text-decoration: none;
          letter-spacing: 0.04em;
          margin-bottom: 0.3rem;
          display: block;
          transition: color 0.2s;
          text-align: center;
        }
        .footer-contact-email:hover { color: #3B2A1A; }

        .footer-contact-phone {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.9rem;
          font-weight: 400;
          color: #6B4F3A;
          letter-spacing: 0.04em;
          margin-bottom: 1.2rem;
          text-align: center;
        }

        .footer-contact-bio {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: #8C6A50;
          line-height: 1.65;
          letter-spacing: 0.02em;
          text-align: center;
          max-width: 220px;
        }

        /* ── Centre: Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.5rem;
        }

        /* Monogram / logo icon */
        .footer-logo-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          color: #C4966A;
        }
        .footer-logo-icon svg {
          width: 28px;
          height: 36px;
          opacity: 0.8;
        }

        .footer-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #8C6A50;
          white-space: nowrap;
        }

        /* Socials row */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .footer-socials a {
          color: #B8916A;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, transform 0.2s;
        }
        .footer-socials a:hover {
          color: #3B2A1A;
          transform: translateY(-2px);
        }

        /* Credit line */
        .footer-credit {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.72rem;
          font-weight: 300;
          color: #B8916A;
          letter-spacing: 0.1em;
          font-style: italic;
          text-align: center;
          opacity: 0.7;
        }

        /* ── Right: Stay in touch ── */
        .footer-col-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .footer-subscribe-form {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          width: 100%;
          max-width: 200px;
        }

        .footer-email-input {
          width: 100%;
          padding: 0.6rem 0.9rem;
          border: 1px solid rgba(196, 150, 106, 0.35);
          background: rgba(255, 255, 255, 0.6);
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #3B2A1A;
          letter-spacing: 0.06em;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          border-radius: 0;
        }
        .footer-email-input::placeholder {
          color: #B8916A;
          font-style: italic;
        }
        .footer-email-input:focus {
          border-color: #C4966A;
        }

        .footer-subscribe-btn {
          width: 100%;
          padding: 0.6rem 0.9rem;
          background: transparent;
          border: 1px solid rgba(196, 150, 106, 0.45);
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8C6A50;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .footer-subscribe-btn:hover {
          background: #C4966A;
          color: #FDEFDE;
          border-color: #C4966A;
        }

        .footer-subscribed {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #C4966A;
          font-style: italic;
          letter-spacing: 0.05em;
          text-align: center;
        }

        /* ── Bottom nav bar ── */
        .footer-bottom {
          border-top: 1px solid rgba(196, 150, 106, 0.12);
          padding: 1.4rem 2.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .footer-nav {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .footer-nav a {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8C6A50;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-nav a:hover { color: #3B2A1A; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            padding: 3rem 1.8rem 2rem;
            gap: 2.5rem;
            text-align: center;
          }
          .footer-nav { gap: 1.4rem; flex-wrap: wrap; }
          .footer-subscribe-form { max-width: 260px; margin: 0 auto; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-accent" />

        <div className="footer-main">

          {/* ── Left: Contact ── */}
          <div className="footer-col-left">
            <p className="footer-section-label">Contact</p>
            <div className="footer-divider" />
            <a href="mailto:hello@sofiaandjames.com" className="footer-contact-email">
              hello@sofiaandjames.com
            </a>
            <p className="footer-contact-phone">+91 98765 43210</p>
            <p className="footer-contact-bio">
              Based in Mumbai, India.<br />
              Available to celebrate love<br />across India &amp; Worldwide.
            </p>
          </div>

          {/* ── Centre: Brand ── */}
          <div className="footer-brand">
            {/* Camera tripod icon — wedding photographer feel */}
            <div className="footer-logo-icon">
              <svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="8" r="5.5" stroke="#C4966A" strokeWidth="1.2" />
                <circle cx="14" cy="8" r="2.5" stroke="#C4966A" strokeWidth="1" />
                <line x1="14" y1="14" x2="14" y2="20" stroke="#C4966A" strokeWidth="1.2" />
                <line x1="14" y1="20" x2="6" y2="34" stroke="#C4966A" strokeWidth="1.2" />
                <line x1="14" y1="20" x2="22" y2="34" stroke="#C4966A" strokeWidth="1.2" />
                <line x1="14" y1="26" x2="9" y2="34" stroke="#C4966A" strokeWidth="1" />
              </svg>
            </div>

            <p className="footer-logo-text">Sofia &amp; James</p>

            <ul className="footer-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label}>{s.icon}</a>
                </li>
              ))}
            </ul>

            <p className="footer-credit">by The Design Space</p>
          </div>

          {/* ── Right: Stay in Touch ── */}
          <div className="footer-col-right">
            <p className="footer-section-label">Stay in Touch</p>
            <div className="footer-divider" />
            {subscribed ? (
              <p className="footer-subscribed">Thank you for subscribing ✦</p>
            ) : (
              <div className="footer-subscribe-form">
                <input
                  type="email"
                  className="footer-email-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                <button className="footer-subscribe-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </div>
            )}
          </div>

        </div>

        {/* ── Bottom nav ── */}
        <div className="footer-bottom">
          <ul className="footer-nav">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}