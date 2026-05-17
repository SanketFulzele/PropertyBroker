import CTASection from '../components/CTASection'
import WhyUsSection from '../components/WhyUsSection'
import CitiesSection from '../components/CitiesSection'
import PropertyCarousel from '../components/PropertyCarousel'
import StatsSection from '../components/StatsSection'
import HeroSection from '../components/HeroSection'
import FormComponent from '../components/FormComponent'

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PropertyCarousel />
      <WhyUsSection />
      <CTASection />
      <CitiesSection />
      <FormComponent />
    </>
  )
}

export default Home