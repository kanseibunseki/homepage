import HeroSection from '@/components/home/HeroSection'
import ScrollableMiddleSection from '@/components/home/ScrollableMiddleSection'
import { MobileParticleBackground } from '@/components/ui/MobileParticleBackground'

export default function Home() {
  return (
    <>
      <MobileParticleBackground />
      <HeroSection />
      <ScrollableMiddleSection />
    </>
  )
}