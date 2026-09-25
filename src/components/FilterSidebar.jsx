export default function FilterSidebar({
  sizeFacets,
  collectionFacets,
  activeSize,
  activeCollection,
  onSize,
  onCollection,
  onClear,
}) {
  const hasActiveFilter = activeSize || activeCollection

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <h2 className="sidebar__title">Filter</h2>
        {hasActiveFilter && (
          <button type="button" className="text-link" onClick={onClear}>
            Clear
          </button>
        )}
      </div>

      <fieldset className="facet">
        <legend>Size</legend>
        <ul className="facet__list">
          {sizeFacets.map((facet) => (
            <li key={facet.slug}>
              <button
                type="button"
                className={`facet__item ${activeSize === facet.slug ? 'is-active' : ''}`}
                onClick={() => onSize(activeSize === facet.slug ? null : facet.slug)}
                aria-pressed={activeSize === facet.slug}
              >
                <span>{facet.label}</span>
                <span className="facet__count">{facet.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="facet">
        <legend>Collection</legend>
        <ul className="facet__list">
          {collectionFacets.map((facet) => (
            <li key={facet.slug}>
              <button
                type="button"
                className={`facet__item ${activeCollection === facet.slug ? 'is-active' : ''}`}
                onClick={() =>
                  onCollection(activeCollection === facet.slug ? null : facet.slug)
                }
                aria-pressed={activeCollection === facet.slug}
              >
                <span>{facet.label}</span>
                <span className="facet__count">{facet.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </aside>
  )
}
