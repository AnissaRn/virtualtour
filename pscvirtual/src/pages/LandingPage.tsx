// src/pages/LandingPage.tsx

import React from 'react';

// Import SEMUA komponen yang membentuk halaman utama
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import DestinationSection from '../components/DestinationSection';
import VirtualTourSection from '../components/VirtualTourSection';
import LocationSection from '../components/LocationSection';
import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    // Wrapper utama halaman. min-h-screen memastikan halaman minimal setinggi viewport.
    // overflow-x-hidden mengatasi semua masalah scroll horizontal dari komponen lain.
    <div className="min-h-screen antialiased overflow-x-hidden">
      
      {/* 1. HEADER (Paling Atas) */}
      <Header />
      
      {/* Container Utama Konten Halaman */}
      <main>
        
        {/* 2. HERO BANNER */}
        <HeroBanner />
        
        {/* 3. ABOUT SECTION */}
        <AboutSection />
        
        {/* 4. DESTINATION SECTION */}
        <DestinationSection />
        
        {/* 5. VIRTUAL TOUR SECTION (Carousel 360°) */}
        <VirtualTourSection />
        
        {/* 6. LOCATION SECTION (Embed Maps) */}
        <LocationSection />
        
        {/* 7. GALLERY SECTION (Carousel Foto) */}
        <GallerySection />
        
      </main>
      
      {/* 8. FOOTER (Paling Bawah) */}
      <Footer />
      
    </div>
  );
};

export default LandingPage;