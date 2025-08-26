import { Navigation } from "@/components/navigation"
import { EnhancedHero } from "@/components/enhanced-hero"
import { FeaturedGames } from "@/components/featured-games"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import BannerSections from "@/components/banner-sections"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <EnhancedHero />
      <FeaturedGames />
      <BannerSections />
      <StatsSection />
      <ServicesSection />
      <Footer />
    </main>
  )
}
