import WipeHeading from './WipeHeading.jsx'

const VIDEOS = [
  { title: 'Latest Tile Designs at Aanjaya Tiles', views: '2.4K views', tone: 'v1' },
  { title: 'Modern Bathroom Tile Ideas', views: '1.8K views', tone: 'v2' },
  { title: 'Explore Our Showroom', views: '3.1K views', tone: 'v3' },
  { title: 'Stylish Kitchen Tile Designs', views: '2.6K views', tone: 'v4' },
]

export default function VideosSection() {
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
          href="#videos"
          onClick={(e) => e.preventDefault()}
        >
          Visit Our YouTube
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      <ul className="videos__grid reveal-group">
        {VIDEOS.map((v) => (
          <li key={v.title} className={`video-card tilt video-card--${v.tone}`}>
            <div className="video-card__thumb">
              <span className="video-card__play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
                </svg>
              </span>
            </div>
            <div className="video-card__meta">
              <p className="video-card__title">{v.title}</p>
              <p className="video-card__views">{v.views}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
