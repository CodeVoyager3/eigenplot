import React from 'react'
import HeroSection from '@/components/hero-section'
import Features from '@/components/features'
import ContentSection from '@/components/content'
import FooterSection from '@/components/footer'
import Pricing from '@/components/pricing'

export default function Page() {
  return (
    <div>
      <HeroSection />
      <Features />
      <ContentSection/>
      <Pricing/>
      <FooterSection/>
    </div>
  )
}
