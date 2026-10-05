export default function ProductCard({ product, onSelect }) {
  return (
    <button type="button" className="card tilt" onClick={onSelect}>
      <span className="card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="card__overlay">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          View Tile
        </span>
      </span>
      <span className="card__caption">
        <span className="card__name">{product.name}</span>
        <span className="card__meta">{product.sizeLabel}</span>
      </span>
    </button>
  )
}
