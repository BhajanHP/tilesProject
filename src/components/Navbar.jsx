import { useEffect, useState } from 'react'
import { PARTNERS } from '../data/partners.js'

export default function Navbar({ page, onNavigate, onScrollTo, onSelectPartner }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function go(targetPage) {
    setMenuOpen(false)
    setMobileOpen(false)
    onNavigate(targetPage)
  }

  function jump(sectionId) {
    setMenuOpen(false)
    setMobileOpen(false)
    onScrollTo(sectionId)
  }

  function pickPartner(slug) {
    setMenuOpen(false)
    setMobileOpen(false)
    onSelectPartner(slug)
  }

  return (
    <nav className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <button type="button" className="navbar__brand" onClick={() => go('home')}>
        <span className="navbar__logo-chip">
          <img src="/aanjaya-logo-white.png" alt="Aanjaya Tiles" className="navbar__logo" />
        </span>
      </button>

      <button
        type="button"
        className="navbar__toggle"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar__panel ${mobileOpen ? 'is-open' : ''}`}>
        <ul className="navbar__links">
          <li>
            <button
              type="button"
              className={`navbar__link ${page === 'home' ? 'is-active' : ''}`}
              onClick={() => go('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button type="button" className="navbar__link" onClick={() => jump('about')}>
              About
            </button>
          </li>
          <li>
            <button type="button" className="navbar__link" onClick={() => jump('partners')}>
              Partners
            </button>
          </li>
          <li
            className="navbar__has-menu"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              className={`navbar__link ${page === 'products' ? 'is-active' : ''}`}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((open) => !open)
                go('products')
              }}
            >
              Product
            </button>

            {menuOpen && (
              <div className="mega-menu mega-menu--partners">
                <div className="mega-menu__group">
                  <h3>Our Partners</h3>
                  <ul className="mega-menu__partners">
                    {PARTNERS.map((p) => (
                      <li key={p.slug}>
                        <button type="button" onClick={() => pickPartner(p.slug)}>
                          <span className="mega-menu__partner-logo">
                            <img src={p.logo} alt={p.name} loading="lazy" />
                          </span>
                          <span className="mega-menu__partner-name">
                            {p.name}
                            {!p.hasCatalog && (
                              <span className="mega-menu__partner-tag">Coming Soon</span>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li>
            <button type="button" className="navbar__link" onClick={() => jump('videos')}>
              Videos
            </button>
          </li>
          <li>
            <button type="button" className="navbar__link" onClick={() => jump('reviews')}>
              Reviews
            </button>
          </li>
          <li>
            <button type="button" className="navbar__link" onClick={() => jump('contact')}>
              Contact
            </button>
          </li>
        </ul>

        <button type="button" className="navbar__cta magnetic" onClick={() => jump('contact')}>
          Visit Showroom
        </button>
      </div>
    </nav>
  )
}
