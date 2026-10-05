import { PARTNERS } from '../data/partners.js'

export default function PartnerGrid({ onSelectPartner }) {
  return (
    <>
      <div className="page-header">
        <div className="page-header__top">
          <div className="page-header__meta">
            <span>{PARTNERS.length} Brands</span>
            <span className="dot-sep" aria-hidden="true" />
            <span>Choose a brand to explore their collection</span>
          </div>
        </div>
        <div className="page-header__heading">
          <p className="page-header__eyebrow">Explore</p>
          <h1 className="page-header__title">
            Our <span className="text-crimson">Partners</span>
          </h1>
        </div>
      </div>

      <ul className="partner-grid">
        {PARTNERS.map((partner, index) => (
          <li key={partner.slug} style={{ '--stagger': index }}>
            <button
              type="button"
              className="partner-grid__card tilt"
              onClick={() => onSelectPartner(partner.slug)}
            >
              {!partner.hasCatalog && (
                <span className="partner-grid__badge">Coming Soon</span>
              )}
              <span className="partner-grid__logo-wrap">
                <img src={partner.logo} alt={partner.name} loading="lazy" />
              </span>
              <span className="partner-grid__name">{partner.name}</span>
              <span className="partner-grid__cta" aria-hidden="true">
                View Collection
                <svg viewBox="0 0 24 24" width="13" height="13">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
