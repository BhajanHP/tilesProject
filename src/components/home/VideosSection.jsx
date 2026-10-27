import { useState } from 'react'
import WipeHeading from './WipeHeading.jsx'

const VIDEOS = [
  {
    id: 'YYO0hfV9g2A',
    title: 'Massive Tiles Wholesale Godown in Tumkur | Aanjaya Tiles (16,000 Sq. Ft. Warehouse)',
    tone: 'v1',
    thumbnail: '/thumbnail/godown_thumb.jpg.jpeg',
  },
  {
    id: 'YpCUvFpIEZA',
    title: 'Namaskara Tumkur! Discover Premium Quality Tiles at Aanjaya Tiles',
    tone: 'v2',
    thumbnail: '/thumbnail/tiles_thumb.jpg.jpeg',
  },
  {
    id: 'hcw74O1Ntdk',
    title: 'Grand Opening of Aanjaya Tiles | Exclusive Showroom in Tumkur',
    tone: 'v3',
    thumbnail: '/thumbnail/grand_opening.jpg.jpeg',
  },
]

export default function VideosSection() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="videos" className="videos">
      <div className="videos__head">
        <div>
          <p className="eyebrow reveal">YouTube Shorts</p>
          <WipeHeading as="h2" className="section-title">
            Watch. Explore. <span className="text-crimson">Get Inspired.</span>
          </WipeHeading>
        </div>
        <a
          className="btn btn--outline reveal"
          href="https://www.youtube.com/@AanjayaTiles"
          target="_blank"
          rel="noreferrer"
        >
          Visit Our YouTube
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <ul className="videos__grid reveal-group">
        {VIDEOS.map((v) => (
          <li key={v.id} className={`video-card tilt video-card--${v.tone}`}>
            <button type="button" className="video-card__link" onClick={() => setActiveVideo(v)}>
              <span className="video-card__thumb">
                <img
                  src={v.thumbnail || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <span className="video-card__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
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
