const FEATURES = [
  {
    label: 'Premium Quality',
    path: 'M12 2 3 8l9 6 9-6-9-6ZM3 8v8l9 6 9-6V8',
  },
  {
    label: 'Wide Variety',
    path: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
  },
  {
    label: 'Perfect for Every Space',
    path: 'M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10',
  },
]

export default function Hero({ onExplore }) {
  return (
    <section id="home" className="hero">
      <div className="hero__media">
        <img
          src="/hero/1st_page.webp"
          alt="Elegant living room styled with premium marble-finish tile flooring and a matching feature wall"
          className="hero__bg"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__tagline">
          <span>Tiles</span>
          <span>That</span>
          <span>Define</span>
          <span className="text-crimson">Tomorrow</span>
        </div>
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="eyebrow eyebrow--light">Premium tiles for</p>
          <h1 className="hero__title">
            Beautiful <span className="text-crimson">Spaces</span> Always
          </h1>
          <p className="hero__lead">
            Tiles that bring elegance, strength and lasting beauty to every space.
          </p>
          <button type="button" className="btn btn--crimson magnetic" onClick={onExplore}>
            Explore Our Collection
            <span aria-hidden="true"> &rarr;</span>
          </button>

          <ul className="hero__features">
            {FEATURES.map((f) => (
              <li key={f.label}>
                <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
                  <path
                    d={f.path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
