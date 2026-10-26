export default function ProductDetail({ product }) {
  return (
    <div className="product-detail">
      <img className="product-detail__image" src={product.image} alt={product.name} />
      <div className="product-detail__info">
        <p className="product-detail__eyebrow">{product.collectionLabel}</p>
        <h3>{product.name}</h3>
        <dl>
          <div>
            <dt>Size</dt>
            <dd>{product.sizeLabel}</dd>
          </div>
          <div>
            <dt>Collection</dt>
            <dd>{product.collectionLabel}</dd>
          </div>
        </dl>

        {product.pdfUrl && (
          <a
            className="btn btn--crimson magnetic product-detail__pdf-link"
            href={product.pdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Full Catalogue PDF
            <span aria-hidden="true"> &rarr;</span>
          </a>
        )}
      </div>
    </div>
  )
}
