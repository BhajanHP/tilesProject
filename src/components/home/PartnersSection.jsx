import WipeHeading from './WipeHeading.jsx'
import { PARTNERS } from '../../data/partners.js'

const LOOP = [...PARTNERS, ...PARTNERS]

export default function PartnersSection() {
  return (
    <section id="partners" className="partners">
      <div className="reveal">
        <p className="eyebrow">Our Partners</p>
      </div>
      <WipeHeading as="h2" className="section-title section-title--light">
        Trusted Brands. <span className="text-crimson">Lasting Spaces.</span>
      </WipeHeading>

      <div className="partners__marquee reveal">
        <ul className="partners__track">
          {LOOP.map((p, i) => (
            <li key={`${p.slug}-${i}`} className="partners__card">
              <span className="partners__card-logo">
                <img src={p.logo} alt={p.name} loading="lazy" />
              </span>
              <span className="partners__card-name">{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
