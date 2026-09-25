import { useState } from 'react'
import WipeHeading from './WipeHeading.jsx'

const REVIEWS = [
  {
    text: 'Excellent collection and great service! The team helped us choose the perfect tiles for our home.',
    name: 'Ramesh K.',
    place: 'Tumkur',
  },
  {
    text: 'Wide variety of designs and very good quality. Highly recommended!',
    name: 'Priya M.',
    place: 'Tumkur',
  },
  {
    text: 'Beautiful showroom and supportive staff. Truly a great experience with Aanjaya Tiles.',
    name: 'Manjunath S.',
    place: 'Tumkur',
  },
  {
    text: 'From selection to installation guidance, the whole process was smooth and professional.',
    name: 'Deepa R.',
    place: 'Tumkur',
  },
]

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
}

export default function ReviewsSection() {
  const [start, setStart] = useState(0)
  const visible = [0, 1, 2].map((offset) => REVIEWS[(start + offset) % REVIEWS.length])

  function prev() {
    setStart((s) => (s - 1 + REVIEWS.length) % REVIEWS.length)
  }

  function next() {
    setStart((s) => (s + 1) % REVIEWS.length)
  }

  return (
    <section id="reviews" className="reviews">
      <div className="reviews__head">
        <div>
          <p className="eyebrow reveal">Customer Reviews</p>
          <WipeHeading as="h2" className="section-title section-title--light">
            What Our Customers Say
          </WipeHeading>
        </div>
        <div className="reviews__nav reveal">
          <button type="button" onClick={prev} aria-label="Previous reviews">
            &larr;
          </button>
          <button type="button" onClick={next} aria-label="Next reviews">
            &rarr;
          </button>
        </div>
      </div>

      <ul className="reviews__grid">
        {visible.map((r) => (
          <li key={r.name} className="review-card">
            <span className="review-card__quote" aria-hidden="true">
              &ldquo;
            </span>
            <p className="review-card__text">{r.text}</p>
            <div className="review-card__stars" aria-hidden="true">
              {'★★★★★'}
            </div>
            <div className="review-card__author">
              <span className="review-card__avatar">{initials(r.name)}</span>
              <div>
                <p className="review-card__name">{r.name}</p>
                <p className="review-card__place">{r.place}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
