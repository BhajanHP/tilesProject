export default function PartnerComingSoon({ partner }) {
  return (
    <div className="partner-soon">
      <span className="partner-soon__badge">Coming Soon</span>
      <img src={partner.logo} alt={partner.name} className="partner-soon__logo" />
      <h2 className="partner-soon__title">{partner.name} collection is on its way</h2>
      <p className="partner-soon__text">
        We&rsquo;re putting together the {partner.name} tile catalog. Check back soon, or
        get in touch and our team will help you right away.
      </p>
    </div>
  )
}
