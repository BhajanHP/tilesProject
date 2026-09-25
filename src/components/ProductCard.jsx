export default function ProductCard({ product, onSelect }) {
  return (
    <button type="button" className="card tilt" onClick={onSelect}>
      <span className="card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="card__overlay">View tile</span>
      </span>
      <span className="card__caption">
        <span className="card__name">{product.name}</span>
        <span className="card__meta">{product.sizeLabel}</span>
      </span>
    </button>
  )
}
