import WipeHeading from './WipeHeading.jsx'

const POINTS = [
  {
    label: 'Quality You Can Trust',
    path: 'M12 2 3 8l9 6 9-6-9-6ZM3 8v8l9 6 9-6V8',
  },
  {
    label: 'Modern Designs',
    path: 'M4 20 18 6M13 4h7v7',
  },
  {
    label: 'Built for Generations',
    path: 'M9 21v-6a3 3 0 0 1 6 0v6M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z',
  },
]

export default function AboutSection({ onContact }) {
  return (
    <section id="about" className="about">
      <div className="about__art reveal-left tilt">
        <div className="about__ribbon" aria-hidden="true" />
        <img
          src="/hero/2nd_page.webp"
          alt="Black, cream and grey marble-finish porcelain tile slabs fanned out together"
          className="about__photo"
          loading="lazy"
        />
      </div>

      <div className="about__content reveal-right">
        <p className="eyebrow">About Us</p>
        <WipeHeading as="h2" className="section-title">
          More Than Tiles, <br />A Lasting Legacy
        </WipeHeading>
        <p className="section-lead">
          At Aanjaya Tiles, we believe every space tells a story. With a wide range of
          premium tiles, modern designs and trusted quality, we help you build spaces
          that are stylish, durable and timeless.
        </p>

        <ul className="about__points reveal-group">
          {POINTS.map((p) => (
            <li key={p.label}>
              <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                <path
                  d={p.path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span>{p.label}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--crimson magnetic" onClick={onContact}>
          Know More About Us
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </section>
  )
}
