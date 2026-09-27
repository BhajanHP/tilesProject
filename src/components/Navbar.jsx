import { useEffect, useState } from 'react'
import { PARTNERS } from '../data/partners.js'

const SECTION_IDS = ['home', 'about', 'partners', 'videos', 'reviews', 'contact']

export default function Navbar({ page, onNavigate, onScrollTo, onSelectPartner }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (page !== 'home') return

    function handleSectionScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (nearBottom) {
        setActiveSection(SECTION_IDS[SECTION_IDS.length - 1])
        return
      }

      const offset = 130
      let current = 'home'
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActiveSection(current)
    }

    handleSectionScroll()
    window.addEventListener('scroll', handleSectionScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleSectionScroll)
  }, [page])

  function go(targetPage) {
    setMenuOpen(false)
    setMobileOpen(false)
    if (targetPage === 'home') setActiveSection('home')
    onNavigate(targetPage)
  }

  function jump(sectionId) {
    setMenuOpen(false)
    setMobileOpen(false)
    setActiveSection(sectionId)
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
              className={`navbar__link ${page === 'home' && activeSection === 'home' ? 'is-active' : ''}`}
              onClick={() => go('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navbar__link ${page === 'home' && activeSection === 'about' ? 'is-active' : ''}`}
              onClick={() => jump('about')}
            >
              About
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navbar__link ${page === 'home' && activeSection === 'partners' ? 'is-active' : ''}`}
              onClick={() => jump('partners')}
            >
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
              <svg className="navbar__caret" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
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
            <button
              type="button"
              className={`navbar__link ${page === 'home' && activeSection === 'videos' ? 'is-active' : ''}`}
              onClick={() => jump('videos')}
            >
              Videos
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navbar__link ${page === 'home' && activeSection === 'reviews' ? 'is-active' : ''}`}
              onClick={() => jump('reviews')}
            >
              Reviews
            </button>
          </li>
          <li>
            <button
              type="button"
              className={`navbar__link ${page === 'home' && activeSection === 'contact' ? 'is-active' : ''}`}
              onClick={() => jump('contact')}
            >
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
