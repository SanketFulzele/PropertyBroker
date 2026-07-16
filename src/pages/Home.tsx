import CTASection from '../components/CTASection'
import WhyUsSection from '../components/WhyUsSection'
import AreaSection from '../components/AreaSection'
import PropertyCarousel from '../components/PropertyCarousel'
import StatsSection from '../components/StatsSection'
import HomeInvestmentSection from '../components/HomeInvestmentSection'
import HeroSection from '../components/HeroSection'
import FormComponent from '../components/FormComponent'

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HomeInvestmentSection />
      <PropertyCarousel />
      <WhyUsSection />
      <CTASection />
      <AreaSection />
      <FormComponent />
    </>
  )
}

export default Home