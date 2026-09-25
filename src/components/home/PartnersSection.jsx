import WipeHeading from './WipeHeading.jsx'

const PARTNERS = ['Kajaria', 'Somany', 'Johnson', 'Orientbell', 'Nitco', 'AGL']
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
          {LOOP.map((name, i) => (
            <li key={`${name}-${i}`} className="partners__card">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
