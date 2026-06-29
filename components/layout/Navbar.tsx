"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Venues", href: "/venues" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      label: "Pinterest",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        </svg>
      )
    },
  ];

  return (
    <>

      {/* Backdrop */}
      <div
        className={`sidebar-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar${menuOpen ? " open" : ""}`}>
        <button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>

        <Link href="/" className="sidebar-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-monogram">S&amp;J</div>
          <div className="logo-text">
            <span className="logo-names">Sofia &amp; James</span>
            <span className="logo-date">Est. 2026</span>
          </div>
        </Link>
        <p className="sidebar-tagline">A celebration of love &amp; forever</p>

        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Placeholder wedding image */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
          alt="Wedding"
          className="sidebar-image"
        />

        <Link href="/rsvp" className="sidebar-cta" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </Link>

        <ul className="sidebar-socials">
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label}>
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Navbar */}
      <nav className={`nav-wrapper${scrolled ? " scrolled" : ""}`}>
        <div className="nav-accent-line" />
        <div className="nav-inner">

          <Link href="/" className="nav-logo">
            <div className="logo-monogram">S&amp;J</div>
            <div className="logo-text">
              <span className="logo-names">Sofia &amp; James</span>
              <span className="logo-date">September 14, 2025</span>
            </div>
          </Link>

          <div className="nav-right">
            <ul className="nav-links">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link href={link.href} className={i === 0 ? "active" : ""}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Menu icon — always visible */}
            <button
              className={`menu-btn${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}