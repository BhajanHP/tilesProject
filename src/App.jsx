import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingContact from './components/FloatingContact.jsx'
import Home from './components/home/Home.jsx'
import PartnerGrid from './components/PartnerGrid.jsx'
import PartnerComingSoon from './components/PartnerComingSoon.jsx'
import ProductPage from './components/ProductPage.jsx'
import { PARTNERS } from './data/partners.js'
import useScrollReveal from './hooks/useScrollReveal.js'
import useTilt from './hooks/useTilt.js'
import useMagnetic from './hooks/useMagnetic.js'
import './App.css'

function parseLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const params = new URLSearchParams(window.location.search)
  const segments = path.split('/').filter(Boolean)

  if (segments[0] === 'products' && segments[1]) {
    const partnerSlug = segments[1]
    const exists = PARTNERS.some((p) => p.slug === partnerSlug)
    if (exists) {
      return {
        page: 'catalog',
        activePartner: partnerSlug,
        activeSize: params.get('size'),
        activeCollection: params.get('collection'),
      }
    }
  }
  if (segments[0] === 'products') {
    return { page: 'products', activePartner: null, activeSize: null, activeCollection: null }
  }
  return { page: 'home', activePartner: null, activeSize: null, activeCollection: null }
}

function buildUrl({ page, activePartner, activeSize, activeCollection }) {
  if (page === 'products') return '/products'
  if (page === 'catalog' && activePartner) {
    const base = `/products/${activePartner}`
    if (activePartner === 'seron') {
      // SeronCatalogueBrowser owns any deeper drill-down path beyond this
      // prefix — preserve it instead of collapsing back to the root.
      const current = window.location.pathname
      return current === base || current.startsWith(`${base}/`) ? current : base
    }
    const params = new URLSearchParams()
    if (activeSize) params.set('size', activeSize)
    if (activeCollection) params.set('collection', activeCollection)
    const qs = params.toString()
    return `${base}${qs ? `?${qs}` : ''}`
  }
  return '/'
}

export default function App() {
  const initial = parseLocation()
  const [page, setPage] = useState(initial.page)
  const [activePartner, setActivePartner] = useState(initial.activePartner)
  const [activeSize, setActiveSize] = useState(initial.activeSize)
  const [activeCollection, setActiveCollection] = useState(initial.activeCollection)
  const [scrollTarget, setScrollTarget] = useState(null)
  const skipNextPush = useRef(true)

  useScrollReveal([page, activePartner, activeSize, activeCollection])
  useTilt([page, activePartner, activeSize, activeCollection])
  useMagnetic([page])

  useEffect(() => {
    if (page !== 'home' || !scrollTarget) return
    const el = document.getElementById(scrollTarget)
    el?.scrollIntoView({ behavior: 'smooth' })
    setScrollTarget(null)
  }, [page, scrollTarget])

  useEffect(() => {
    function handlePopState() {
      skipNextPush.current = true
      const parsed = parseLocation()
      setPage(parsed.page)
      setActivePartner(parsed.activePartner)
      setActiveSize(parsed.activeSize)
      setActiveCollection(parsed.activeCollection)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (skipNextPush.current) {
      skipNextPush.current = false
      return
    }
    const target = buildUrl({ page, activePartner, activeSize, activeCollection })
    const current = window.location.pathname + window.location.search
    if (target !== current) {
      window.history.pushState(null, '', target)
    }
  }, [page, activePartner, activeSize, activeCollection])

  function handleNavigate(targetPage) {
    setPage(targetPage)
    if (targetPage === 'home' || targetPage === 'products') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleScrollTo(sectionId) {
    if (page !== 'home') {
      setScrollTarget(sectionId)
      setPage('home')
      return
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSelectPartner(slug) {
    setActivePartner(slug)
    setActiveSize(null)
    setActiveCollection(null)
    setPage('catalog')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleBackToPartners() {
    setActivePartner(null)
    setPage('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const partner = PARTNERS.find((p) => p.slug === activePartner) || null
  const isProductArea = page === 'products' || page === 'catalog'

  return (
    <div className="page">
      <Navbar
        page={isProductArea ? 'products' : page}
        onNavigate={handleNavigate}
        onScrollTo={handleScrollTo}
        onSelectPartner={handleSelectPartner}
      />

      {page === 'home' && <Home onExploreProducts={() => handleNavigate('products')} />}

      {page === 'products' && <PartnerGrid onSelectPartner={handleSelectPartner} />}

      {page === 'catalog' && partner && partner.hasCatalog && (
        <ProductPage
          partnerSlug={partner.slug}
          activeSize={activeSize}
          activeCollection={activeCollection}
          onSize={setActiveSize}
          onCollection={setActiveCollection}
          onBack={handleBackToPartners}
        />
      )}

      {page === 'catalog' && partner && !partner.hasCatalog && (
        <>
          <div className="page-header">
            <button type="button" className="page-header__back" onClick={handleBackToPartners}>
              <span aria-hidden="true">&larr;</span> All Partners
            </button>
          </div>
          <PartnerComingSoon partner={partner} />
        </>
      )}

      <Footer onNavigate={handleNavigate} onScrollTo={handleScrollTo} />
      <FloatingContact />
    </div>
  )
}
