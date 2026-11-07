import { useState } from 'react'
import WipeHeading from './WipeHeading.jsx'

const REVIEWS = [
  {
    type: 'video',
    id: '1QKK6EJdfvQ',
    title: 'Customer Review on Premium Tiles',
  },
  {
    type: 'video',
    id: 'hM_9wganJm8',
    title: 'Wholesale Rates & Best Quality Tiles',
  },
  {
    type: 'video',
    id: 'lsfjxN-AsOU',
    title: 'One-Stop Solution for Tiles & Granite!',
  },
  {
    type: 'video',
    id: '59_Pr38cBAs',
    title: 'Same-Day Delivery & Huge Collection!',
  },
]

export default function ReviewsSection() {
  const [start, setStart] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)
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
          <li key={r.id} className="review-card review-card--video">
            <button
              type="button"
              className="review-card__video-link"
              onClick={() => setActiveVideo(r)}
            >
              <span className="review-card__video-thumb">
                <img
                  src={`https://i.ytimg.com/vi/${r.id}/hqdefault.jpg`}
                  alt={r.title}
                  loading="lazy"
                />
                <span className="review-card__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
              <span className="review-card__video-title">{r.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {activeVideo && (
        <div
          className="video-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal__close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="video-modal__frame">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
