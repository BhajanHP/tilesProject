import Hero from './Hero.jsx'
import AboutSection from './AboutSection.jsx'
import PartnersSection from './PartnersSection.jsx'
import VideosSection from './VideosSection.jsx'
import ReviewsSection from './ReviewsSection.jsx'
import ContactSection from './ContactSection.jsx'
import './home.css'

export default function Home({ onExploreProducts }) {
  return (
    <>
      <Hero onExplore={onExploreProducts} />
      <AboutSection onContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
      <PartnersSection />
      <VideosSection />
      <ReviewsSection />
      <ContactSection />
    </>
  )
}
