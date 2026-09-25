import WipeHeading from './WipeHeading.jsx'

const ADDRESS = 'Aanjaya Tiles, Tumkur, Karnataka - 572101'
const PHONE_DISPLAY = '+91 98765 43210'
const PHONE_TEL = '+919876543210'
const EMAIL = 'info@aanjayatiles.com'

// 13°18'45.5"N 77°07'07.6"E
const MAP_QUERY = '13.312639,77.118778'

export default function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="contact__info reveal-left">
        <p className="eyebrow">Visit Our Showroom</p>
        <WipeHeading as="h2" className="section-title">
          Let&rsquo;s Build Beautiful <br />Spaces Together
        </WipeHeading>
        <p className="section-lead">
          Visit our showroom or get in touch with us for the best tile solutions for
          your home or business.
        </p>

        <ul className="contact__list">
          <li>
            <span className="contact__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M4 5c0-1 1-2 2-2h2l2 5-2 1a11 11 0 0 0 6 6l1-2 5 2v2c0 1-1 2-2 2A15 15 0 0 1 4 5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <p className="contact__label">Call Us</p>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </div>
          </li>
          <li>
            <span className="contact__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div>
              <p className="contact__label">Email Us</p>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </li>
          <li>
            <span className="contact__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="10" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            <div>
              <p className="contact__label">Visit Us</p>
              <span>{ADDRESS}</span>
            </div>
          </li>
        </ul>

        <a
          className="btn btn--crimson magnetic"
          href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
          target="_blank"
          rel="noreferrer"
        >
          Get Directions
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <div className="contact__map reveal-right">
        <iframe
          title="Aanjaya Tiles location"
          src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
