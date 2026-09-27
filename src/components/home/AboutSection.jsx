import { useEffect, useState } from 'react'
import WipeHeading from './WipeHeading.jsx'

const GALLERY = [
  { src: '/hero2/img1.webp', label: 'Kitchen', alt: 'Modern kitchen styled with large-format porcelain floor and backsplash tiles' },
  { src: '/hero2/img2.webp', label: 'Bathroom', alt: 'Modern bathroom styled with warm marble-finish wall and floor tiles' },
  { src: '/hero2/img3.webp', label: 'Exterior', alt: 'Home entrance styled with dark stone-finish tiles' },
  { src: '/hero2/img4.webp', label: 'Lobby', alt: 'Luxury lobby with polished marble-finish tile flooring and staircase' },
]

const FEATURES = [
  {
    title: 'Premium Quality',
    subtitle: 'Certified Materials',
    path: 'M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.8l-6.2 3.5L7 14.2 2 9.3l7.1-.7L12 2Z',
  },
  {
    title: 'Wide Range',
    subtitle: '60+ Collections',
    path: 'M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7Z',
  },
]

const REDUCED_MOTION = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)')
  : null

export default function AboutSection({ onContact }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || (REDUCED_MOTION && REDUCED_MOTION.matches)) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % GALLERY.length)
    }, 4000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section id="about" className="about">
      <div className="about__gallery reveal-left">
        <div
          className="about__gallery-main tilt"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="about__progress" role="presentation">
            {GALLERY.map((g, i) => (
              <span className="about__progress-track" key={g.label}>
                <span
                  className={
                    i === active
                      ? `about__progress-fill is-active${paused ? ' is-paused' : ''}`
                      : i < active
                        ? 'about__progress-fill is-done'
                        : 'about__progress-fill'
                  }
                />
              </span>
            ))}
          </div>
          <img
            key={active}
            src={GALLERY[active].src}
            alt={GALLERY[active].alt}
            className="about__gallery-img"
            loading="lazy"
          />
        </div>

        <ul className="about__thumbs">
          {GALLERY.map((g, i) => (
            <li key={g.label}>
              <button
                type="button"
                className={`about__thumb ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img src={g.src} alt="" loading="lazy" />
                <span className="about__thumb-label">{g.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="about__content reveal-right">
        <p className="about__eyebrow-line">
          <span />
          About Us
          <span />
        </p>
        <WipeHeading as="h2" className="section-title">
          More Than Tiles, <br />A Lasting Legacy
        </WipeHeading>
        <p className="section-lead">
          At Aanjaya Tiles, we believe every space tells a story. With a wide range of
          premium tiles, modern designs and trusted quality, we help you build spaces
          that are stylish, durable and timeless.
        </p>

        <div className="about__divider" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>

        <div className="about__features-row reveal-group">
          {FEATURES.map((f) => (
            <div className="about__feature-box" key={f.title}>
              <span className="about__feature-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d={f.path} fill="currentColor" />
                </svg>
              </span>
              <div>
                <p className="about__feature-title">{f.title}</p>
                <p className="about__feature-sub">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn--crimson magnetic about__cta" onClick={onContact}>
          Know More About Us
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </section>
  )
}
