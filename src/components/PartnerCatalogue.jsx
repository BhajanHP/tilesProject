export default function PartnerCatalogue({ partner }) {
  return (
    <div className="partner-soon">
      <img src={partner.logo} alt={partner.name} className="partner-soon__logo" />
      <h2 className="partner-soon__title">{partner.name} Tile Catalogue</h2>
      <p className="partner-soon__text">
        Browse the complete {partner.name} collection — view or download the full
        catalogue below.
      </p>
      <a
        className="btn btn--crimson magnetic"
        href={partner.catalogueUrl}
        target="_blank"
        rel="noreferrer"
      >
        View Full Catalogue PDF
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  )
}
