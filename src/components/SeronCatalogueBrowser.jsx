import { useEffect, useMemo, useRef, useState } from 'react'
import products from '../data/products.json'
import { SERON_CATALOGUE } from '../data/seronCatalogue.js'
import ProductDetail from './ProductDetail.jsx'

const URL_PREFIX = '/products/seron'

function findNode(path) {
  let nodes = SERON_CATALOGUE
  let node = null
  for (const slug of path) {
    node = nodes.find((n) => n.slug === slug)
    if (!node) return null
    nodes = node.children || []
  }
  return node
}

function countLeafProducts(node) {
  if (node.productIds) return node.productIds.length
  return (node.children || []).reduce((sum, child) => sum + countLeafProducts(child), 0)
}

function parsePathFromUrl() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  if (!pathname.startsWith(URL_PREFIX)) return []
  const rest = pathname.slice(URL_PREFIX.length).split('/').filter(Boolean)

  const valid = []
  let nodes = SERON_CATALOGUE
  for (const slug of rest) {
    const node = nodes.find((n) => n.slug === slug)
    if (!node) break
    valid.push(slug)
    nodes = node.children || []
  }
  return valid
}

export default function SeronCatalogueBrowser() {
  const [path, setPath] = useState(parsePathFromUrl)
  const skipNextPush = useRef(true)

  useEffect(() => {
    function handlePopState() {
      skipNextPush.current = true
      setPath(parsePathFromUrl())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (skipNextPush.current) {
      skipNextPush.current = false
      return
    }
    const target = path.length === 0 ? URL_PREFIX : `${URL_PREFIX}/${path.join('/')}`
    if (target !== window.location.pathname) {
      window.history.pushState(null, '', target)
    }
  }, [path])

  const currentNode = path.length === 0 ? null : findNode(path)
  const currentNodes = path.length === 0 ? SERON_CATALOGUE : currentNode?.children || []
  const isLeaf = Boolean(currentNode && currentNode.productIds)

  const leafProducts = useMemo(() => {
    if (!isLeaf) return []
    return currentNode.productIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
  }, [currentNode, isLeaf])

  const crumbs = useMemo(() => {
    const result = [{ label: 'Seron Catalogues', path: [] }]
    for (let i = 0; i < path.length; i++) {
      const node = findNode(path.slice(0, i + 1))
      result.push({ label: node?.name || path[i], path: path.slice(0, i + 1) })
    }
    return result
  }, [path])

  return (
    <div className="catalogue-browser">
      <nav className="catalogue-breadcrumb" aria-label="Breadcrumb">
        {crumbs.map((c, i) => (
          <span key={c.label} className="catalogue-breadcrumb__item">
            {i > 0 && (
              <span className="catalogue-breadcrumb__sep" aria-hidden="true">
                /
              </span>
            )}
            {i === crumbs.length - 1 ? (
              <span className="catalogue-breadcrumb__current">{c.label}</span>
            ) : (
              <button type="button" onClick={() => setPath(c.path)}>
                {c.label}
              </button>
            )}
          </span>
        ))}
      </nav>

      {isLeaf ? (
        <div className="catalogue-product-list">
          {leafProducts.map((p) => (
            <ProductDetail key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <ul className="catalogue-folder-grid">
          {currentNodes.map((node) => {
            const isFolder = Boolean(node.children)
            const count = countLeafProducts(node)
            return (
              <li key={node.slug}>
                <button
                  type="button"
                  className="catalogue-folder tilt"
                  onClick={() => setPath([...path, node.slug])}
                >
                  <span className="catalogue-folder__icon" aria-hidden="true">
                    {isFolder ? (
                      <svg viewBox="0 0 24 24" width="26" height="26">
                        <path
                          d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="26" height="26">
                        <path
                          d="M4 4h12l4 4v12H4V4Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path d="M16 4v4h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="catalogue-folder__name">{node.name}</span>
                  <span className="catalogue-folder__count">
                    {count} {count === 1 ? 'catalogue' : 'catalogues'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
