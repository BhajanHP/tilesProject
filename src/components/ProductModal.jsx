import { useEffect } from 'react'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <img className="modal__image" src={product.image} alt={product.name} />
        <div className="modal__details">
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
        </div>
      </div>
    </div>
  )
}
