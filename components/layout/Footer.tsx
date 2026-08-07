import Link from "next/link";

// Google Maps location for Tirupati Mahaal
const MAP_URL =
  "https://www.google.com/maps/place/Tirupati+Mahaal/@10.6077154,77.2739915,823m/data=!3m1!1e3!4m6!3m5!1s0x3ba9cb6617dbb847:0x77c4e3957324ecf1!8m2!3d10.6077709!4d77.2770051!16s%2Fg%2F11md81r15g?entry=ttu&g_ep=EgoyMDI2MDgwMi4wIKXMDSoASAFQAw%3D%3D";

export default function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Venues", href: "/venue" },
    { label: "Venue Availability", href: "/#availability" },
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
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    // {
    //   label: "Twitter",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    //     </svg>
    //   ),
    // },
    // {
    //   label: "Pinterest",
    //   href: "#",
    //   icon: (
    //     <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    //       <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    //     </svg>
    //   ),
    // },
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
          padding: 2.5rem 2.5rem 2.5rem;
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
          text-decoration: none;
          display: block;
          transition: color 0.2s;
        }
        .footer-contact-phone:hover { color: #3B2A1A; }

        .footer-contact-bio {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.88rem;
          font-weight: 300;
          color: #8C6A50;
          line-height: 1.65;
          letter-spacing: 0.02em;
          text-align: center;
          max-width: 240px;
        }

        /* ── Centre: Brand ── */
        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding-top: 0.5rem;
        }

        /* Logo */
        .footer-logo-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }
        .footer-logo-img {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
          s
          
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

        /* ── Right: Find Us (map) ── */
        .footer-col-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          
        }

        .footer-map-link {
          display: block;
          width: 100%;
          max-width: 420px;
          text-decoration: none;
        }

        /* Real map screenshot — frame ratio matches the source image
           (1095x638) so object-fit: cover never has to crop it. */
        .footer-map-frame {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 1095 / 638;
          border-radius: 6px;
          overflow: hidden;
          background: #F7DFC1;
          box-shadow: 0 10px 28px rgba(59, 42, 26, 0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 5px solid #c49b6aff;
        }
        .footer-map-link:hover .footer-map-frame {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(59, 42, 26, 0.24);
        }

        .footer-map-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Soft radar-style ping ring accenting the pin already marked on
           the map photo (positioned to match the pin in the source image). */
        .footer-map-ping {
          position: absolute;
          left: 46.9%;
          top: 57.5%;
          width: 25px;
          height: 25px;
          margin: -8px 0 0 -8px;
          border-radius: 50%;
          border: 2px solid rgba(196, 150, 106, 0.85);
          animation: footerMapPing 2.2s ease-out infinite;
          z-index: 1;
          pointer-events: none;
        }
        @keyframes footerMapPing {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(3.2); opacity: 0; }
        }

        /* Hover overlay — affordance that the card is clickable */
        .footer-map-hover {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 42, 26, 0);
          opacity: 0;
          transition: opacity 0.25s ease, background 0.25s ease;
          z-index: 2;
        }
        .footer-map-link:hover .footer-map-hover {
          opacity: 1;
          background: rgba(59, 42, 26, 0.32);
        }
        .footer-map-hover span {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.75);
          padding: 8px 16px;
          border-radius: 24px;
          white-space: nowrap;
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
          .footer-map-link { max-width: 380px; margin: 0 auto; }
        }
      `}</style>
      <footer className="footer">
        <div className="footer-accent" />

        <div className="footer-main">

          {/* ── Left: Contact ── */}
          <div className="footer-col-left">
            <p className="footer-section-label">Contact</p>
            <div className="footer-divider" />
            <a href="mailto:tirupathimahal@gmail.com" className="footer-contact-email">
              tirupathimahal@gmail.com
            </a>
            <a href="tel:+919842226236" className="footer-contact-phone">
              98422 26236
            </a>
            <p className="footer-contact-bio">
              25/2 Indra Nagar, Dharapuram Road,<br />
              Thungavi, Post, Periakottai,<br />
              Udumalaipettai, Tamil Nadu 642203
            </p>
          </div>

          {/* ── Centre: Brand ── */}
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <img src="/images/Logo-Tirupati-Mahaal.png" alt="Tirupati Mahal" className="footer-logo-img" />
            </div>

            <p className="footer-logo-text">Tirupati Mahal</p>

            <ul className="footer-socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={s.label}>{s.icon}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: Find Us (real map image) ── */}
          <div className="footer-col-right">
            <p className="footer-section-label">Find Us</p>
            <div className="footer-divider" />

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-link"
              aria-label="Open Tirupati Mahal location in Google Maps"
            >
              <span className="footer-map-frame">
                <img
                  src="/images/tirupati-mahal-map.png"
                  alt="Map showing Tirupati Mahal's location"
                  className="footer-map-img"
                />
                <span className="footer-map-ping" />
                <span className="footer-map-hover"><span>View on Google Maps</span></span>
              </span>
            </a>
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
