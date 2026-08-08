"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      // Measure scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // Also pad the fixed navbar so it doesn't shift
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const navbar = document.getElementById("main-navbar");
      if (navbar) navbar.style.paddingRight = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Home",               href: "/" },
    { label: "Venue",              href: "/venue" },
    { label: "Gallery",            href: "/#gallery" },
    { label: "Venue Availability", href: "/#availability" },
  ];

  const leftNavLinks = navLinks.slice(0, 2);
  const rightNavLinks = navLinks.slice(2);

  const socials = [
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    // {
    //   label: "Twitter",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    //     </svg>
    //   ),
    // },
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    // {
    //   label: "Pinterest",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    //     </svg>
    //   ),
    // },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:wght@300;400&display=swap');

        .nav-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          background-color: rgba(253,239,222,0.94);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-family: 'Playfair Display', serif;
          box-shadow: 0 1px 0 rgba(196,150,106,0.35);
          transition: box-shadow 0.3s ease;
        }
        .nav-wrapper.scrolled {
          box-shadow: 0 1px 0 rgba(196,150,106,0.35), 0 10px 30px rgba(26,15,7,0.12);
        }
        .nav-accent-line {
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #DDB98A 30%, #C4966A 50%, #DDB98A 70%, transparent 100%);
          opacity: 0.7;
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 84px;
          transition: height 0.3s ease;
        }
        .nav-wrapper.scrolled .nav-inner { height: 68px; }

        .nav-logo {
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          padding: 0 2.6rem;
        }
        .nav-logo-img {
          height: 66px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: height 0.3s ease, opacity 0.2s ease;
        }
        .nav-wrapper.scrolled .nav-logo-img {
          height: 50px;
        }

        .nav-right {
          display: flex; align-items: center; justify-content: flex-end; gap: 2rem;
        }

        .nav-links {
          display: flex; align-items: center; gap: 2.4rem;
          list-style: none; margin: 0; padding: 0;
        }
        .nav-links a {
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem; font-weight: 400;
          text-transform: uppercase;
          color: #6B4F3A; text-decoration: none;
          letter-spacing: 0.18em; white-space: nowrap;
          padding: 8px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-links a:hover { color: #3B2A1A; border-bottom-color: #C4966A; }
        .nav-links a.active { color: #3B2A1A; border-bottom-color: #C4966A; }

        .menu-btn {
          width: 44px; height: 44px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 5px;
          cursor: pointer;
          background: transparent;
          border: 1px solid rgba(196,150,106,0.55);
          border-radius: 50%;
          outline: none;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }
        .menu-btn:hover {
          border-color: #C4966A;
          background: rgba(196,150,106,0.12);
        }
        .menu-btn span {
          display: block; height: 1.5px; background: #6B4F3A;
        }
        .menu-btn span:nth-child(1) { width: 18px; }
        .menu-btn span:nth-child(2) { width: 12px; }

        .sidebar-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(40, 20, 5, 0.45);
          backdrop-filter: blur(2px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .sidebar-backdrop.open { opacity: 1; pointer-events: all; }

        .sidebar {
          position: fixed; top: 0; right: 0; bottom: 0;
          z-index: 400;
          width: 340px; max-width: 90vw;
          background: #fdeddeff;
          display: flex; flex-direction: column;
          padding: 2.5rem 2.5rem 2rem;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(.77,0,.18,1);
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar.open { transform: translateX(0); }

        .sidebar-close {
          align-self: flex-end;
          background: none; border: none; cursor: pointer;
          color: #DDB98A; font-size: 1.6rem; line-height: 1;
          padding: 0; margin-bottom: 2.5rem;
          transition: color 0.2s, transform 0.2s;
        }
        .sidebar-close:hover { color: #1A0F07; transform: rotate(90deg); }

        .sidebar-logo {
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; margin-bottom: 0.4rem;
        }
        .sidebar-logo-img {
          height: 100px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: opacity 0.2s ease;
        }

        .sidebar-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem; font-weight: 300;
          color: #8C6A50; letter-spacing: 0.12em;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(196,150,106,0.2);
        }

        .sidebar-nav {
          display: flex; flex-direction: column;
          gap: 0; list-style: none; margin: 0; padding: 0;
          flex: 1;
        }
        .sidebar-nav li {
          opacity: 0; transform: translateX(20px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sidebar.open .sidebar-nav li { opacity: 1; transform: translateX(0); }
        .sidebar.open .sidebar-nav li:nth-child(1) { transition-delay: 0.15s; }
        .sidebar.open .sidebar-nav li:nth-child(2) { transition-delay: 0.2s; }
        .sidebar.open .sidebar-nav li:nth-child(3) { transition-delay: 0.25s; }
        .sidebar.open .sidebar-nav li:nth-child(4) { transition-delay: 0.3s; }
        .sidebar.open .sidebar-nav li:nth-child(5) { transition-delay: 0.35s; }

        .sidebar-nav a {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem; font-weight: 500;
          color: #532744;
          text-decoration: none;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(196,150,106,0.12);
          letter-spacing: 0.04em;
          transition: color 0.2s, padding-left 0.25s;
          position: relative;
        }
        .sidebar-nav a::before {
          content: '—';
          position: absolute; left: -1.2rem;
          color: #1A0F07; opacity: 0;
          transition: opacity 0.2s, left 0.25s;
          font-size: 0.9rem;
        }
        .sidebar-nav a:hover { color:   #532744; padding-left: 1.2rem; }
        .sidebar-nav a:hover::before { opacity: 1; left: 0; }
        .sidebar-nav a.active { color: #532744;  text-decoration: underline;  }

        .sidebar-image {
          width: 100%; aspect-ratio: 4/3;
          object-fit: cover; border-radius: 2px;
          margin: 2rem 0 1.5rem;
          opacity: 0.85; filter: sepia(20%);
        }

        .sidebar-cta {
          display: block; text-align: center;
          font-family: 'Playfair Display', serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #532744;
          background: transparent;
          border: 1px solid #532744;
          padding: 0.85rem 1.5rem;
          margin-bottom: 1.8rem;
          cursor: default;
        }

        .sidebar-socials {
          display: flex; gap: 0.85rem;
          list-style: none; margin: 0; padding: 0;
          justify-content: center;
        }
        .sidebar-socials a {
          width: 36px; height: 36px; border-radius: 50%;
          background: transparent;
          border: 1px solid #532744;
          display: flex; align-items: center; justify-content: center;
          color: #532744; text-decoration: none;
          font-size: 0.78rem; font-family: sans-serif;
          transition: background 0.2s, color 0.2s;
        }
        .sidebar-socials a:hover { background: #532744; color: #fff; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .sidebar { width: 100%; max-width: 100vw; }
        }
      `}</style>

      {/* Backdrop */}
      <div className={`sidebar-backdrop${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar${menuOpen ? " open" : ""}`}>
        <button className="sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>

        <Link href="/" className="sidebar-logo" onClick={() => setMenuOpen(false)}>
          <img src="/images/Logo-Tirupati-Mahaal.png" alt="Tirupati Mahaal" className="sidebar-logo-img" />
        </Link>

        <ul className="sidebar-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={pathname === link.href ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <img
          src="images/two.jpg"
          alt="Wedding"
          className="sidebar-image"
        />

        <p className="sidebar-cta">
          Get in Touch
        </p>

        <ul className="sidebar-socials">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label}>{s.icon}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Navbar */}
      <nav id="main-navbar" className={`nav-wrapper${scrolled ? " scrolled" : ""}`}>
        <div className="nav-accent-line" />
        <div className="nav-inner">
          <ul className="nav-links">
            {leftNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/" className="nav-logo">
            <img src="/images/Logo-Tirupati-Mahaal.png" alt="Tirupati Mahaal" className="nav-logo-img" />
          </Link>

          <div className="nav-right">
            <ul className="nav-links">
              {rightNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}