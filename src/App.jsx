import { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureCollections from './components/SignatureCollections';
import FeaturedDesigns from './components/FeaturedDesigns';
import Atelier from './components/Atelier';
import EditorialCampaign from './components/EditorialCampaign';
import Craftsmanship from './components/Craftsmanship';
import Lookbook from './components/Lookbook';
import InstagramGallery from './components/InstagramGallery';
import Consultation from './components/Consultation';
import Footer from './components/Footer';
import SearchDrawer from './components/SearchDrawer';
import BagDrawer from './components/BagDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quick, setQuick] = useState(null);

  return (
    <StoreProvider>
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBag={() => setBagOpen(true)}
      />

      <main>
        <Hero />
        <SignatureCollections />
        <FeaturedDesigns />
        <Atelier />
        <EditorialCampaign />
        <Craftsmanship />
        <Lookbook />
        <InstagramGallery />
        <Consultation />
      </main>

      <Footer />

      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(p) => setQuick(p)}
      />
      <BagDrawer
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        onCheckout={() => {
          setBagOpen(false);
          setCheckoutOpen(true);
        }}
      />
      <QuickViewModal product={quick} onClose={() => setQuick(null)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </StoreProvider>
  );
}