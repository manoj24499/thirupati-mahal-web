'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Aboutsection.module.css';

// ---------------------------------------------------------------------------
// HALL DATA — replace copy and image paths once client content arrives.
// ---------------------------------------------------------------------------
const HALLS = {
  mainHall: {
    id: 'mainHall',
    label: 'Main Hall',
    eyebrow: 'ABOUT MAIN WEDDING HALL',
    heading: 'A Grand Space for Weddings & Receptions',
    body: `Designed for large-scale celebrations, our Main Wedding Hall offers spacious interiors, comfortable seating, and dedicated facilities to make every wedding celebration seamless.`,
    primaryImage: '/images/main-three.jpg',
    secondaryImage: '/images/main-two.jpg',
    stats: [
      { value: '', label: 'Weddings', color: '#9c1c54' },
      { value: '', label: 'Receptions', color: '#f31d82' },
      { value: '', label: 'Engagement Ceremonies', color: '#1f2024' },
      { value: '', label: 'Traditional Functions', color: '#c9a24b' },
      { value: '', label: 'Family Celebrations', color: '#f7af78ff' },
    ],

  },
  miniHall: {
    id: 'miniHall',
    label: 'Mini Hall',
    eyebrow: 'ABOUT US',
    heading: 'Mini Hall — Intimate Celebrations, Grand Memories',
    body: 'Our Mini Hall is perfect for intimate gatherings and close-knit celebrations. Whether it\'s an engagement, bridal shower, or small reception, we deliver the same premium experience at a cozier scale. Every detail is curated with love — venue, catering, decor, and more. Your dream event, made effortlessly real.',
    primaryImage: '/images/mini-one.jpg',
    secondaryImage: '/images/mini-two.jpg',
    stats: [
      { value: '500+', label: 'Events Hosted', color: '#9c1c54' },
      { value: '200+', label: 'Vendor Partners', color: '#f31d82' },
      { value: '20+', label: 'Cities Available', color: '#1f2024' },
      { value: '98%', label: 'Happy Clients', color: '#c9a24b' },
    ],
  },
};

const SERVICES = [
  { icon: IconHotel, label: 'Hotel Booking' },
  { icon: IconDestination, label: 'Destinations' },
  { icon: IconVirtual, label: 'Virtual Plan' },
  { icon: IconCatering, label: 'Catering' },
  { icon: IconDecor, label: 'Decor' },
  { icon: IconVenue, label: 'Best Venues' },
];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('mainHall');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Trigger entry animation once section is 20% in view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const hall = HALLS[activeTab];

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      aria-label="About us"
    >
      {/* ── Section heading ── */}
      <div className={styles.sectionHeadingWrap}>
        {/* <p className={styles.sectionEyebrow}>
          <span className={styles.sectionEyebrowLine} aria-hidden="true" />
          What We Offer
          <span className={styles.sectionEyebrowLine} aria-hidden="true" />
        </p> */}
        <h2 className={styles.sectionTitle}>
          Our{' '}
          <span className={styles.highlight}>Facilities</span>
          {' '}with Highlights
        </h2>
      </div>

      <div className={styles.inner}>
        {/* ---------- LEFT — images ---------- */}
        <div className={styles.imageCol}>
          <div className={styles.primaryWrap}>
            <Image
              src={hall.primaryImage}
              alt={`${hall.label} primary photo`}
              fill
              sizes="(max-width: 900px) 100vw, 35vw"
              className={styles.primaryImg}
              priority
            />
          </div>
          <div className={styles.secondaryWrap}>
            <Image
              src={hall.secondaryImage}
              alt={`${hall.label} secondary photo`}
              fill
              sizes="(max-width: 900px) 60vw, 22vw"
              className={styles.secondaryImg}
            />
          </div>
        </div>

        {/* ---------- RIGHT — content ---------- */}
        <div className={styles.contentCol}>
          {/* Tabs */}
          <div className={styles.tabBar} role="tablist" aria-label="Hall selection">
            {Object.values(HALLS).map((h) => (
              <button
                key={h.id}
                role="tab"
                aria-selected={activeTab === h.id}
                aria-controls={`panel-${h.id}`}
                className={`${styles.tab} ${activeTab === h.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(h.id)}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div
            id={`panel-${hall.id}`}
            role="tabpanel"
            aria-label={hall.label}
            className={styles.panel}
          >
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              {hall.eyebrow}
            </p>

            <h2 className={styles.heading}>{hall.heading}</h2>
            <p className={styles.body}>{hall.body}</p>

            {/* Stats grid — 4 cols */}
            <div className={styles.statsGrid}>
              {hall.stats.map((stat) => (
                <div
                  key={stat.label}
                  className={styles.statCard}
                  style={{ '--card-color': stat.color }}
                >
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Services row */}
            <div className={styles.services} role="list">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.serviceItem} role="listitem">
                  <span className={styles.serviceCircle} aria-hidden="true">
                    <Icon className={styles.serviceIcon} />
                  </span>
                  <span className={styles.serviceLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
function IconHotel({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
      <path d="M2 17h20" />
    </svg>
  );
}
function IconDestination({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconVirtual({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m10 8 6 4-6 4V8z" />
    </svg>
  );
}
function IconCatering({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 3" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
    </svg>
  );
}
function IconDecor({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r="2.5" />
      <path d="M17 11.5a5 5 0 0 1-10 0" />
      <path d="M8.5 11.5c0 0 0-4 3.5-4s3.5 4 3.5 4" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="9" y1="20" x2="15" y2="20" />
    </svg>
  );
}
function IconVenue({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
    </svg>
  );
}