const SOCIALS = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@aanjayatiles?si=LKvASST1MoNn09dz',
    path: 'M22 12c0-2.4-.2-4-.5-5-.3-1-1-1.7-2-2C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.5c-1 .3-1.7 1-2 2-.3 1-.5 2.6-.5 5s.2 4 .5 5c.3 1 1 1.7 2 2 1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5c1-.3 1.7-1 2-2 .3-1 .5-2.6.5-5ZM10 15.5v-7l6 3.5-6 3.5Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/aanjayatiles?stkn=cjE1eXBjMm16ZzM5&utm_source=qr',
    path: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5ZM17.5 6.5h.01',
  },
  {
    label: 'Facebook',
    href: null,
    path: 'M14 22v-8h2.7l.4-3H14V9c0-.9.2-1.5 1.6-1.5H17V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V11H8v3h2.5v8h3.5Z',
  },
]

export default function Footer({ onNavigate, onScrollTo }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <span className="navbar__logo-chip">
          <img src="/aanjaya-logo-white.png" alt="Aanjaya Tiles" className="navbar__logo" />
        </span>
      </div>

      <ul className="site-footer__links">
        <li>
          <button type="button" onClick={() => onNavigate('home')}>
            Home
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onScrollTo('about')}>
            About
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onScrollTo('partners')}>
            Partners
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onScrollTo('videos')}>
            Videos
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onScrollTo('reviews')}>
            Reviews
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onScrollTo('contact')}>
            Contact
          </button>
        </li>
      </ul>

      <div className="site-footer__socials">
        {SOCIALS.map((s) => {
          const icon = (
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d={s.path} fill="currentColor" />
            </svg>
          )
          return s.href ? (
            <a
              key={s.label}
              className="site-footer__social"
              aria-label={s.label}
              title={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
            >
              {icon}
            </a>
          ) : (
            <span key={s.label} className="site-footer__social" aria-label={s.label} title={s.label}>
              {icon}
            </span>
          )
        })}
      </div>

      <p className="site-footer__copy">© 2026 Aanjaya Tiles. All Rights Reserved.</p>
    </footer>
  )
}
