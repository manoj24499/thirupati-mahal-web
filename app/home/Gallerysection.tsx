import Image from 'next/image';
import styles from './Gallerysection.module.css';

// ---------------------------------------------------------------------------
// IMAGES — replace these paths with your real assets (10 per row).
// Files should live in /public/gallery/ for the paths below to resolve.
// ---------------------------------------------------------------------------
const rowOneImages = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
];

const rowTwoImages = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
];

/**
 * GallerySection
 * Two infinite, opposite-direction marquee rows of images, built with
 * nothing but CSS animations (no carousel libraries, no JS-driven motion).
 */
export default function GallerySection() {
  return (
    <section className={styles.gallerySection} aria-label="Our Gallery">
      <div className={styles.cornerLeft}>
        <Image src="/images/big-mandala.webp" alt="" fill className={styles.cornerImg} />
      </div>
      <div className={styles.cornerRight}>
        <Image src="/images/big-mandala.webp" alt="" fill className={styles.cornerImg} />
      </div>
      <h2 className={styles.heading}>Our Gallery</h2>

      {/* Row 1 — scrolls right to left */}
      <GalleryRow images={rowOneImages} direction="left" />

      {/* Row 2 — scrolls left to right, same speed as Row 1 */}
      <GalleryRow images={rowTwoImages} direction="right" />
    </section>
  );
}

function GalleryRow({ images, direction }:any) {
  // The seamless-loop trick: render the image set TWICE back to back.
  // The track is then exactly 2x the width of one full set, and the
  // CSS animation only ever moves it by 50% of its own width — which
  // is precisely the width of one set. The instant the animation
  // resets from -50% back to 0%, the duplicated set is sitting in the
  // exact same visual position the original set started in, so the
  // loop point is invisible.
  const loopImages = [...images, ...images];

  const trackClassName =
    direction === 'right'
      ? `${styles.track} ${styles.trackReverse}`
      : styles.track;

  return (
    <div className={styles.rowWrapper}>
      <div className={trackClassName}>
        {loopImages.map((src, index) => {
          const isDuplicate = index >= images.length;
          // Give the first handful of Row 1 images priority so the
          // section doesn't start blank while everything else still
          // lazy-loads as usual.
          const isAboveTheFold = direction === 'left' && index < 4;

          return (
            <figure
              key={`${src}-${index}`}
              className={styles.item}
              // The duplicated copy is purely decorative (it exists only
              // to make the loop seamless) — hide it from screen readers
              // so the same photo isn't announced twice.
              aria-hidden={isDuplicate || undefined}
            >
              <Image
                src={src}
                alt={isDuplicate ? '' : `Gallery photo ${index + 1}`}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={styles.img}
                priority={isAboveTheFold}
                loading={isAboveTheFold ? undefined : 'lazy'}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}