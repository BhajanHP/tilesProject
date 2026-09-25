import { useMemo, useState } from 'react'
import products from '../data/products.json'
import FilterSidebar from './FilterSidebar.jsx'
import ProductGrid from './ProductGrid.jsx'
import ProductModal from './ProductModal.jsx'

const SIZE_ORDER = [
  '600-x-1200-mm-x-9-mm',
  '800-x-1600-mm',
  '800-x-2400-mm',
  '1200-x-1800-mm-x-9-mm-15-mm',
]

const COLLECTION_ORDER = [
  'high-gloss', 'carve-art', 'flovers', 'irock', 'gemma', 'glossy',
  'grenulla', 'pearl', 'marble', 'vitro', 'shape-touch-pro', 'gem',
  'rock-land', 'orro', 'taj', 'stone-x', 'shape-touch', 'techno-marble',
  'urbana', 'gala', 'full-body', 'paper-matt', 'iconic-story',
]

function buildFacet(order, products, key, labelKey) {
  const present = new Map()
  for (const p of products) {
    const slug = p[key]
    if (!slug) continue
    if (!present.has(slug)) {
      present.set(slug, { slug, label: p[labelKey], count: 0 })
    }
    present.get(slug).count += 1
  }
  return order.filter((slug) => present.has(slug)).map((slug) => present.get(slug))
}

export default function ProductPage({ activeSize, activeCollection, onSize, onCollection, onBack }) {
  const [activeProduct, setActiveProduct] = useState(null)

  const sizeFacets = useMemo(
    () => buildFacet(SIZE_ORDER, products, 'sizeSlug', 'sizeLabel'),
    [],
  )
  const collectionFacets = useMemo(
    () => buildFacet(COLLECTION_ORDER, products, 'collectionSlug', 'collectionLabel'),
    [],
  )

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeSize && p.sizeSlug !== activeSize) return false
      if (activeCollection && p.collectionSlug !== activeCollection) return false
      return true
    })
  }, [activeSize, activeCollection])

  function clearFilters() {
    onSize(null)
    onCollection(null)
  }

  return (
    <>
      <div className="page-header">
        {onBack && (
          <button type="button" className="page-header__back" onClick={onBack}>
            <span aria-hidden="true">&larr;</span> All Partners
          </button>
        )}
        <div className="page-header__meta">
          <span>Product catalog</span>
          <span className="dot-sep" aria-hidden="true" />
          <span>{filtered.length} of {products.length} tiles</span>
        </div>
      </div>

      <div className="layout">
        <FilterSidebar
          sizeFacets={sizeFacets}
          collectionFacets={collectionFacets}
          activeSize={activeSize}
          activeCollection={activeCollection}
          onSize={onSize}
          onCollection={onCollection}
          onClear={clearFilters}
        />

        <main className="content">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No tiles match this combination.</p>
              <button type="button" className="text-link" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filtered} onSelect={setActiveProduct} />
          )}
        </main>
      </div>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </>
  )
}
