import { PARTNERS } from '../data/partners.js'

export default function PartnerGrid({ onSelectPartner }) {
  return (
    <>
      <div className="page-header">
        <div className="page-header__meta">
          <span>Our Partners</span>
          <span className="dot-sep" aria-hidden="true" />
          <span>Choose a brand to explore their collection</span>
        </div>
      </div>

      <ul className="partner-grid">
        {PARTNERS.map((partner) => (
          <li key={partner.slug}>
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
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
