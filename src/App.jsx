import { useEffect, useState } from 'react'
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

export default function App() {
  const [page, setPage] = useState('home')
  const [activePartner, setActivePartner] = useState(null)
  const [activeSize, setActiveSize] = useState(null)
  const [activeCollection, setActiveCollection] = useState(null)
  const [scrollTarget, setScrollTarget] = useState(null)

  useScrollReveal([page, activePartner, activeSize, activeCollection])
  useTilt([page, activePartner, activeSize, activeCollection])
  useMagnetic([page])

  useEffect(() => {
    if (page !== 'home' || !scrollTarget) return
    const el = document.getElementById(scrollTarget)
    el?.scrollIntoView({ behavior: 'smooth' })
    setScrollTarget(null)
  }, [page, scrollTarget])

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
