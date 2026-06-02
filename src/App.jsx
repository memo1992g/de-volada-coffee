import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductSection from './components/ProductSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import BenefitsBar from './components/BenefitsBar.jsx';
import TrustSection from './components/TrustSection.jsx';
import Testimonials from './components/Testimonials.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import CartToast from './components/CartToast.jsx';
import ImpactCounters from './components/ImpactCounters.jsx';
import RoastJourney from './components/RoastJourney.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import { CartProvider } from './cart/CartContext.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <SmoothScroll />
        <main className="site-shell">
          <Header />
          <Hero />
          <ProductSection />
          <AboutSection />
          <RoastJourney />
          <BenefitsBar />
          <TrustSection />
          <ImpactCounters />
          <Testimonials />
          <Newsletter />
          <Footer />
          <CartDrawer />
          <CartToast />
        </main>
      </CartProvider>
    </LanguageProvider>
  );
}
