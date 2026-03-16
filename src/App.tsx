import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/core/CustomCursor';
import LenisProvider from './components/core/LenisProvider';
import NoiseOverlay from './components/ui/NoiseOverlay';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const Home = lazy(() => import('./pages/Home'));
const Portofoliu = lazy(() => import('./pages/Portofoliu'));
const Despre = lazy(() => import('./pages/Despre'));
const Contact = lazy(() => import('./pages/Contact'));

function RouteFallback() {
  return <div className="min-h-screen w-full bg-aerflow-dark" />;
}

function App() {
  const location = useLocation();

  return (
    <LenisProvider>
      <NoiseOverlay />
      <CustomCursor />
      <Navbar />
      
      {/* Container pentru rute cu AnimatePresence */}
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/portofoliu" element={<Portofoliu />} />
            <Route path="/despre" element={<Despre />} />
            <Route path="/contact" element={<Contact />} />
            {/* Servicii rutează spre Despre pentru exemplificare */}
            <Route path="/servicii" element={<Despre />} /> 
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Footer />
    </LenisProvider>
  );
}

export default App;
